import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ReactComponent as Logo1 } from '../../assets/images/logo1.svg';
import { ReactComponent as Logo2 } from '../../assets/images/logo2.svg';
import { Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  header: {
    height: '56px',
    background: 'rgb(0, 0, 0)'
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  link: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none'
  },
  icon: {
    width: '50px',
    height: '50px',
    margin: '3px 10px 3px 10px'
  }
});

const Header = () => {
  const classes = useStyles();

  return (
    <header className={classes.header}>
      <div className={classes.container}>
        <Link className={classes.link} to="/">
          <Logo1 className={classes.icon} />
          <Typography variant="h4" color="secondary">
            <Box fontStyle="italic">
              PUB CRAWL
            </Box>
          </Typography>
          <Logo2 className={classes.icon} />
        </Link>
      </div>
    </header>
  );
};

export default Header;
