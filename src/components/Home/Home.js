import React from 'react';
import Button from '@material-ui/core/Button';
import Background from '../../assets/images/background.jpg';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  home: {
    backgroundImage: `url(${Background})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    position: 'fixed',
    width: '100%',
    height: 'calc(100% - 112px);',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  blur: {
    backgroundColor: 'rgba(224, 224, 224, 0.5)',
    backdropFilter: 'blur(2px)',
    padding: '50px'
  },
  text: {
    ...theme.typography.h2,
    color: theme.palette.secondary.main,
    letterSpacing: '10px',
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
    justifyContent: 'center'
  },
  button: {
    margin: '2em'
  }
}));

const Home = () => {
  const classes = useStyles();
  const history = useHistory();

  const guestButtonHandler = () => {
    history.push('/create');
  };

  return (
    <div className={classes.home}>
      <div className={classes.blur}>
        <div className={classes.text}>
          Design Your Journey
        </div>
        <div className={classes.container}>
          <Tooltip title="WITHOUT HISTORY" placement="top">
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              size="large"
              onClick={guestButtonHandler}
            >
              CONTINUE AS GUEST
            </Button>
          </Tooltip>
          <Tooltip title="WITH HISTORY" placement="top">
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              size="large"
            >
              LOGIN WITH GOOGLE
            </Button>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default Home;
