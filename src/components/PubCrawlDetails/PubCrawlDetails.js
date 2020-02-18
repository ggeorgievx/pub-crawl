import React from 'react';
import PropTypes from 'prop-types';
import { forbidExtraProps } from 'airbnb-prop-types';
import TimeKeeper from 'react-timekeeper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { convertAMPMTimeTo24HourTime } from '../../utils';
import constants from '../../constants';

const useStyles = makeStyles({
  paper: {
    maxHeight: 'calc(100% - 60px)',
    display: 'flex',
    flexDirection: 'column',
    padding: '30px',
    backgroundColor: 'rgb(33, 33, 33)',
    '& .react-timekeeper': {
      backgroundColor: 'inherit',
      boxShadow: 'none'
    },
    '& .react-timekeeper__clock-wrapper': {
      backgroundColor: 'inherit'
    },
    '& .react-timekeeper__top-bar': {
      backgroundColor: 'inherit'
    },
    '& .react-timekeeper__time-dropdown': {
      display: 'none'
    },
    alignSelf: 'center',
    '@media (max-width:1200px)': {
      width: 'calc(100% - 60px)',
      height: 'calc(100% - 60px)'
    },
    color: 'rgb(255, 255, 255)'
  },
  // https://stackoverflow.com/questions/52911169/how-to-change-the-border-color-of-material-ui-textfield
  root: {
    paddingBottom: '40px',
    '& $focused $notchedOutline': {
      borderColor: 'rgb(243, 0, 77) !important'
    }
  },
  notchedOutline: {
    borderWidth: '1px',
    borderColor: 'rgb(255, 255, 255) !important'
  },
  focused: {},
  focusedLabel: {
    color: 'rgb(243, 0, 77) !important'
  },
  startTimeText: {
    alignSelf: 'center',
    paddingBottom: '4px'
  },
  textColor: {
    color: 'rgb(255, 255, 255)'
  }
});

const PubCrawlDetails = (props) => {
  const classes = useStyles();
  const matches = useMediaQuery('(max-width:1200px)');

  return (
    <Paper className={classes.paper}>
      <TextField
        className={classes.root}
        label="Pub Crawl Name"
        variant="outlined"
        color="secondary"
        placeholder="2 < len < 19"
        value={props.pubCrawlName}
        size="medium"
        InputProps={{
          classes: {
            root: classes.textColor,
            focused: classes.focused,
            notchedOutline: classes.notchedOutline
          },
          onChange: props.pubCrawlNameChangeHandler
        }}
        InputLabelProps={{
          classes: {
            root: classes.textColor,
            focused: classes.focusedLabel
          }
        }}
      />
      {matches ? (
        <TextField
          className={classes.root}
          label={constants.START_TIME_LABEL}
          type="time"
          variant="outlined"
          color="secondary"
          value={convertAMPMTimeTo24HourTime(props.pubCrawlStartTime)}
          InputProps={{
            classes: {
              root: classes.textColor,
              focused: classes.focused,
              notchedOutline: classes.notchedOutline
            },
            onChange: props.startTimeChangeHandler
          }}
          InputLabelProps={{
            classes: {
              root: classes.textColor,
              focused: classes.focusedLabel
            }
          }}
        />
      ) : (
          <>
            <Typography
              className={classes.startTimeText}
              variant="h6"
            >
              {constants.START_TIME_LABEL}
            </Typography>
            <TimeKeeper
              time={props.pubCrawlStartTime}
              onChange={props.startTimeChangeHandler}
              switchToMinuteOnHourSelect
            />
          </>
        )
      }
    </Paper>
  );
};

PubCrawlDetails.propTypes = forbidExtraProps({
  pubCrawlName: PropTypes.string.isRequired,
  pubCrawlStartTime: PropTypes.string.isRequired,
  pubCrawlNameChangeHandler: PropTypes.func.isRequired,
  startTimeChangeHandler: PropTypes.func.isRequired
});

export default PubCrawlDetails;
