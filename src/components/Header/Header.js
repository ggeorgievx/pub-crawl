import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Logo from '../../assets/images/logo.png';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  header: {
    height: '56px',
    backgroundColor: 'rgb(0, 0, 0)',
    display: 'flex',
    justifyContent: 'center'
  },
  icon: {
    height: '50px',
    marginTop: '3px',
    marginBottom: '3px'
  }
});

const Header = () => {
  const classes = useStyles();

  return (
    <header className={classes.header}>
      <Link className={classes.link} to="/">
        <img src={Logo} alt="Logo" className={classes.icon} />
      </Link>
    </header>
  );
};

export default Header;
