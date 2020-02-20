import React from 'react';
import PropTypes from 'prop-types';
import { forbidExtraProps } from 'airbnb-prop-types';
import { makeStyles } from '@material-ui/core/styles';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import MapIcon from '@material-ui/icons/Map';
import FunctionsIcon from '@material-ui/icons/Functions';
import FlightIcon from '@material-ui/icons/Flight';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import constants from '../../constants';

const useStyles = makeStyles({
  speedDial: {
    position: 'absolute',
    top: '48px',
    right: '608px',
    '@media (max-width:1200px)': {
      top: '28px',
      right: '25px'
    }
  },
  outerFab: {
    backgroundColor: 'rgb(63, 81, 181)',
    '@media (max-width:1200px)': {
      width: '40px',
      height: '40px'
    }
  },
  innerFab: {
    '&:hover': {
      backgroundColor: 'rgb(244,143,177)'
    },
    '@media (max-width:1200px)': {
      margin: '3px'
    }
  },
  icon: {
    color: 'rgb(255, 255, 255)'
  },
  actions: {
    '@media (max-width:1200px)': {
      paddingTop: '39px !important'
    }
  },
  tooltip: {
    fontSize: '16px',
    '@media (max-width:1200px)': {
      marginRight: '2px',
      fontSize: '14px'
    }
  },
  enabled: {
    backgroundColor: 'rgb(240, 98, 146)'
  },
  disabled: {
    backgroundColor: 'rgb(219,	219, 219) !important'
  }
});

const CustomSpeedDial = (props) => {
  const classes = useStyles();

  const actions = [{
    icon: <FlightIcon className={classes.icon} />,
    name: constants.ALGO_SHORTEST
  }, {
    icon: <AttachMoneyIcon className={classes.icon} />,
    name: constants.ALGO_GREEDY
  }, {
    icon: <ThumbUpIcon className={classes.icon} />,
    name: constants.ALGO_RATING_ASC
  }, {
    icon: <ThumbDownIcon className={classes.icon} />,
    name: constants.ALGO_RATING_DESC
  }];

  return (
    <SpeedDial
      classes={{
        fab: classes.outerFab,
        actions: classes.actions
      }}
      ariaLabel="algo-speed-dial"
      className={classes.speedDial}
      icon={<SpeedDialIcon icon={<MapIcon />} openIcon={<FunctionsIcon />} />}
      onOpen={props.speedDialOpenHandler}
      onClose={props.speedDialCloseHandler}
      open={props.speedDialOpen}
      direction="down"
    >
      {actions.map((action) => (
        <SpeedDialAction
          classes={{
            fab: `${classes.innerFab} ${action.name === constants.ALGO_SHORTEST ? props.shortestEnabled ? classes.enabled : classes.disabled :
              props.enabled ? classes.enabled : classes.disabled}`
          }}
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
          onClick={() => {
            props.speedDialCloseHandler();
            props.runAlgo(action.name);
          }}
          TooltipClasses={{
            tooltip: classes.tooltip
          }}
          FabProps={{
            disabled: action.name === constants.ALGO_SHORTEST ?
              !props.shortestEnabled : !props.enabled
          }}
        />
      ))}
    </SpeedDial>
  );
};

CustomSpeedDial.propTypes = forbidExtraProps({
  speedDialOpen: PropTypes.bool.isRequired,
  speedDialOpenHandler: PropTypes.func.isRequired,
  speedDialCloseHandler: PropTypes.func.isRequired,
  runAlgo: PropTypes.func.isRequired,
  enabled: PropTypes.bool.isRequired,
  shortestEnabled: PropTypes.bool.isRequired
});

export default CustomSpeedDial;
