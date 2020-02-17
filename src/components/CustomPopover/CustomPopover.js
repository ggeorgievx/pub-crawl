import React from 'react';
import Popover from '@material-ui/core/Popover';
import PropTypes from 'prop-types';
import { forbidExtraProps } from 'airbnb-prop-types';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  popover: {
    pointerEvents: 'none'
  },
  paper: {
    backgroundColor: 'rgb(33, 33, 33)',
    borderRadius: '10px',
    padding: '4px',
    color: 'rgb(255, 255, 255)'
  }
});

const CustomPopover = (props) => {
  const classes = useStyles();

  return (
    <Popover
      className={classes.popover}
      classes={{ paper: classes.paper }}
      open={props.anchorEl !== null}
      anchorEl={props.anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: props.horizontalOrigin || 'center'
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: props.transformOrigin || 'center'
      }}
      disableRestoreFocus
    >
      {props.children}
    </Popover>
  );
};

CustomPopover.propTypes = forbidExtraProps({
  anchorEl: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.array.isRequired,
    PropTypes.element.isRequired
  ]).isRequired,
  horizontalOrigin: PropTypes.string,
  transformOrigin: PropTypes.string
});

export default CustomPopover;
