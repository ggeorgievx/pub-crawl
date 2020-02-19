import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { forbidExtraProps } from 'airbnb-prop-types';
import { makeStyles } from '@material-ui/core/styles';
import CustomPopover from '../../components/CustomPopover/CustomPopover';
import Typography from '@material-ui/core/Typography';
import { ReactComponent as Info } from '../../assets/images/info.svg';
import {
  convertAMPMTimeTo24HourTime,
  addMinutesTo24HourTime,
  convertMetersToKm,
  normalizeTFHTime
} from '../../utils';

const useStyles = makeStyles({
  icon: {
    width: '50px',
    height: '50px',
    '@media (max-width:1200px)': {
      width: '30px',
      height: '30px'
    }
  },
  container: {
    backgroundColor: 'rgb(42, 42, 42)',
    borderWidth: 'thin',
    marginBottom: '6px',
    padding: '10px',
    borderStyle: 'solid',
    borderColor: 'rgb(240, 98, 146)',
    '&:hover': {
      borderColor: 'rgb(244,143,177)'
    },
    '@media (max-width:1200px)': {
      paddingBottom: '0px'
    },
    borderRadius: '4px',
    cursor: 'pointer'
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%'
  },
  text: {
    display: 'flex'
  },
  flexOne: {
    flex: 1
  },
  flexTwo: {
    flex: 2
  },
  alignEnd: {
    textAlign: 'end'
  }
});

const PubCrawlInfo = (props) => {
  const classes = useStyles();
  const [infoAnchorEl, setInfoAnchorEl] = useState(null);

  const infoEnterHandler = (event) => {
    setInfoAnchorEl(event.currentTarget);
  };
  const infoLeaveHandler = () => {
    setInfoAnchorEl(null);
  };

  const TFHStartTime = convertAMPMTimeTo24HourTime(props.startTime);
  const pubsLength = props.pubs.length;

  return (
    <div className={classes.container} onClick={props.pubCrawlClickHandler}>
      <div className={classes.row}>
        <Typography className={classes.flexOne} variant="body2">
          {`${TFHStartTime}-${normalizeTFHTime(addMinutesTo24HourTime(props.totalDurationInMinutes, TFHStartTime))}`}
        </Typography>
        <Typography className={classes.flexTwo} variant="body2">
          {props.name}
        </Typography>
        <Typography className={classes.flexOne} variant="body2">
          {`${pubsLength} ${pubsLength > 1 ? 'pubs' : 'pub'}`}
        </Typography>
        <div
          onMouseEnter={infoEnterHandler}
          onMouseLeave={infoLeaveHandler}
        >
          <Info
            className={classes.icon}
            onClick={props.infoButtonClickHandler}
          />
        </div>
        <CustomPopover anchorEl={infoAnchorEl}>
          {props.pubs.map((pub, index) => (
            <Typography
              key={index}
              variant="caption"
              className={classes.text}
            >
              {pub.name}
            </Typography>
          ))}
        </CustomPopover>
        <Typography className={`${classes.flexOne} ${classes.alignEnd}`} variant="body2">
          {convertMetersToKm(props.totalDistanceInMeters)}
        </Typography>
      </div>
    </div>
  );
};

PubCrawlInfo.propTypes = forbidExtraProps({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  startTime: PropTypes.string.isRequired,
  totalDistanceInMeters: PropTypes.number.isRequired,
  totalDurationInMinutes: PropTypes.number.isRequired,
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
  })).isRequired,
  pubCrawlClickHandler: PropTypes.func.isRequired,
  infoButtonClickHandler: PropTypes.func.isRequired
});

export default PubCrawlInfo;
