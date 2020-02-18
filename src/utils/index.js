import constants from '../constants';

// (4, 7) => '04:07'
const formatTime = (hours, minutes) => {
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
};

// '17:30' => [17, 30]
const parseHoursAndMinutes = (timeString) => {
  return timeString.split(':').map((value) => {
    return +value;
  });
};

// '26:15' => '22:15'
const normalizeTFHTime = (TFHtime) => {
  const [hours, minutes] = parseHoursAndMinutes(TFHtime);

  return formatTime(hours % 24, minutes);
};

// (50, '17:30') => '18:20'
const addMinutesTo24HourTime = (minutesToAdd, TFHtime) => {
  const [hours, minutes] = parseHoursAndMinutes(TFHtime);

  const totalMinutes = minutes + minutesToAdd;

  const newMinutes = (totalMinutes) % 60;
  const newHours = hours + Math.floor((totalMinutes) / 60);

  return formatTime(newHours, newMinutes);
};

// (['16:00', '24:00'], ['00:00', '01:00']) => ['16:00', '25:00']
const extendIntervalA = (intervalA, intervalB) => {
  const startTime = intervalA[0];
  let endTime = intervalA[1];

  if (endTime === '24:00' && intervalB[0] === '00:00') {
    endTime = addMinutesTo24HourTime(24 * 60, intervalB[1]);
  }

  return [startTime, endTime];
};

// (
//  [['12:00', '14:00'], ['18:00', '24:00']],
//  [['00:00', '03:00'], ['12:00', '14:00']]
// ) => [['12:00', '14:00'], ['18:00', '27:00']]
const extendPeriodA = (periodA, periodB) => {
  const newPeriodA = [];

  for (let i = 0; i < periodA.length; i += 1) {
    let intervalA = periodA[i];

    for (let j = 0; j < periodB.length; j++) {
      const intervalB = periodB[j];

      intervalA = extendIntervalA(intervalA, intervalB);
    }

    newPeriodA.push(intervalA);
  }

  return newPeriodA;
};

// Converts
// https://developers.google.com/maps/documentation/javascript/reference/places-service#PlaceOpeningHours.periods
// to an array of periods per day.
// Edge cases:
// const periods = []; // No information. Assume 24/7. 'INDIA GATE'
// const periods = [{
//  open: { day: 0, time: '0000' }
// }]; // 24/7 'EMERGENCY DENTIST 24/7 NYC'
// const periods = [{
//   close: { day: 5, time: '1830', hours: 18, minutes: 30 },
//   open: { day: 0, time: '0000', hours: 0, minutes: 0 }
// }]; // 0-4 00:00-24:00, 5-00:00-18:30 '24/6 CITY MARKET'
const normalizePeriods = (periods) => {
  // 24/7
  const TFS = Array.from({ length: 7 }).map(() => {
    return [['00:00', '48:00']];
  });

  if ((periods.length === 0) ||
    (periods.length === 1 && (typeof periods[0].close === 'undefined'))) {
    return TFS;
  }

  const normalizedPeriods = Array.from({ length: 7 }).map(() => {
    return [];
  });

  for (const period of periods) {
    const {
      day: openDay,
      hours: openHours,
      minutes: openMinutes
    } = period.open;
    const {
      day: closeDay,
      hours: closeHours,
      minutes: closeMinutes
    } = period.close;

    if (openDay === closeDay) {
      normalizedPeriods[openDay].push([
        formatTime(openHours, openMinutes),
        formatTime(closeHours, closeMinutes)
      ]);
    } else if (openDay < closeDay) {
      normalizedPeriods[openDay].push(
        [formatTime(openHours, openMinutes), '24:00']
      );

      for (let i = openDay + 1; i < closeDay; i += 1) {
        normalizedPeriods[i].push(['00:00', '24:00']);
      }

      const closeTime = formatTime(closeHours, closeMinutes);

      if (closeTime !== '00:00') {
        normalizedPeriods[closeDay].push(
          ['00:00', closeTime]
        );
      }
    } else {
      normalizedPeriods[openDay].push(
        [formatTime(openHours, openMinutes), '24:00']
      );

      for (let i = openDay + 1; i <= 6; i += 1) {
        normalizedPeriods[i].push(['00:00', '24:00']);
      }

      for (let i = 0; i < closeDay; i += 1) {
        normalizedPeriods[i].push(['00:00', '24:00']);
      }

      const closeTime = formatTime(closeHours, closeMinutes);

      if (closeTime !== '00:00') {
        normalizedPeriods[closeDay].push(
          ['00:00', closeTime]
        );
      }
    }
  }

  for (let i = 0; i < 7 - 1; i += 1) {
    normalizedPeriods[i] = extendPeriodA(normalizedPeriods[i], normalizedPeriods[i + 1]);
  }

  normalizedPeriods[6] = extendPeriodA(normalizedPeriods[6], normalizedPeriods[0]);

  return normalizedPeriods;
};

// ('17:30', ['14:00', '17:45']) => true
const checkIfTimeIsInInterval = (time, interval) => {
  let newInterval = interval.slice();

  if (newInterval[0] <= newInterval[1]) {
    const onTime = time >= interval[0] && time <= interval[1];

    return onTime;
  }

  const onTime = (time >= interval[0] && time <= '24:00') ||
    (time <= interval[1]);

  return onTime;
};

// '4:32 pm' => '16:32'
export const convertAMPMTimeTo24HourTime = (AMPMTime) => {
  const [time, AMPM] = AMPMTime.split(' ');
  const [hours, minutes] = parseHoursAndMinutes(time);
  const isPM = AMPM === 'pm';
  let newHours = hours;

  if (isPM && newHours < 12) {
    newHours = newHours + 12;
  } else if (!isPM && newHours === 12) {
    newHours = 0;
  }

  return formatTime(newHours, minutes);
};

