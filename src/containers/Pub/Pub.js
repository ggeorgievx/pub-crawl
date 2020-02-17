import React, { useState, memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Draggable } from 'react-beautiful-dnd';
import PropTypes from 'prop-types';
import { forbidExtraProps } from 'airbnb-prop-types';
import { Rating } from '@material-ui/lab';
import { ReactComponent as Calendar } from '../../assets/images/calendar.svg';
import { ReactComponent as Remove } from '../../assets/images/remove.svg';
import Slider from '@material-ui/core/Slider';
import CustomPopover from '../../components/CustomPopover/CustomPopover';

const useStyles = makeStyles({
  card: {
    width: '480px',
    backgroundColor: 'rgb(42, 42, 42)',
    color: 'rgb(255, 255, 255)',
    marginBottom: '6px',
    borderWidth: 'thin',
    borderStyle: 'solid',
    // Prevent the user from selecting the text.
    userSelect: 'none',
    msUserSelect: 'none',
    msTouchSelect: 'none',
    WebkitUserSelect: 'none',
    KhtmlUserSelect: 'none',
    MozUserSelect: 'none',
    cursor: 'default',
    '&:hover $removeIcon': {
      display: 'block'
    },
    '@media (max-width:1200px)': {
      width: '280px'
    }
  },
  isNotDragged: {
    borderColor: 'rgb(240, 98, 146)'
  },
  isDragged: {
    borderColor: 'rgb(243, 0, 77)'
  },
  cardContent: {
    display: 'flex',
    padding: '10px 5px 12px 10px',
    '@media (max-width:1200px)': {
      paddingBottom: '0px'
    }
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    paddingRight: '6px'
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
  },
  icon: {
    width: '50px',
    height: '50px',
    '@media (max-width:1200px)': {
      width: '30px',
      height: '30px'
    }
  },
  removeIcon: {
    width: '24px',
    height: '24px',
    cursor: 'pointer',
    display: 'none'
  },
  rating: {
    alignSelf: 'center'
  },
  container: {
    marginLeft: 'auto',
    paddingTop: '44px'
  },
  slider: {
    color: 'rgb(240, 98, 146)'
  },
  text: {
    display: 'flex'
  },
  star: {
    fontSize: '30px',
    '@media (max-width:1200px)': {
      fontSize: '18px'
    }
  }
});

const Pub = (props) => {
  const classes = useStyles();
  const [removeAnchorEl, setRemoveAnchorEl] = useState(null);
  const [calendarAnchorEl, setCalendarAnchorEl] = useState(null);
  const [ratingAnchorEl, setRatingAnchorEl] = useState(null);

  const removeEnterHandler = (event) => {
    setRemoveAnchorEl(event.currentTarget);
  };
  const removeLeaveHandler = () => {
    setRemoveAnchorEl(null);
  };
  const calendarEnterHandler = (event) => {
    setCalendarAnchorEl(event.currentTarget);
  };
  const calendarLeaveHandler = () => {
    setCalendarAnchorEl(null);
  };

  const ratingEnterHandler = (event) => {
    setRatingAnchorEl(event.currentTarget);
  };
  const ratingLeaveHandler = () => {
    setRatingAnchorEl(null);
  };
  const valueToValueLabel = (value) => {
    return `${value}min`;
  };

  return (
    <div>
      <Draggable draggableId={props.draggableId} index={props.index}>
        {(provided, snapshot) => {
          if (snapshot.isDragging) {
            setCalendarAnchorEl(null);
            setRatingAnchorEl(null);
          }

          return (
            <Card
              className={`${classes.card} ${snapshot.isDragging ? classes.isDragged : classes.isNotDragged}`}
              raised
              {...provided.draggableProps}
              ref={provided.innerRef}
            >
              <CardContent className={classes.cardContent}>
                <div className={classes.row} {...provided.dragHandleProps}>
                  <div className={classes.column}>
                    <div className={classes.row}>
                      <Typography variant="button">
                        {`${props.index + 1}. ${props.name}`}
                      </Typography>
                      <div>
                        <Remove
                          className={classes.removeIcon}
                          onMouseEnter={removeEnterHandler}
                          onMouseLeave={removeLeaveHandler}
                          onClick={props.removePubButtonHandler}
                        />
                      </div>
                      <CustomPopover anchorEl={removeAnchorEl}>
                        Remove
                      </CustomPopover>
                    </div>
                    <Typography variant="body2">
                      {props.formattedAddress}
                    </Typography>
                    <div className={classes.row}>
                      <div
                        className={classes.rating}
                        onMouseEnter={ratingEnterHandler}
                        onMouseLeave={ratingLeaveHandler}
                      >
                        <Rating
                          name="read-only"
                          readOnly
                          value={props.rating}
                          precision={.1}
                          size="large"
                          classes={{ root: classes.star }}
                        />
                      </div>
                      <CustomPopover anchorEl={ratingAnchorEl}>
                        {props.rating} ⭐️
                      </CustomPopover>
                      <div
                        onMouseEnter={calendarEnterHandler}
                        onMouseLeave={calendarLeaveHandler}
                      >
                        <Calendar className={classes.icon} />
                      </div>
                      <CustomPopover anchorEl={calendarAnchorEl}>
                        {typeof props.weekdayText === 'string' ?
                          <Typography
                            variant="caption"
                            className={classes.text}
                          >
                            {props.weekdayText}
                          </Typography> :
                          props.weekdayText.map((weekdayText, index) => (
                            <Typography
                              key={index}
                              variant="caption"
                              className={classes.text}
                            >
                              {weekdayText}
                            </Typography>
                          ))}
                      </CustomPopover>
                      <props.icon className={classes.icon} />
                    </div>
                  </div>
                </div>
                <div className={classes.container}>
                  <Slider
                    className={classes.slider}
                    value={props.duration}
                    valueLabelDisplay="on"
                    step={15}
                    marks
                    min={15}
                    max={90}
                    orientation="vertical"
                    valueLabelFormat={valueToValueLabel}
                    onChange={(_, value) => {
                      if (value !== props.duration) {
                        props.sliderChangeHandler(value);
                      }
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          );
        }}
      </Draggable>
    </div>
  );
};

Pub.propTypes = forbidExtraProps({
  draggableId: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  icon: PropTypes.object.isRequired,
  formattedAddress: PropTypes.string.isRequired,
  location: PropTypes.exact({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired
  }).isRequired,
  name: PropTypes.string.isRequired,
  weekdayText: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.arrayOf(PropTypes.string).isRequired
  ]).isRequired,
  placeId: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
  removePubButtonHandler: PropTypes.func.isRequired,
  sliderChangeHandler: PropTypes.func.isRequired
});

export default memo(Pub);
