import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Pdf from './document'

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: 550,
    height: 500,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(0,0,0,0),
    margin: theme.spacing(2,2,2,2)
  },
}));

export default function SimpleModal(props) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
 
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <button className="btn btn-primary" type="button" onClick={handleOpen}>
        Open {props.name}
      </button>
      <Modal
        
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div  className={classes.paper}>
          <Pdf file={props.file}/>
        </div>
      </Modal>
    </div>
  );
}