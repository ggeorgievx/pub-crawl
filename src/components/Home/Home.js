import React from 'react';
import Button from '@material-ui/core/Button';
import Background from '../../assets/images/background.jpg';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles({
  home: {
    backgroundImage: `url(${Background})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    position: 'fixed',
    width: '100%',
    height: 'calc(100% - 120px);',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '@media (max-width:850px)': {
      flexDirection: 'column'
    }
  },
  tooltip: {
    fontSize: 14
  },
  button: {
    margin: '2em'
  },
  blur: {
    backgroundColor: 'rgba(200, 200, 200, 0.5)',
    backdropFilter: 'blur(5px)',
    padding: '50px'
  }
});

const Home = () => {
  const classes = useStyles();

  return (
    <div className={classes.home}>
      <div className={classes.blur}>
        <Typography variant="h2" color="secondary">
          <Box letterSpacing={10}>
            Design Your Journey
          </Box>
        </Typography>
        <div className={classes.container}>
          <Tooltip className={classes.tooltip} title="WITHOUT HISTORY" placement="top">
            <Button className={classes.button} variant="contained" color="primary">
              CONTINUE AS GUEST
            </Button>
          </Tooltip>
          <Tooltip className={classes.tooltip} title="WITH HISTORY" placement="top">
            <Button className={classes.button} variant="contained" color="primary">
              LOGIN WITH GOOGLE
            </Button>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default Home;
