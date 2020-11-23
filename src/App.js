import React, { useState } from 'react';
import {
  makeStyles,
  Container,
  CssBaseline,
  Button,
  Paper,
} from '@material-ui/core';
import ImageUploader from './components/ImageUploader';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import { useDropzone } from 'react-dropzone';

const acceptedFileTypes = ' image/jpg, image/jpeg';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  img: {
    maxWidth: 200,
    border: '1px solid black',
  },
}));

function App() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [result, setResult] = useState(null);

  const onUpload = res => {
    setOpen(false);
    setResult(res);
    console.log(res);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Button
          variant="contained"
          color="primary"
          disableElevation
          onClick={() => setOpen(true)}
        >
          Upload Image
        </Button>
      </div>

      <ImageUploader
        open={open}
        close={() => setOpen(false)}
        upload={onUpload}
      />
      {result && (
        <>
          <img src={result} className={classes.img} alt="Preview" />
          <Button></Button>
        </>
      )}
    </Container>
  );
}

export default App;
