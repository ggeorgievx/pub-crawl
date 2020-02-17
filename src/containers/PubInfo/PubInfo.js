import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { forbidExtraProps } from 'airbnb-prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CustomPopover from '../../components/CustomPopover/CustomPopover';
import { ReactComponent as Warning } from '../../assets/images/warning.svg';
import { ReactComponent as Calendar } from '../../assets/images/calendar.svg';

const useStyles = makeStyles({
  row: {
    display: 'flex',
    width: '100%',
    color: 'rgb(255, 255, 255)',
    alignItems: 'center'
  },
  icon: {
    width: '50px',
    height: '50px',
    '@media (max-width:1200px)': {
      width: '30px',
      height: '30px'
    }
  },
  container: {
    marginLeft: 'auto'
  },
  paddingRight: {
    paddingRight: '6px'
  },
  text: {
    display: 'flex'
  },
  interval: {
    whiteSpace: 'nowrap'
  }
});

const PubInfo = (props) => {
  const classes = useStyles();
  const [warningAnchorEl, setWarningAnchorEl] = useState(null);
  const [calendarAnchorEl, setCalendarAnchorEl] = useState(null);

  const warningEnterHandler = (event) => {
    setWarningAnchorEl(event.currentTarget);
  };
  const warningLeaveHandler = () => {
    setWarningAnchorEl(null);
  };

  const calendarEnterHandler = (event) => {
    setCalendarAnchorEl(event.currentTarget);
  };
  const calendarLeaveHandler = () => {
    setCalendarAnchorEl(null);
  };

  return (
    <div className={classes.row}>
      {(props.startTime && props.endTime) && (
        <Typography
          className={`${classes.paddingRight} ${classes.interval}`}
          variant="body2">
          {`${props.startTime}-${props.endTime}`}
        </Typography>
      )}
      {props.warning && (
        <>
          <div
            className={classes.paddingRight}
            onMouseEnter={warningEnterHandler}
            onMouseLeave={warningLeaveHandler}
          >
            <Warning className={classes.icon} />
          </div>
          <CustomPopover
            anchorEl={warningAnchorEl}
            horizontalOrigin="left"
            transformOrigin="left"
          >
            {props.warning}
          </CustomPopover>
        </>
      )}
      <Typography className={classes.paddingRight} variant="body2">
        {props.name}
      </Typography>
      <div
        className={classes.container}
        onMouseEnter={calendarEnterHandler}
        onMouseLeave={calendarLeaveHandler}
      >
        <Calendar
          className={classes.icon}
        />
      </div>
      <CustomPopover anchorEl={calendarAnchorEl}>
        {typeof props.weekdayText === 'string' ?
          <Typography
            variant="caption"
            className={classes.text}
          >
            {props.weekdayText}
          </Typography> :
          props.weekdayText.map((weekdayText, index) => (
            <Typography
              key={index}
              variant="caption"
              className={classes.text}
            >
              {weekdayText}
            </Typography>
          ))}
      </CustomPopover>
    </div>
  );
};

PubInfo.propTypes = forbidExtraProps({
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  weekdayText: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.arrayOf(PropTypes.string).isRequired
  ]).isRequired,
  warning: PropTypes.string,
  startTime: PropTypes.string,
  endTime: PropTypes.string
});

export default PubInfo;
