import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Draggable } from 'react-beautiful-dnd';

const useStyles = makeStyles({
  card: {
    width: '480px',
    '@media (max-width:850px)': {
      width: '280px'
    },
    backgroundColor: 'rgb(46, 42, 50)',
    color: 'rgb(255,255,255)',
    marginBottom: '6px',
    // Prevent the user from selecting the text.
    userSelect: 'none',
    msUserSelect: 'none',
    msTouchSelect: 'none',
    WebkitUserSelect: 'none',
    KhtmlUserSelect: 'none',
    MozUserSelect: 'none',
    cursor: 'default'
  },
  row: {
    display: 'flex',
    flexDirection: 'row'
  },
  column: {
    display: 'flex',
    flexDirection: 'column'
  },
  container: {
    marginLeft: 'auto'
  },
  icon: {
    width: '50px',
    height: '50px'
  }
});

const Pub = (props) => {
  const classes = useStyles();

  return (
    <div>
      <Draggable draggableId={props.draggableId} index={props.index}>
        {(provided) => (
          <Card
            className={classes.card}
            elevation={5}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <CardContent>
              <div className={classes.row}>
                <div className={classes.column}>
                  <Typography noWrap variant="h5" component="h2">
                    {props.draggableId}. Crafter
                  </Typography>
                  <Typography color="secondary">
                    3 am - 10 pm
                  </Typography>
                </div>
                <div className={classes.container}>
                  {props.icons.map((Icon, index) => (
                    <Icon key={index} className={classes.icon} />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </Draggable>
    </div>
  );
};

export default Pub;
