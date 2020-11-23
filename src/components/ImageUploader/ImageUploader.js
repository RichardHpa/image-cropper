import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  makeStyles,
  Paper,
  Box,
  ButtonGroup,
} from '@material-ui/core';
import { useDropzone } from 'react-dropzone';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import RotateRightIcon from '@material-ui/icons/RotateRight';
import CachedIcon from '@material-ui/icons/Cached';

const acceptedFileTypes = ' image/jpg, image/jpeg';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  root: {
    textAlign: 'center',
    padding: theme.spacing(3),
    border: '1px dashed black',
  },
  controlContainer: {
    '& > *': {
      marginRight: theme.spacing(1),
    },
  },
}));

export default function ImageUploader(props) {
  const { open, close, upload } = props;
  const classes = useStyles();
  const [image, setImage] = useState();
  const [cropper, setCropper] = useState();

  const handleCancel = () => {
    close();
    setImage(null);
    setCropper(null);
  };

  const handleUpload = () => {
    if (typeof cropper !== 'undefined') {
      upload(
        cropper
          .getCroppedCanvas({ fillColor: '#fff' })
          .toDataURL('image/jpeg', 1.0)
      );
      handleCancel();
    }
  };

  const onDrop = async e => {
    console.log('loading');
    const files = e;
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    noKeyboard: true,
    accept: acceptedFileTypes,
    onDrop,
  });

  return (
    <Dialog open={open} onClose={close} maxWidth="md" fullWidth>
      <DialogTitle>Image Uploader</DialogTitle>
      <DialogContent>
        {!image ? (
          <Paper {...getRootProps()} className={classes.root} elevation={0}>
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <p>Drag 'n' drop some files here, or click to select files</p>
            )}
          </Paper>
        ) : (
          <Box>
            <Box py={2} className={classes.controlContainer}>
              <ButtonGroup variant="contained" color="primary" disableElevation>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => cropper.zoom(0.1)}
                >
                  <ZoomInIcon color="inherit" />
                </Button>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => cropper.zoom(-0.1)}
                >
                  <ZoomOutIcon color="inherit" />
                </Button>
              </ButtonGroup>

              <ButtonGroup variant="contained" color="primary" disableElevation>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => cropper.move(-10, 0)}
                >
                  <KeyboardArrowLeftIcon color="inherit" />
                </Button>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => cropper.move(10, 0)}
                >
                  <KeyboardArrowRightIcon color="inherit" />
                </Button>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => cropper.move(0, -10)}
                >
                  <KeyboardArrowUpIcon color="inherit" />
                </Button>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => cropper.move(0, 10)}
                >
                  <KeyboardArrowDownIcon color="inherit" />
                </Button>
              </ButtonGroup>

              <ButtonGroup variant="contained" color="primary" disableElevation>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => cropper.rotate(-10)}
                >
                  <RotateLeftIcon color="inherit" />
                </Button>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => cropper.rotate(10)}
                >
                  <RotateRightIcon color="inherit" />
                </Button>
              </ButtonGroup>

              <ButtonGroup variant="contained" color="primary" disableElevation>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => cropper.reset()}
                >
                  <CachedIcon color="inherit" />
                </Button>
              </ButtonGroup>
            </Box>
            <Cropper
              style={{ height: 400, width: '100%' }}
              aspectRatio={1}
              src={image}
              viewMode={0}
              guides={true}
              minCropBoxHeight={10}
              minCropBoxWidth={10}
              dragMode="move"
              responsive={true}
              checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
              autoCropArea={1}
              ready={() => console.log('loaded')}
              onInitialized={instance => {
                console.log(instance);
                setCropper(instance);
              }}
            />
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="primary"
          disableElevation
          onClick={handleUpload}
        >
          Upload
        </Button>
        <Button onClick={handleCancel} disableElevation>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
