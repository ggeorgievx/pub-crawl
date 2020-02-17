import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { forbidExtraProps } from 'airbnb-prop-types';

const useCustomStepIconStyles = makeStyles({
  root: {
    backgroundColor: 'rgb(204, 204, 204)',
    // The icons need to appear on top of the connectors.
    zIndex: 1,
    color: 'rgb(255, 255, 255)',
    width: '50px',
    height: '50px',
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    '@media (max-width:1200px)': {
      width: '42px',
      height: '42px'
    }
  },
  active: {
    background: 'linear-gradient(136deg, rgb(240, 98, 146) 30%, rgb(243, 0, 77) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0, 0, 0, .25)'
  },
  completed: {
    background: 'linear-gradient(136deg, rgb(240, 98, 146) 30%, rgb(243, 0, 77) 100%)'
  }
});

const CustomStepIcon = (props) => {
  const classes = useCustomStepIconStyles();

  return (
    <div
      className={`${classes.root} ${props.active ? classes.active : ''} ${props.completed ? classes.completed : ''}`}
    >
      {props.icons[props.icon]}
    </div>
  );
};

CustomStepIcon.propTypes = forbidExtraProps({
  completed: PropTypes.bool.isRequired,
  active: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  icon: PropTypes.number.isRequired,
  icons: PropTypes.objectOf(PropTypes.element.isRequired).isRequired
});

export default CustomStepIcon;
