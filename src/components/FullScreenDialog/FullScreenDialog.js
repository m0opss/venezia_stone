import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';

import './FullScreenDialog.scss';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const FullScreenDialog = props => {

  const handleClose = () => {
    props.setVisible(false);
  };


  return (
    <div>
      <Dialog
        fullScreen
        open={props.open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        {props.children}
      </Dialog>
    </div>
  );
};
export default FullScreenDialog;
