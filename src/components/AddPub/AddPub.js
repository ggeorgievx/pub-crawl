import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Autocomplete from 'react-google-autocomplete';
import Button from '@material-ui/core/Button';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import PropTypes from 'prop-types';
import { forbidExtraProps } from 'airbnb-prop-types';

const useStyles = makeStyles({
  button: {
    width: '480px',
    marginTop: '6px'
  },
  autocomplete: {
    width: '464px',
    marginTop: '6px',
    height: '42px',
    padding: '0px 0px 0px 16px',
    borderWidth: '0px',
    fontSize: '15px'
  }
});

const AddPub = (props) => {
  const classes = useStyles();

  const fields = [
    'place_id',
    'formatted_address',
    'geometry.location',
    'icon',
    'name',
    'opening_hours',
    'rating'
  ];

  return (
    <>
      {(!props.autocompleteOpen && !(props.pubsLength === props.pubsLimit)) && (
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
      )}
      {props.autocompleteOpen && (
        <Autocomplete
          className={classes.autocomplete}
          onPlaceSelected={props.onPlaceSelected}
          types={['establishment']}
          placeholder='Find Pubs 🔎'
          onKeyDown={props.autocompleteKeyPressed}
          fields={fields}
          autoFocus
        />
      )}
    </>
  );
};

AddPub.propTypes = forbidExtraProps({
  autocompleteOpen: PropTypes.bool.isRequired,
  pubsLength: PropTypes.number.isRequired,
  pubsLimit: PropTypes.number.isRequired,
  addPubButtonHandler: PropTypes.func.isRequired,
  onPlaceSelected: PropTypes.func.isRequired,
  autocompleteKeyPressed: PropTypes.func.isRequired
});

export default AddPub;
