import React from 'react';

import {Button, Grid, TextField, Zoom} from '@mui/material';
import Pdf from "react-to-pdf";
import { gridSpacing } from '@store/constant';
import {useFormik} from "formik";
import axios from "axios";


function QRCode() {
  const [imgText, setImgText] = React.useState('');
  const ref = React.createRef();
  const formik = useFormik({
    initialValues: {
      textQR: ''
    },
    onSubmit: (values) => {
      axios.post('http://localhost:3002/qrcode/create', values)
        .then((res) => {
          setImgText(res.data);
        })
        .catch(err => console.log(err));
    }
  })

  return (
    <React.Fragment>
      <Zoom in={true}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={4}>
            <form onSubmit={formik.handleSubmit}>
              <TextField
                fullWidth
                autoFocus
                label="Text"
                margin="normal"
                name='textQR'
                type="text"
                value={formik.values.textQR}
                onChange={formik.handleChange}
              />
              <Button variant='contained' fullWidth type='submit'>SEND</Button>
            </form>
          </Grid>
          <Grid item xs={12}>
            {imgText &&
              <div ref={ref}>
                <img src={imgText} style={{width: '300px'}}/>
              </div>
            }
          </Grid>
          <Grid item xs={12}>
            {imgText &&
              <Pdf targetRef={ref} filename="QRCODE.pdf">
                {({ toPdf }) => <Button onClick={toPdf} variant='contained'>Generate Pdf</Button>}
              </Pdf>
            }
          </Grid>
        </Grid>
      </Zoom>

    </React.Fragment>
  );
}

export default QRCode;