// '16:32' => '4:32 pm'
export const convert24HourTimeToAMPMTime = (TFHtime) => {
  const [hours, minutes] = parseHoursAndMinutes(TFHtime);
  const AMPM = hours < 12 ? 'am' : 'pm';
  const newHours = hours % 12 || 12;

  return `${newHours}:${minutes.toString().padStart(2, '0')} ${AMPM}`;
};

// (1, [ { duration: 45 }, { duration: 60} ], '17:30', [45]) =>
// ['19:00', '20:00']
export const calculateStartAndEndTimeForPubAtIndex = (
  index,
  pubs,
  pubCrawlStartTime,
  legsDurations
) => {
  const [hours, minutes] = parseHoursAndMinutes(convertAMPMTimeTo24HourTime(pubCrawlStartTime));
  let totalMinutes = minutes;

  for (let i = 0; i < index; i += 1) {
    totalMinutes = totalMinutes + pubs[i].duration;

    if (typeof legsDurations[i] !== 'undefined') {
      totalMinutes = totalMinutes + legsDurations[i];
    }
  }

  const startTimeMinutes = (totalMinutes) % 60;
  let startTimeHours = hours + Math.floor((totalMinutes) / 60);

  startTimeHours = startTimeHours % 24;

  const startTime = formatTime(startTimeHours, startTimeMinutes);
  const endTime = normalizeTFHTime(addMinutesTo24HourTime(pubs[index].duration, startTime));

  return [startTime, endTime];
};

export const normalizePlace = (place) => {
  const normalizedPlace = JSON.parse(JSON.stringify(place));

  normalizedPlace.location = normalizedPlace.geometry.location;
  delete normalizedPlace.geometry;
  if (normalizedPlace.opening_hours) {
    normalizedPlace.weekdayText = normalizedPlace.opening_hours.weekday_text;
    normalizedPlace.periods = normalizePeriods(normalizedPlace.opening_hours.periods);
    delete normalizedPlace.opening_hours;
  } else {
    normalizedPlace.weekdayText = constants.TEXT_DEFAULT_WEEKDAY_TEXT;
    normalizedPlace.periods = normalizePeriods([]);
  }
  delete normalizedPlace.icon;
  delete normalizedPlace.html_attributions;

  normalizedPlace.rating = normalizedPlace.rating || constants.DEFAULT_RATING;
  normalizedPlace.duration = constants.DEFAULT_DURATION_IN_MINUTES;

  normalizedPlace.formattedAddress = normalizedPlace.formatted_address;
  delete normalizedPlace.formatted_address;

  normalizedPlace.placeId = normalizedPlace.place_id;
  delete normalizedPlace.place_id;

  return normalizedPlace;
};

export const calculatePubCrawlDetails = (
  pubs,
  directions
) => {
  let legsDurations = [];
  let totalPubCrawlDistanceInMeters = 0;
  let totalPubCrawlDurationInMinutes = 0;

  let totalPubDuration = 0;
  let totalLegsDuration = 0;

  if (pubs.length > 0) {
    totalPubDuration = pubs.reduce((acc, pub) => {
      return acc + pub.duration;
    }, 0);

    if (directions !== null) {
      // directions contains only one route because we don't set
      // provideRouteAlternatives to true.
      const route = directions.routes[0];

      // Values in meters and minutes.
      totalPubCrawlDistanceInMeters = route.legs.reduce((acc, leg) => {
        return acc + leg.distance.value;
      }, 0);

      legsDurations = route.legs.map((leg) => {
        return Math.ceil(leg.duration.value / 60);
      });

      totalLegsDuration = legsDurations.reduce((acc, legDuration) => {
        return acc + legDuration;
      }, 0);
    } else {
      totalPubCrawlDistanceInMeters = 0;
      legsDurations = Array.from({ length: pubs.length - 1 }).fill(0);
    }
  }

  totalPubCrawlDurationInMinutes = totalLegsDuration + totalPubDuration;

  return {
    legsDurations,
    totalPubCrawlDistanceInMeters,
    totalPubCrawlDurationInMinutes
  };
};

export const calculateWeekDaysThatWontWorkForPub = ({ periods, pubStartTime, pubEndTime }, pubCrawlStartTime) => {
  const weekDayIndexesThatWontWorkForPub = [];

  let nextDay = false;

  for (let i = 0; i < constants.WEEK_DAYS.length; i += 1) {
    if (typeof periods[i] !== 'undefined') {
      let newPubEndTime = pubEndTime;

      if (pubEndTime < pubStartTime) {
        newPubEndTime = addMinutesTo24HourTime(
          24 * 60,
          newPubEndTime
        );
      }

      const isThereAnIntervalThatIncludesBothPubStartTimeAndPubEndTime = periods[i].some((interval) => {
        return (checkIfTimeIsInInterval(pubStartTime, interval) &&
          checkIfTimeIsInInterval(newPubEndTime, interval));
      });

      if (!isThereAnIntervalThatIncludesBothPubStartTimeAndPubEndTime) {
        if (pubStartTime <
          convertAMPMTimeTo24HourTime(pubCrawlStartTime)) {
          nextDay = true;
        }

        let workDayIndexThatWontWork = i;

        if (nextDay) {
          if (i === 0) {
            workDayIndexThatWontWork = 6;
          } else {
            workDayIndexThatWontWork = i - 1;
          }
        }
        weekDayIndexesThatWontWorkForPub.push(workDayIndexThatWontWork);
      }
    }
  }

  const weekDaysThatWontWork = constants.WEEK_DAYS.filter((_, index) => {
    return weekDayIndexesThatWontWorkForPub.includes(index);
  });

  return weekDaysThatWontWork;
};
