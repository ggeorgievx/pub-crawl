import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Autocomplete from 'react-google-autocomplete';
import Button from '@material-ui/core/Button';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

const useStyles = makeStyles({
  button: {
    width: '480px',
    '@media (max-width:850px)': {
      width: '280px'
    },
    marginTop: '6px'
  },
  autocomplete: {
    width: '464px',
    '@media (max-width:850px)': {
      width: '264px'
    },
    marginTop: '6px',
    height: '42px',
    padding: '0px 0px 0px 16px',
    borderWidth: '0px',
    fontSize: '15px'
  }
});

const AddPub = (props) => {
  const classes = useStyles();

  return (
    <>
      {(!props.autocompleteOpen && !(props.pubsLength === props.pubsLimit)) &&
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          size="large"
          endIcon={<AddCircleOutlineIcon />}
          onClick={props.addPubButtonHandler}
        >
          Add Pub
        </Button>
      }
      {props.autocompleteOpen &&
        <Autocomplete
          className={classes.autocomplete}
          onPlaceSelected={props.onPlaceSelected}
          types={['establishment']}
          placeholder='Find Pubs 🔎'
          onKeyDown={props.autocompleteKeyPressed}
          autoFocus={true}
        />
      }
    </>
  );
};

export default AddPub;
