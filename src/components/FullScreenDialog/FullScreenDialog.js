import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import Cropper from 'cropperjs';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const FullScreenDialog = props => {
  

  const handleClose = () => {
    setOpen(false);
  };

  if (open) {
    const cropper = new Cropper(<img src={props.img} />, {
      aspectRatio: 16 / 9,
      crop(event) {
        console.log(event.detail.x);
        console.log(event.detail.y);
        console.log(event.detail.width);
        console.log(event.detail.height);
        console.log(event.detail.rotate);
        console.log(event.detail.scaleX);
        console.log(event.detail.scaleY);
      }
    });
  }

  return (
    <div>
      <Dialog
        fullScreen
        open={props.open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <div onClick={handleClose} className="aaa">
          <div>
            <img id="image" src="picture.jpg" />
          </div>
        </div>
      </Dialog>
    </div>
  );
};
export default FullScreenDialog;
