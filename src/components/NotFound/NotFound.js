import React from 'react';
import NotFoundImage from '../../assets/images/not-found.png';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  container: {
    backgroundColor: 'rgb(0, 0, 0)',
    position: 'fixed',
    width: '100%',
    height: 'calc(100% - 112px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  notFound: {
    backgroundImage: `url(${NotFoundImage})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    width: '512px',
    height: '512px'
  }
});

const NotFound = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.notFound} />
    </div>
  );
};

export default NotFound;
