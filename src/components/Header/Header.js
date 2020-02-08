import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ReactComponent as Logo } from '../../assets/images/logo.svg';
import { Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles({
  header: {
    height: '60px',
    background: '#000000',
    display: 'flex',
    alignItems: 'center',
    color: 'white',
    justifyContent: 'center'
  },
  logo: {
    width: '54px',
    height: '54px',
    marginRight: '10px'
  }
});

const Header = () => {
  const classes = useStyles();

  return (
    <div className={classes.header}>
      <div className={classes.left}>
        <Logo className={classes.logo} />
      </div>
      <Typography variant="h4" color="secondary">
        <Box fontStyle="italic">
          PUB CRAWL
        </Box>
      </Typography>
      <div className={classes.right}></div>
    </div>
  );
};

export default Header;
