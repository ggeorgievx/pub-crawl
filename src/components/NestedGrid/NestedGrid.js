import React from 'react';
import PropTypes from 'prop-types';
import { forbidExtraProps } from 'airbnb-prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useFormRowStyles = makeStyles({
  paper: {
    padding: '4px',
    textAlign: 'center',
    backgroundColor: 'rgb(238, 87,135)'
  },
  fetched: {
    color: 'rgb(255, 255, 255)'
  },
  notFetched: {
    color: 'rgb(0, 0, 0)'
  }
});

const FormRow = (props) => {
  const formRowClasses = useFormRowStyles();

  return Array.from({ length: props.data.length }).map((_, index) => {
    const value = props.data[index][props.index];

    return (
      <Grid key={index} item xs={1}>
        <Paper className={`${formRowClasses.paper} ${value === 'NaN' ? formRowClasses.notFetched : formRowClasses.fetched}`}>
          {value}
        </Paper>
      </Grid>
    );
  });
};

FormRow.propTypes = forbidExtraProps({
  data: PropTypes.arrayOf(
    PropTypes.array.isRequired
  ).isRequired,
  index: PropTypes.number.isRequired
});

const useNestedGridStyles = makeStyles({
  container: {
    width: '100%',
    display: 'flex',
    flexFlow: 'column',
    alignItems: 'center'
  },
  row: {
    display: 'flex',
    justifyContent: 'center'
  }
});

const NestedGrid = (props) => {
  const nestedGridClasses = useNestedGridStyles();

  return (
    <Grid className={nestedGridClasses.container} container spacing={1}>
      {Array.from({ length: props.data.length }).map((_, index) => (
        <Grid
          className={nestedGridClasses.row}
          key={index}
          container
          item
          xs={6}
          spacing={1}
        >
          <FormRow index={index} data={props.data} />
        </Grid>
      ))}
    </Grid>
  );
};

NestedGrid.propTypes = forbidExtraProps({
  data: PropTypes.arrayOf(
    PropTypes.array.isRequired
  ).isRequired
});

export default NestedGrid;
