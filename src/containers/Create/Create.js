import React, {
  useState,
  useReducer,
  useRef,
  useMemo,
  useContext
} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import RoomIcon from '@material-ui/icons/Room';
import EventNoteIcon from '@material-ui/icons/EventNote';
import InfoIcon from '@material-ui/icons/Info';
import CustomStepper from '../../components/CustomStepper/CustomStepper';
import PubList from '../../components/PubList/PubList';
import PubCrawlDetails from '../../components/PubCrawlDetails/PubCrawlDetails';
import {
  normalizePlace,
  calculatePubCrawlDetails,
  convert24HourTimeToAMPMTime,
  calculateStartAndEndTimeForPubAtIndex
} from '../../utils';
import PubInfoList from '../../components/PubInfoList/PubInfoList';
import constants from '../../constants';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import AuthContext from '../../authContext';
import axiosPubCrawlsInstance from '../../axiosPubCrawls';
import { useHistory } from 'react-router-dom';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles({
  create: {
    backgroundColor: 'rgb(33, 33, 33)',
    position: 'fixed',
    width: '100%',
    height: 'calc(100% - 112px)',
    display: 'flex',
    justifyContent: 'center',
    '@media (min-width:3000px)': {
      height: 'calc(100% - 156px)'
    }
  },
  disablePointerEvents: {
    pointerEvents: 'none'
  },
  enablePointerEvents: {
    pointerEvents: 'auto'
  },
  backdrop: {
    zIndex: 1
  }
});

