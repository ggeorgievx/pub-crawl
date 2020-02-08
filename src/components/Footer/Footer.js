import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import { Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles({
  footer: {
    position: 'absolute',
    left: '0',
    bottom: '0',
    right: '0',
    height: '60px',
    background: '#000000',
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

const Footer = () => {
  const classes = useStyles();

  return (
    <div className={classes.footer}>
      <Typography variant="h6">
        <Box fontStyle="italic">
          Inspired by&nbsp;
        <Link href="https://www.imdb.com/title/tt1213663/" color="secondary" target="_blank">
            The World's End
        </Link>
        </Box>
      </Typography>
    </div>
  );
};

export default Footer;
