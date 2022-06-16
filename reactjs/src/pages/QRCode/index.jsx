import React from 'react';

import {Button, Grid, TextField, Zoom} from '@mui/material';
import Pdf from "react-to-pdf";
import { gridSpacing } from '@store/constant';
import {useFormik} from "formik";


function QRCode() {
  const [qrcode, setQrCode] = React.useState('');
  const ref = React.createRef();
  const formik = useFormik({
    initialValues: {
      textQR: ''
    },
    onSubmit: (values) => {
      setQrCode(`http://api.qrserver.com/v1/create-qr-code/?data=${values.textQR}&size=50x50`);
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
            {qrcode &&
              <div ref={ref}>
                <img src={qrcode}/>
              </div>
            }
          </Grid>
          <Grid item xs={12}>
            {qrcode &&
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

export default React.memo(QRCode);
