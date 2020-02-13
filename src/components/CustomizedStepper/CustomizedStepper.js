import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepConnector from '@material-ui/core/StepConnector';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { forbidExtraProps } from 'airbnb-prop-types';

const useColorlibStepIconStyles = makeStyles({
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
    alignItems: 'center'
  },
  active: {
    background: 'linear-gradient(136deg, rgb(240, 98, 146) 30%, rgb(243, 0, 77) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0, 0, 0, .25)'
  },
  completed: {
    background: 'linear-gradient(136deg, rgb(240, 98, 146) 30%, rgb(243, 0, 77) 100%)'
  }
});

const ColorlibStepIcon = (props) => {
  const classes = useColorlibStepIconStyles();

  return (
    <div
      className={`${classes.root} ${props.active ? classes.active : ''} ${props.completed ? classes.completed : ''}`}
    >
      {props.icons[props.icon]}
    </div>
  );
};

ColorlibStepIcon.propTypes = forbidExtraProps({
  completed: PropTypes.bool.isRequired,
  active: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  icon: PropTypes.number.isRequired,
  icons: PropTypes.objectOf(PropTypes.element.isRequired).isRequired
});

const useStyles = makeStyles({
  container: {
    alignSelf: 'flex-end'
  },
  stepperContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: '24px'
  },
  stepper: {
    backgroundColor: 'transparent',
    width: '500px',
    padding: '0px'
  },
  labelContainer: {
    display: 'none'
  },
  button: {
    width: '50px'
  },
  stepConnectorAlternativeLabel: {
    top: '24px'
  },
  stepConnectorActive: {
    '& $stepConnectorLine': {
      background: 'linear-gradient(136deg, rgb(240, 98, 146) 30%, rgb(243, 0, 77) 100%)'
    }
  },
  stepConnectorCompleted: {
    '& $stepConnectorLine': {
      background: 'linear-gradient(136deg, rgb(240, 98, 146) 30%, rgb(243, 0, 77) 100%)'
    }
  },
  stepConnectorLine: {
    height: '3px',
    border: '0px',
    backgroundColor: 'rgb(234, 234, 240)',
    borderRadius: '1px'
  }
});

const CustomizedStepper = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      {props.children[props.activeStep]}
      <div className={classes.stepperContainer}>
        <Button
          className={classes.button}
          variant="contained"
          color="default"
          disabled={props.activeStep === 0}
          onClick={props.backButtonHandler}
          size="large"
        >
          Back
        </Button>
        <Stepper
          className={classes.stepper}
          alternativeLabel
          activeStep={props.activeStep}
          connector={<StepConnector
            classes={{
              alternativeLabel: classes.stepConnectorAlternativeLabel,
              active: classes.stepConnectorActive,
              completed: classes.stepConnectorCompleted,
              line: classes.stepConnectorLine
            }}
          />}
        >
          {Array.from({ length: props.numberOfSteps }).map((_, index) => (
            <Step key={index} color="secondary">
              <StepLabel
                StepIconComponent={ColorlibStepIcon}
                StepIconProps={{ icons: props.icons }}
                classes={{ labelContainer: classes.labelContainer }}
              />
            </Step>
          ))}
        </Stepper>
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          onClick={props.nextButtonHandler}
          size="large"
        >
          {props.activeStep === props.numberOfSteps - 1 ? 'Save' : 'Next'}
        </Button>
      </div>
    </div >
  );
};

CustomizedStepper.propTypes = forbidExtraProps({
  activeStep: PropTypes.number.isRequired,
  numberOfSteps: PropTypes.number.isRequired,
  icons: PropTypes.objectOf(PropTypes.element.isRequired).isRequired,
  nextButtonHandler: PropTypes.func.isRequired,
  backButtonHandler: PropTypes.func.isRequired,
  children: PropTypes.arrayOf(PropTypes.element.isRequired).isRequired
});

export default CustomizedStepper;
