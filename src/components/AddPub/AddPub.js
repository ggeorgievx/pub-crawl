import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Autocomplete from 'react-google-autocomplete';
import Button from '@material-ui/core/Button';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import PropTypes from 'prop-types';
import { forbidExtraProps } from 'airbnb-prop-types';
import constants from '../../constants';

const useStyles = makeStyles({
  button: {
    width: '480px',
    marginTop: '6px',
    '@media (max-width:1200px)': {
      width: '282px'
    }
  },
  autocomplete: {
    width: '464px',
    padding: '12px 0px 12px 16px',
    borderWidth: '0px',
    fontSize: '15px',
    marginTop: '6px',
    '@media (max-width:1200px)': {
      width: '266px'
    }
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
      {(!props.autocompleteOpen && !(props.pubsLength === constants.MAX_PUBS_COUNT)) && (
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
          onPlaceSelected={props.placeSelectedHandler}
          types={['establishment']}
          placeholder='Find Pubs 🔎'
          onKeyDown={props.autocompleteKeyDownHandler}
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
  addPubButtonHandler: PropTypes.func.isRequired,
  placeSelectedHandler: PropTypes.func.isRequired,
  autocompleteKeyDownHandler: PropTypes.func.isRequired
});

export default AddPub;