const Create = () => {
  const classes = useStyles();
  const history = useHistory();
  const [activeStep, setActiveStep] = useState(0);
  const [pubCrawlStartTime, setPubCrawlStartTime] = useState('7:30 pm');
  const [pubCrawlName, setPubCrawlName] = useState(constants.DEFAULT_PUB_CRAWL_NAME);
  const directionsService = useRef(null);
  const legsDurations = useRef([]);
  const totalPubCrawlDistanceInMeters = useRef(0);
  const totalPubCrawlDurationInMinutes = useRef(0);
  const authContext = useContext(AuthContext);
  const [backdropOpen, setBackdropOpen] = useState(false);
  const [snackbarSuccessOpen, setSnackbarSuccessOpen] = useState(false);
  const [snackbarWarningOpen, setSnackbarWarningOpen] = useState(false);
  const [snackbarErrorOpen, setSnackbarErrorOpen] = useState(false);

  const numberOfSteps = 3;
  const icons = {
    1: <RoomIcon />,
    2: <EventNoteIcon />,
    3: <InfoIcon />
  };

  const pubCrawlInfoReducer = (pubCrawlInfo, action) => {
    switch (action.type) {
      case 'setDialogOpenFalse':
        return {
          ...pubCrawlInfo,
          dialogOpen: false
        };
      case 'setPubs':
        return {
          ...pubCrawlInfo,
          pubs: action.newPubs,
          directions: action.newDirections
        };
      case 'setAutocompleteOpenTrue':
        return {
          ...pubCrawlInfo,
          autocompleteOpen: true
        };
      case 'setAutocompleteOpenFalse':
        return {
          ...pubCrawlInfo,
          autocompleteOpen: false
        };
      case 'addNewPub':
        const newPub = normalizePlace(action.place);
        const newPubs = [...pubCrawlInfo.pubs, newPub];
        const dialogOpen = newPubs.length === constants.MAX_PUBS_COUNT;
        const isFirstPub = pubCrawlInfo.pubs.length === 0;

        return {
          ...pubCrawlInfo,
          pubs: newPubs,
          dialogOpen: dialogOpen,
          autocompleteOpen: false,
          directions: action.newDirections,
          mapCenter: isFirstPub ? newPub.location : pubCrawlInfo.mapCenter,
          zoom: isFirstPub ? 12 : pubCrawlInfo.zoom
        };
      default:
        return pubCrawlInfo;
    }
  };

  const [pubCrawlInfo, dispatchPubCrawlInfoUpdate] = useReducer(
    pubCrawlInfoReducer,
    {
      pubs: [],
      directions: null,
      dialogOpen: false,
      autocompleteOpen: false,
      // https://www.latlong.net/place/new-york-city-ny-usa-1848.html
      // Alternatively prompt the user to share their geolocation and center there.
      mapCenter: {
        lat: 40.730610, lng: -73.935242
      },
      zoom: 5
    }
  );

  const sendDirectionsResultRequest = (
    directionsOptions,
    directionsCallback
  ) => {
    if (directionsService.current === null) {
      directionsService.current = new window.google.maps.DirectionsService();
    }

    const directionsRequest = {
      travelMode: window.google.maps.TravelMode.WALKING,
      ...directionsOptions
    };

    directionsService.current.route(directionsRequest, directionsCallback);
  };

  const backButtonHandler = () => {
    setActiveStep((prevActiveStep) => {
      return prevActiveStep - 1;
    });
  };

  const nextSaveButtonHandler = () => {
    if (activeStep < numberOfSteps - 1) {
      setActiveStep((prevActiveStep) => {
        return prevActiveStep + 1;
      });
    } else if (activeStep === numberOfSteps - 1) {
      const pubs = pubCrawlInfo.pubs.map((pub, index) => {
        const [startTime, endTime] = calculateStartAndEndTimeForPubAtIndex(
          index,
          pubCrawlInfo.pubs,
          pubCrawlStartTime,
          legsDurations.current
        );

        return {
          name: pub.name,
          location: pub.location,
          address: pub.formattedAddress,
          weekdayText: pub.weekdayText,
          rating: pub.rating,
          index: index,
          startTime: startTime,
          endTime: endTime
        };
      });

      const pubCrawl = {
        name: pubCrawlName,
        startTime: pubCrawlStartTime,
        legsDurations: legsDurations.current,
        totalDistanceInMeters: totalPubCrawlDistanceInMeters.current,
        totalDurationInMinutes: totalPubCrawlDurationInMinutes.current,
        directions: pubCrawlInfo.directions,
        pubs: pubs
      };

      if (authContext.currentUser !== null) {
        setBackdropOpen(() => {
          return true;
        });

        authContext.currentUser.getIdToken(true)
          .then((idToken) => {
            return axiosPubCrawlsInstance.post(`/${authContext.currentUser.uid}.json?auth=${idToken}`, pubCrawl);
          })
          .then(() => {
            setTimeout(() => {
              history.push('/pub-crawls');
            }, 2000);

            setBackdropOpen(() => {
              return false;
            });

            setSnackbarSuccessOpen(true);
          })
          .catch(() => {
            setSnackbarErrorOpen(true);
          });
      } else {
        setTimeout(() => {
          history.push('/pub-crawls');
        }, 3000);

        setSnackbarWarningOpen(true);

        window.localStorage.setItem(+new Date(), JSON.stringify(pubCrawl));
      }
    }
  };
  const okayButtonHandler = () => {
    dispatchPubCrawlInfoUpdate({ type: 'setDialogOpenFalse' });
  };
  const dragStartHandler = () => {
    document.body.className = classes.disablePointerEvents;
  };
  const dragEndHandler = (result) => {
    document.body.className = classes.enablePointerEvents;

    const { destination, source } = result;

    // Dropped outside.
    if (!destination) {
      return;
    }

    const destinationIndex = destination.index;
    const sourceIndex = source.index;

    // Dropped at the same position.
    if (destinationIndex === sourceIndex) {
      return;
    }

    const newPubs = [
      ...pubCrawlInfo.pubs
    ];

    const [deletedPub] = newPubs.splice(sourceIndex, 1);
    newPubs.splice(destinationIndex, 0, deletedPub);

    const waypoints = [...newPubs].map((pub) => ({
      location: pub.location,
      stopover: true
    }));
    const originWaypoint = waypoints.shift().location;
    const destinationWaypoint = waypoints.pop().location;

    const directionsOptions = {
      origin: originWaypoint,
      destination: destinationWaypoint,
      waypoints: waypoints
    };

    const directionsCallback = (directionsResult, directionsStatus) => {
      dispatchPubCrawlInfoUpdate({
        type: 'setPubs',
        newPubs: newPubs,
        newDirections: directionsStatus === window.google.maps.DirectionsStatus.OK ? directionsResult : null
      });
    };

    sendDirectionsResultRequest(directionsOptions, directionsCallback);
  };
  const addPubButtonHandler = () => {
    dispatchPubCrawlInfoUpdate({ type: 'setAutocompleteOpenTrue' });
  };
  const removePubButtonHandler = (index) => {
    const newPubs = [
      ...pubCrawlInfo.pubs
    ];

    newPubs.splice(index, 1);

    if (newPubs.length > 1) {
      const waypoints = [...newPubs].map((pub) => ({
        location: pub.location,
        stopover: true
      }));
      const originWaypoint = waypoints.shift().location;
      const destinationWaypoint = waypoints.pop().location;

      const directionsOptions = {
        origin: originWaypoint,
        destination: destinationWaypoint,
        waypoints: waypoints
      };

      const directionsCallback = (directionsResult, directionsStatus) => {
        dispatchPubCrawlInfoUpdate({
          type: 'setPubs',
          newPubs: newPubs,
          newDirections: directionsStatus === window.google.maps.DirectionsStatus.OK ? directionsResult : null
        });
      };

      sendDirectionsResultRequest(directionsOptions, directionsCallback);
    } else {
      dispatchPubCrawlInfoUpdate({
        type: 'setPubs',
        newPubs: newPubs,
        newDirections: null
      });
    }
  };
  const sliderChangeHandler = (index, value) => {
    const newPubs = [
      ...pubCrawlInfo.pubs
    ];

    newPubs[index].duration = value;

    dispatchPubCrawlInfoUpdate({
      type: 'setPubs',
      newPubs: newPubs,
      newDirections: pubCrawlInfo.directions
    });
  };
  const placeSelectedHandler = (place) => {
    // Handle the case when the user presses 'Enter' without selecting a place.
    // The placeSelectedHandler handler is fired before onKeyDown.
    if (typeof place.geometry === 'undefined') {
      return;
    }

    if (pubCrawlInfo.pubs.length > 0) {
      const newPubPlaceholder = place.geometry;

      const waypoints = [...pubCrawlInfo.pubs, newPubPlaceholder].map((pub) => ({
        location: pub.location,
        stopover: true
      }));
      const origin = waypoints.shift().location;
      const destination = waypoints.pop().location;

      const directionsOptions = {
        origin: origin,
        destination: destination,
        waypoints: waypoints
      };

      const directionsCallback = (directionsResult, directionsStatus) => {
        dispatchPubCrawlInfoUpdate({
          type: 'addNewPub',
          place: place,
          newDirections: directionsStatus === window.google.maps.DirectionsStatus.OK ? directionsResult : null
        });
      };

      sendDirectionsResultRequest(directionsOptions, directionsCallback);
    } else {
      dispatchPubCrawlInfoUpdate({
        type: 'addNewPub',
        place: place,
        newDirections: null
      });
    }
  };
  const autocompleteKeyDownHandler = (event) => {
    if (event.key === 'Escape') {
      dispatchPubCrawlInfoUpdate({ type: 'setAutocompleteOpenFalse' });
    }
  };
  const pubCrawlNameChangeHandler = (event) => {
    setPubCrawlName(event.target.value);
  };
  const startTimeChangeHandler = (data) => {
    let newStartTime;

    if (typeof data.formatted24 !== 'undefined') {
      newStartTime = convert24HourTimeToAMPMTime(data.formatted24);
    } else {
      newStartTime = convert24HourTimeToAMPMTime(data.target.value);
    }

    setPubCrawlStartTime(() => {
      return newStartTime;
    });
  };
  const backdropClickHandler = () => {
    setBackdropOpen(false);
  };

  // Calculate legsDurations, totalPubCrawlDistanceInMeters and
  // totalPubCrawlDurationInMinutes when a new pub is added, a pub is removed or
  // the order of the pubs has changed.
  useMemo(() => {
    const {
      legsDurations: newLegsDirections,
      totalPubCrawlDistanceInMeters: newTotalPubCrawlDistanceInMeters,
      totalPubCrawlDurationInMinutes: newTotalPubCrawlDurationInMinutes
    } = calculatePubCrawlDetails(pubCrawlInfo.pubs, pubCrawlInfo.directions);

    legsDurations.current = newLegsDirections;
    totalPubCrawlDistanceInMeters.current = newTotalPubCrawlDistanceInMeters;
    totalPubCrawlDurationInMinutes.current = newTotalPubCrawlDurationInMinutes;
  }, [pubCrawlInfo.pubs, pubCrawlInfo.directions]);

  let valid = false;

  const pubCrawlNameValid = (constants.MIN_PUB_CRAWL_NAME_LENGTH <= pubCrawlName.length && pubCrawlName.length <= constants.MAX_PUB_CRAWL_NAME_LENGTH);
  if (
    (activeStep === 0 && pubCrawlInfo.pubs.length > 0) ||
    (activeStep === 1 && pubCrawlNameValid) ||
    activeStep === 2
  ) {
    valid = true;
  }

  return (
    <div className={classes.create}>
      <CustomStepper
        activeStep={activeStep}
        nextSaveButtonHandler={nextSaveButtonHandler}
        backButtonHandler={backButtonHandler}
        numberOfSteps={numberOfSteps}
        icons={icons}
        valid={valid}
        pubCrawlInfo={pubCrawlInfo}
      >
        <PubList
          pubs={pubCrawlInfo.pubs}
          dragStartHandler={dragStartHandler}
          dragEndHandler={dragEndHandler}
          addPubButtonHandler={addPubButtonHandler}
          autocompleteOpen={pubCrawlInfo.autocompleteOpen}
          placeSelectedHandler={placeSelectedHandler}
          autocompleteKeyDownHandler={autocompleteKeyDownHandler}
          removePubButtonHandler={removePubButtonHandler}
          sliderChangeHandler={sliderChangeHandler}
          dialogOpen={pubCrawlInfo.dialogOpen}
          okayButtonHandler={okayButtonHandler}
        />
        <PubCrawlDetails
          pubCrawlName={pubCrawlName}
          pubCrawlStartTime={pubCrawlStartTime}
          pubCrawlNameChangeHandler={pubCrawlNameChangeHandler}
          startTimeChangeHandler={startTimeChangeHandler}
        />
        <PubInfoList
          pubCrawlName={pubCrawlName}
          totalPubCrawlDistanceInMeters={totalPubCrawlDistanceInMeters.current}
          totalPubCrawlDurationInMinutes={totalPubCrawlDurationInMinutes.current}
          pubs={pubCrawlInfo.pubs}
          pubCrawlStartTime={pubCrawlStartTime}
          legsDurations={legsDurations.current}
        />
      </CustomStepper>
      <Backdrop
        className={classes.backdrop}
        open={backdropOpen}
        onClick={backdropClickHandler}
      >
        <CircularProgress color="secondary" />
      </Backdrop>
      <Snackbar
        open={snackbarSuccessOpen}
        autoHideDuration={1500}
        onClose={() => setSnackbarSuccessOpen(false)}
      >
        <MuiAlert elevation={6} variant="filled" severity="success">
          Successfully saved Pub Crawl! Continuing...
        </MuiAlert>
      </Snackbar>
      <Snackbar
        open={snackbarWarningOpen}
        autoHideDuration={2500}
        onClose={() => setSnackbarWarningOpen(false)}
      >
        <MuiAlert elevation={6} variant="filled" severity="warning">
          Saved Pub Crawl! Consider logging in if you want your data to be persisted. Continuing...
        </MuiAlert>
      </Snackbar>
      <Snackbar
        open={snackbarErrorOpen}
        autoHideDuration={1500}
        onClose={() => setSnackbarErrorOpen(false)}
      >
        <MuiAlert elevation={6} variant="filled" severity="error">
          Failed to save Pub Crawl!
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default Create;
