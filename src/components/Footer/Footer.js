import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import { Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles({
  footer: {
    position: 'absolute',
    left: '0px',
    bottom: '0px',
    right: '0px',
    height: '56px',
    background: 'rgb(0, 0, 0)',
    color: 'rgb(255,255,255)',
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
    cursor: 'default',
    // Allow Draggables to be dragged over the footer.
    zIndex: -1
  }
});

const Footer = () => {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Typography variant="h6">
        <Box fontStyle="italic">
          Inspired by&nbsp;
          <Link
            color="secondary"
            href="https://www.imdb.com/title/tt1213663/"
            target="_blank"
          >
            The World's End
          </Link>
        </Box>
      </Typography>
    </footer>
  );
};

export default Footer;
