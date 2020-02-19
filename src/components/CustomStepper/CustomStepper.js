import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepConnector from '@material-ui/core/StepConnector';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { forbidExtraProps } from 'airbnb-prop-types';
import Paper from '@material-ui/core/Paper';
import Map from '../Map/Map';
import CircularProgress from '@material-ui/core/CircularProgress';
import CustomStepIcon from '../CustomStepIcon/CustomStepIcon';
import constants from '../../constants';

const useStyles = makeStyles({
  container: {
    width: 'calc(100% - 40px)',
    height: 'calc(100% - 40px)',
    padding: '20px',
    '@media (max-width:1200px)': {
      width: 'calc(100% - 16px)',
      height: 'calc(100% - 12px)',
      padding: '8px 8px 4px 8px'
    }
  },
  childContainer: {
    width: 'calc(100% - 28px)',
    height: 'calc(100% - 98px)',
    display: 'flex',
    justifyContent: 'center',
    padding: '14px',
    backgroundColor: 'rgb(0, 0, 0)',
    '@media (max-width:1200px)': {
      height: 'calc(100% - 76px)',
      alignItems: 'center',
      justifyContent: 'flex-start',
      flexDirection: 'column'
    }
  },
  stepperContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    paddingTop: '20px',
    '@media (max-width:1200px)': {
      paddingTop: '4px'
    }
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
    top: '24px',
    '@media (max-width:1200px)': {
      top: '20px'
    }
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
  },
  mapContainer: {
    height: '100%',
    width: '100%',
    paddingRight: '20px',
    '@media (max-width:1200px)': {
      paddingRight: '0px',
      paddingBottom: '5px',
      maxHeight: 'calc(44% + 50px)'
    }
  },
  loadingContainer: {
    height: '100%',
    width: '100%',
    paddingRight: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '@media (max-width:1200px)': {
      paddingRight: '0px',
      paddingBottom: '5px',
      maxHeight: 'calc(44% + 50px)'
    }
  },
  map: {
    height: '100%',
    width: '100%',
    // Hide the close button from the Info Window and center the text content.
    // https://stackoverflow.com/questions/18933367/gmaps-v3-infowindow-disable-the-close-x-button/20687648
    '& .gm-style-iw > button': {
      display: 'none !important'
    },
    '& .gm-style-iw-c': {
      padding: '12px !important'
    },
    '& .gm-style-iw-d': {
      overflow: 'auto !important'
    }
  },
  hidden: {
    display: 'none'
  }
});

const CustomStepper = (props) => {
  const classes = useStyles();

  const loadingElement = (
    <div className={classes.loadingContainer}>
      <CircularProgress
        size={300}
        color="secondary"
      />
    </div>
  );
  const mapContainerElement = (<div className={`${classes.mapContainer} ${props.activeStep > 0 ? classes.hidden : ''}`} />);
  const mapElement = (<div className={classes.map} />);
  const pubMarkersInfo = props.pubCrawlInfo.pubs.map((pub) => ({
    name: pub.name,
    location: pub.location
  }));

  return (
    <div className={classes.container}>
      <Paper className={classes.childContainer} elevation={3}>
        <Map
          googleMapURL={constants.GOOGLE_MAP_URL}
          loadingElement={loadingElement}
          containerElement={mapContainerElement}
          mapElement={mapElement}
          mapCenter={props.pubCrawlInfo.mapCenter}
          pubMarkersInfo={pubMarkersInfo}
          directions={props.pubCrawlInfo.directions}
          zoom={props.pubCrawlInfo.zoom}
        />
        {props.children[props.activeStep]}
      </Paper>
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
                StepIconComponent={CustomStepIcon}
                StepIconProps={{ icons: props.icons }}
                classes={{ labelContainer: classes.labelContainer }}
              />
            </Step>
          ))}
        </Stepper>
        <Button
          className={classes.button}
          variant="contained"
          disabled={!props.valid}
          color="primary"
          onClick={props.nextSaveButtonHandler}
          size="large"
        >
          {(props.activeStep === props.numberOfSteps - 1) ? 'Save' : 'Next'}
        </Button>
      </div>
    </div >
  );
};

CustomStepper.propTypes = forbidExtraProps({
  activeStep: PropTypes.number.isRequired,
  numberOfSteps: PropTypes.number.isRequired,
  icons: PropTypes.objectOf(PropTypes.element.isRequired).isRequired,
  nextSaveButtonHandler: PropTypes.func.isRequired,
  backButtonHandler: PropTypes.func.isRequired,
  children: PropTypes.arrayOf(PropTypes.element.isRequired).isRequired,
  valid: PropTypes.bool.isRequired,
  pubCrawlInfo: PropTypes.shape(PropTypes.exact({
    pubs: PropTypes.arrayOf(PropTypes.exact({
      formattedAddress: PropTypes.string.isRequired,
      location: PropTypes.exact({
        lat: PropTypes.number.isRequired,
        lng: PropTypes.number.isRequired
      }).isRequired,
      name: PropTypes.string.isRequired,
      weekdayText: PropTypes.oneOfType([
        PropTypes.string.isRequired,
        PropTypes.arrayOf(
          PropTypes.string.isRequired
        ).isRequired
      ]).isRequired,
      placeId: PropTypes.string.isRequired,
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
    directions: PropTypes.object,
    autocompleteOpen: PropTypes.bool.isRequired,
    zoom: PropTypes.number.isRequired,
    mapCenter: PropTypes.exact({
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired
    }).isRequired
  }).isRequired).isRequired
});

export default CustomStepper;
