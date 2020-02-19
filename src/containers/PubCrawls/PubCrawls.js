import React, { useState, useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axiosPubCrawlsInstance from '../../axiosPubCrawls';
import AuthContext from '../../authContext';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { useHistory } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import PubCrawlInfoList from '../../components/PubCrawlInfoList/PubCrawlInfoList';

const useStyles = makeStyles({
  pubCrawls: {
    backgroundColor: 'rgb(33, 33, 33)',
    position: 'fixed',
    width: 'calc(100% - 40px)',
    height: 'calc(100% - 152px)',
    display: 'flex',
    justifyContent: 'center',
    padding: '20px',
    '@media (min-width:3000px)': {
      height: 'calc(100% - 196px)'
    },
    '@media (max-width:1200px)': {
      width: 'calc(100% - 16px)',
      height: 'calc(100% - 128px)',
      padding: '8px'
    }
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'rgb(0, 0, 0)',
    width: 'calc(100% - 28px)',
    height: 'calc(100% - 28px)',
    padding: '14px'
  },
  paper: {
    maxHeight: 'calc(100% - 60px)',
    display: 'flex',
    flexDirection: 'column',
    padding: '30px',
    backgroundColor: 'rgb(33, 33, 33)',
    alignSelf: 'center',
    '@media (max-width:1200px)': {
      width: 'calc(100% - 60px)',
      height: 'calc(100% - 60px)'
    },
    color: 'rgb(255, 255, 255)',
    // Prevent the user from selecting the text.
    userSelect: 'none',
    msUserSelect: 'none',
    msTouchSelect: 'none',
    WebkitUserSelect: 'none',
    KhtmlUserSelect: 'none',
    MozUserSelect: 'none',
    cursor: 'default'
  },
  backdrop: {
    zIndex: 1
  },
  button: {
    width: '480px',
    minHeight: '42px',
    marginTop: '6px',
    '@media (max-width:1200px)': {
      width: '282px'
    },
    alignSelf: 'center'
  },
  name: {
    alignSelf: 'center',
    marginBottom: '6px'
  }
});

const PubCrawls = () => {
  const classes = useStyles();
  const history = useHistory();
  const authContext = useContext(AuthContext);
  const [pubCrawls, setPubCrawls] = useState([]);
  const [backdropOpen, setBackdropOpen] = useState(true);

  useEffect(() => {
    setBackdropOpen(true);

    const normalizePubCrawls = (pubCrawls) => {
      let currentUsersPubCrawls;

      if (authContext.currentUser !== null) {
        currentUsersPubCrawls = pubCrawls[authContext.currentUser.uid];
      } else {
        currentUsersPubCrawls = pubCrawls;
      }

      const normalizedPubCrawls = Object.keys(currentUsersPubCrawls).map((currentUsersPubCrawlId) => {
        return {
          ...currentUsersPubCrawls[currentUsersPubCrawlId],
          id: currentUsersPubCrawlId
        };
      });

      return normalizedPubCrawls;
    };

    const normalizeAndSetPubCrawls = (pubCrawls) => {
      setPubCrawls(() => {
        const normalizedPubCrawls = normalizePubCrawls(pubCrawls);

        setBackdropOpen(false);

        return normalizedPubCrawls;
      });
    };

    const fetchPubCrawlsFromFirebase = async () => {
      const response = await axiosPubCrawlsInstance('.json');

      normalizeAndSetPubCrawls(response.data);
    };

    const retrievePubCrawlsFromLocalStorage = () => {
      const localStorageWithParsedKeys = Object.fromEntries(Object.entries(localStorage).map(([key, value]) => [key, JSON.parse(value)]));

      normalizeAndSetPubCrawls(localStorageWithParsedKeys);
    };

    if (authContext.currentUser !== null) {
      fetchPubCrawlsFromFirebase();
    } else {
      retrievePubCrawlsFromLocalStorage();
    }
  }, [authContext.currentUser]);

  const createButtonHandler = () => {
    history.push('/create');
  };

  return (
    <div className={classes.pubCrawls}>
      <Paper className={classes.container} elevation={3}>
        <Paper className={classes.paper}>
          <Typography className={classes.name} variant="subtitle1">
            Your Pub Crawls
          </Typography>
          <PubCrawlInfoList pubCrawls={pubCrawls} />
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            size="large"
            endIcon={<AddCircleOutlineIcon />}
            onClick={createButtonHandler}
          >
            Create
          </Button>
          <Backdrop
            className={classes.backdrop}
            open={backdropOpen}
          >
            <CircularProgress color="secondary" />
          </Backdrop>
        </Paper>
      </Paper>
    </div>
  );
};

export default PubCrawls;
