import markers from './markers';

const MAX_PUBS_COUNT = 12;
const ALGO_SHORTEST = 'Shortest';
const ALGO_GREEDY = 'Greedy';

const constants = Object.freeze({
  WEEK_DAYS: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
  DEFAULT_RATING: 0,
  DEFAULT_DURATION_IN_MINUTES: 45,
  DEFAULT_PUB_CRAWL_NAME: 'The Golden Mile',
  GOOGLE_MAP_URL: `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&libraries=places`,
  MAX_PUBS_COUNT: MAX_PUBS_COUNT,
  MIN_PUB_CRAWL_NAME_LENGTH: 3,
  MAX_PUB_CRAWL_NAME_LENGTH: 18,
  DEFAULT_WEEKDAY_TEXT: 'No opening hours information.',
  DIALOG_TITLE: `The Golden Mile consists of ${MAX_PUBS_COUNT} pubs. You can't add any more pubs, drunkard! 🍻`,
  START_TIME_LABEL: 'Pub Crawl Start Time',
  ALGO_SHORTEST: ALGO_SHORTEST,
  ALGO_GREEDY: ALGO_GREEDY,
  ALGO_RATING_ASC: '⭐️ asc',
  ALGO_RATING_DESC: '⭐️ desc',
  DISTANCE_DEPENDANT_ALGOS: [
    ALGO_SHORTEST,
    ALGO_GREEDY
  ],
  ...markers
});

export default constants;
