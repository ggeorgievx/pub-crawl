import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles({
  container: {
    backgroundColor: 'rgb(0, 0, 0)',
    position: 'fixed',
    width: '100%',
    height: 'calc(100% - 112px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // Prevent the user from selecting the text.
    userSelect: 'none',
    msUserSelect: 'none',
    msTouchSelect: 'none',
    WebkitUserSelect: 'none',
    KhtmlUserSelect: 'none',
    MozUserSelect: 'none',
    cursor: 'default'
  },
  flaticon: {
    color: 'rgb(255, 255, 255)'
  }
});

const Credits = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.flaticon}>
        Icons made by&nbsp;
        <Link
          color="secondary"
          href="https://www.flaticon.com/authors/freepik"
          target="_blank"
        >
          Freepik
        </Link>
        &nbsp;from&nbsp;
        <Link
          color="secondary"
          href="https://www.flaticon.com/"
          target="_blank"
        >
          www.flaticon.com
        </Link>
        .
      </div>
    </div>
  );
};

export default Credits;
