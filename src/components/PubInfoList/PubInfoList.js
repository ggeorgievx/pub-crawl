import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { forbidExtraProps } from 'airbnb-prop-types';
import {
  calculateStartAndEndTimeForPubAtIndex,
  calculateWeekDaysThatWontWorkForPub
} from '../../utils';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { ReactComponent as PubCrawl } from '../../assets/images/pub-crawl.svg';
import PubInfo from '../../containers/PubInfo/PubInfo';

const useStyles = makeStyles({
  paper: {
    maxHeight: 'calc(100% - 60px)',
    display: 'flex',
    flexDirection: 'column',
    padding: '30px',
    backgroundColor: 'rgb(33, 33, 33)',
    '& .react-timekeeper': {
      backgroundColor: 'inherit',
      boxShadow: 'none'
    },
    '& .react-timekeeper__clock-wrapper': {
      backgroundColor: 'inherit'
    },
    '& .react-timekeeper__top-bar': {
      backgroundColor: 'inherit'
    },
    '& .react-timekeeper__time-dropdown': {
      display: 'none'
    },
    alignSelf: 'center',
    '@media (max-width:1200px)': {
      width: 'calc(100% - 60px)',
      height: 'calc(100% - 60px)'
    },
    // Remove from the Name/Time form once extracted (leave only for 3rd page)
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
      width: '0.6em'
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0, 0, 0, .3)',
      borderRadius: '20px'
    },
    color: 'rgb(255, 255, 255)'
  },
  row: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    width: '100%'
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
  },
  icon: {
    width: '50px',
    height: '50px',
    '@media (max-width:1200px)': {
      width: '30px',
      height: '30px'
    }
  },
  name: {
    paddingLeft: '10px'
  },
  distance: {
    paddingTop: '20px',
    display: 'flex',
    justifyContent: 'center'
  },
  direction: {
    paddingBottom: '20px',
    display: 'flex',
    justifyContent: 'center'
  }
});

const PubInfoList = (props) => {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <div className={classes.row}>
        <PubCrawl className={classes.icon} />
        <Typography className={classes.name} variant="subtitle1">
          {props.pubCrawlName}
        </Typography>
      </div>
      <div className={classes.column}>
        <Typography className={classes.distance} variant="body2">
          Total distance:&nbsp;{`${props.totalPubCrawlDistanceInMeters} meters`}
        </Typography>
        <Typography className={classes.direction} variant="body2">
          Total duration:&nbsp;{`${props.totalPubCrawlDurationInMinutes} minutes`}
        </Typography>
      </div>
      {props.pubs.map((pub, index) => {
        const [pubStartTime, pubEndTime] = calculateStartAndEndTimeForPubAtIndex(
          index,
          props.pubs,
          props.pubCrawlStartTime,
          props.legsDurations
        );

        const weekDayIndexesThatWontWork = calculateWeekDaysThatWontWorkForPub(
          {
            periods: pub.periods,
            pubStartTime,
            pubEndTime
          },
          props.pubCrawlStartTime
        );

        const warning = `You won't make it on time for this pub if you crawl on ${weekDayIndexesThatWontWork.join(', ')} 😞`;

        return (
          <PubInfo
            key={`${index}-${pub.place_id}`}
            index={index}
            name={pub.name}
            weekday_text={pub.weekday_text}
            warning={weekDayIndexesThatWontWork.length === 0 ? '' : warning}
            startTime={pubStartTime}
            endTime={pubEndTime}
          />
        );
      })}
    </Paper>
  );
};

PubInfoList.propTypes = forbidExtraProps({
  pubCrawlName: PropTypes.string.isRequired,
  totalPubCrawlDistanceInMeters: PropTypes.number.isRequired,
  totalPubCrawlDurationInMinutes: PropTypes.number.isRequired,
  pubs: PropTypes.arrayOf(PropTypes.exact({
    formatted_address: PropTypes.string.isRequired,
    location: PropTypes.exact({
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired
    }).isRequired,
    name: PropTypes.string.isRequired,
    weekday_text: PropTypes.oneOfType([
      PropTypes.string.isRequired,
      PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
    ]).isRequired,
    place_id: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    duration: PropTypes.number.isRequired,
    periods: PropTypes.arrayOf(
      PropTypes.arrayOf(
        PropTypes.arrayOf(
          PropTypes.string.isRequired
        ).isRequired
      ).isRequired
    ).isRequired
  })).isRequired,
  pubCrawlStartTime: PropTypes.string.isRequired,
  legsDurations: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired
});

export default PubInfoList;
