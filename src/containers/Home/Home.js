import React, { useState, useContext } from 'react';
import Button from '@material-ui/core/Button';
import Background from '../../assets/images/background.jpg';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import AuthContext from '../../authContext';
import axiosPubCrawlsInstance from '../../axiosPubCrawls';

const useStyles = makeStyles((theme) => {

  return {
    home: {
      backgroundImage: `url(${Background})`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      position: 'fixed',
      width: '100%',
      height: 'calc(100% - 112px)',
      textAlign: 'center',
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      '@media (min-width:3000px)': {
        height: 'calc(100% - 156px)'
      }
    },
    blur: {
      backgroundColor: 'rgba(224, 224, 224, .5)',
      backdropFilter: 'blur(2px)',
      padding: '50px'
    },
    text: {
      ...theme.typography.h2,
      color: theme.palette.secondary.main,
      letterSpacing: '10px',
      '@media (max-width:1200px)': {
        ...theme.typography.h4,
        letterSpacing: '4px',
        fontWeight: 300
      },
      '@media (min-width:3000px)': {
        ...theme.typography.h1,
        letterSpacing: '8px',
        fontWeight: 300
      },
      // Prevent the user from selecting the text.
      userSelect: 'none',
      msUserSelect: 'none',
      msTouchSelect: 'none',
      WebkitUserSelect: 'none',
      KhtmlUserSelect: 'none',
      MozUserSelect: 'none',
      cursor: 'default'
    },
    container: {
      display: 'flex',
      justifyContent: 'center',
      '@media (max-width:1200px)': {
        flexDirection: 'column',
        alignItems: 'center'
      }
    },
    button: {
      margin: '2em'
    },
    backdrop: {
      zIndex: 1
    }
  };
});
const Home = () => {
  const classes = useStyles();
  const history = useHistory();
  const authContext = useContext(AuthContext);
  const [backdropOpen, setBackdropOpen] = useState(false);
  const [snackbarSuccessOpen, setSnackbarSuccessOpen] = useState(false);
  const [snackbarErrorOpen, setSnackbarErrorOpen] = useState(false);

  const checkIfCurrentUserHasPubCrawls = (newUser) => {
    const currentUser = newUser || authContext.currentUser;

    return new Promise((resolve) => {
      if (currentUser !== null) {
        currentUser.getIdToken(true)
          .then((idToken) => {
            return axiosPubCrawlsInstance(`/${currentUser.uid}.json?auth=${idToken}`);
          })
          .then((response) => {
            resolve(Object.keys(response.data).length > 0);
          })
          .catch(() => {
            resolve(false);
          });
      } else {
        resolve(localStorage.length > 0);
      }
    });
  };
  const getRedirectLocation = async (newUser) => {
    const userHasPubCrawls = await checkIfCurrentUserHasPubCrawls(newUser);

    if (userHasPubCrawls) {
      return '/pub-crawls';
    } else {
      return '/create';
    }
  };
  const redirect = async (newUser) => {
    const redirectLocation = await getRedirectLocation(newUser);

    setTimeout(() => {
      history.push(redirectLocation);
    }, 1500);

    setBackdropOpen(false);

    if (typeof newUser !== 'undefined') {
      setSnackbarSuccessOpen(true);
    } else {
      setSnackbarErrorOpen(true);
    }
  };
  const backdropClickHandler = () => {
    setBackdropOpen(false);
  };
  const buttonHandler = async () => {
    setBackdropOpen(true);

    const redirectLocation = await getRedirectLocation();

    setBackdropOpen(false);

    history.push(redirectLocation);
  };
  const googleButtonHandler = () => {
    const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

    setBackdropOpen(true);

    firebase
      .auth()
      .signInWithPopup(googleAuthProvider)
      .then((newUserCredential) => {
        redirect(newUserCredential.user);
      })
      .catch(() => {
        redirect();
      });
  };

  return (
    <div className={classes.home}>
      <div className={classes.blur}>
        <div className={classes.text}>
          Design Your Journey
        </div>
        {authContext.currentUser === null ? (
          <div className={classes.container}>
            <Tooltip
              title="WITHOUT HISTORY"
              placement="top"
              enterTouchDelay={50}
              leaveTouchDelay={300}
            >
              <Button
                className={classes.button}
                variant="contained"
                color="primary"
                size="large"
                onClick={buttonHandler}
              >
                CONTINUE AS GUEST
              </Button>
            </Tooltip>
            <Tooltip
              title="WITH HISTORY"
              placement="top"
              enterTouchDelay={50}
              leaveTouchDelay={300}
            >
              <Button
                className={classes.button}
                variant="contained"
                color="primary"
                size="large"
                onClick={googleButtonHandler}
              >
                LOGIN WITH GOOGLE
              </Button>
            </Tooltip>
          </div>
        ) : (
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            size="large"
            onClick={buttonHandler}
          >
            CONTINUE
          </Button>
        )}
      </div>
      <Backdrop
        className={classes.backdrop}
        open={backdropOpen}
        onClick={backdropClickHandler}
      >
        <CircularProgress color="secondary" />
      </Backdrop>
      <Snackbar
        open={snackbarSuccessOpen}
        autoHideDuration={1200}
        onClose={() => setSnackbarSuccessOpen(false)}
      >
        <MuiAlert elevation={6} variant="filled" severity="success">
          Successfully logged in with Google! Continuing...
        </MuiAlert>
      </Snackbar>
      <Snackbar
        open={snackbarErrorOpen}
        autoHideDuration={1200}
        onClose={() => setSnackbarErrorOpen(false)}
      >
        <MuiAlert elevation={6} variant="filled" severity="error">
          Failed to login with Google! Continuing as guest...
        </MuiAlert>
      </Snackbar>
    </div >
  );
};

export default Home;
