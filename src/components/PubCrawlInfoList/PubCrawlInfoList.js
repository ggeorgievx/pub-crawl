import React from 'react';
import PropTypes from 'prop-types';
import { forbidExtraProps } from 'airbnb-prop-types';
import { makeStyles } from '@material-ui/core/styles';
import PubCrawlInfo from '../../containers/PubCrawlInfo/PubCrawlInfo';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
  list: {
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
      width: '0.6em'
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0, 0, 0, .3)',
      borderRadius: '20px'
    },
    '@media (max-width:1200px)': {
      padding: '0px'
    }
  }
});

const PubCrawlInfoList = (props) => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div className={classes.list}>
      {props.pubCrawls.map((pubCrawl) => (
        <PubCrawlInfo
          key={pubCrawl.id}
          id={pubCrawl.id}
          name={pubCrawl.name}
          startTime={pubCrawl.startTime}
          totalDistanceInMeters={pubCrawl.totalDistanceInMeters}
          totalDurationInMinutes={pubCrawl.totalDurationInMinutes}
          pubs={pubCrawl.pubs}
          pubCrawlClickHandler={() => {
            history.push({
              pathname: '/pub-crawl',
              search: `?id=${pubCrawl.id}`
            });
          }}
          infoButtonClickHandler={(event) => {
            event.stopPropagation();
          }}
        />
      ))}
    </div>
  );
};

PubCrawlInfoList.propTypes = forbidExtraProps({
  pubCrawls: PropTypes.arrayOf(PropTypes.exact({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    startTime: PropTypes.string.isRequired,
    legsDurations: PropTypes.arrayOf(PropTypes.number.isRequired),
    totalDistanceInMeters: PropTypes.number.isRequired,
    totalDurationInMinutes: PropTypes.number.isRequired,
    directions: PropTypes.object,
    pubs: PropTypes.arrayOf(PropTypes.exact({
      name: PropTypes.string.isRequired,
      location: PropTypes.exact({
        lat: PropTypes.number.isRequired,
        lng: PropTypes.number.isRequired
      }).isRequired,
      address: PropTypes.string.isRequired,
      weekdayText: PropTypes.oneOfType([
        PropTypes.string.isRequired,
        PropTypes.arrayOf(PropTypes.string).isRequired
      ]).isRequired,
      rating: PropTypes.number.isRequired,
      index: PropTypes.number.isRequired,
      startTime: PropTypes.string.isRequired,
      endTime: PropTypes.string.isRequired
    })).isRequired
  }).isRequired).isRequired
});

export default PubCrawlInfoList;
