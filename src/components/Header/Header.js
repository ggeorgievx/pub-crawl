import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Logo from '../../assets/images/logo.png';
import { Link } from 'react-router-dom';
import AuthContext from '../../authContext';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles({
  header: {
    height: '56px',
    backgroundColor: 'rgb(0, 0, 0)',
    display: 'flex',
    justifyContent: 'center',
    // Prevent the user from selecting the logo.
    userSelect: 'none',
    msUserSelect: 'none',
    msTouchSelect: 'none',
    WebkitUserSelect: 'none',
    KhtmlUserSelect: 'none',
    MozUserSelect: 'none',
    cursor: 'default',
    '@media (min-width:3000px)': {
      height: '100px'
    }
  },
  icon: {
    height: '48px',
    marginTop: '4px',
    marginBottom: '4px',
    '@media (min-width:3000px)': {
      height: '84px',
      marginTop: '8px',
      marginBottom: '8px'
    }
  },
  picture: {
    width: '48px',
    height: '48px',
    marginTop: '4px',
    marginBottom: '4px',
    marginLeft: '7px'
  }
});

const Header = () => {
  const classes = useStyles();
  const authContext = useContext(AuthContext);

  return (
    <header className={classes.header}>
      <Link to="/">
        <img src={Logo} alt="Pub Crawl Logo" className={classes.icon} />
      </Link>
      <Avatar
        alt={authContext.currentUser !== null ? authContext.currentUser.displayName : 'Guest'}
        src={authContext.currentUser !== null ? authContext.currentUser.photoURL : ''}
        className={classes.picture}
      />
      )}
    </header>
  );
};

export default Header;
