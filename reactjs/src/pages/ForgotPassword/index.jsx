import React from 'react';
import {Card, CardContent, Divider, Typography, Grid, TextField, Button, Alert} from '@mui/material';
import {useFormik} from "formik";
import {makeStyles} from "@mui/styles";
import * as Yup from 'yup'
import axios from 'axios'
import {useNavigate} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.common.black,
    height: '100vh',
    minHeight: '10%',
  },
  backButton: {
    marginLeft: theme.spacing(2),
  },
  card: {
    overflow: 'visible',
    display: 'flex',
    position: 'relative',
    '& > *': {
      flexGrow: 1,
      flexBasis: '50%',
      width: '50%',
    },
    maxWidth: '475px',
    margin: '24px auto',
  },
  content: {
    padding: theme.spacing(5, 4, 3, 4),
  },
  forgot: {
    textDecoration: 'none',
    paddingLeft: '16px',
  },
  margin: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
  submitButton: {
    margin: '16px 0px !important'
  }
}));

const ChangePassword = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [message, setMessage] = React.useState('');
  const [showError, setShowError] = React.useState(false);
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email().matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/).required('Email is required'),
    }),
    onSubmit: (values) => {

    }
  })

  return (
    <Grid container justifyContent="center" alignItems="center" className={classes.root}>
      <Grid item xs={11} sm={7} md={6} lg={4}>
        <Card className={classes.card}>
          <CardContent className={classes.content}>
            <Grid container direction="column" spacing={4} justifyContent="center">
              <Grid item xs={12}>
                <Grid container justifyContent="space-between">
                  <Grid item>
                    <Typography color="textPrimary" gutterBottom variant="h3">
                      ForgotPassword
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Please enter email.
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Typography>
                  {message && <Alert severity='error'>{message}</Alert>}
                </Typography>
                <form onSubmit={formik.handleSubmit}>
                  <TextField
                    fullWidth
                    autoFocus
                    label="Email"
                    margin="normal"
                    name="email"
                    type="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={showError}
                    helperText={showError? formik.errors.email: ''}
                    variant="outlined"
                  />
                  <Button
                    variant='contained'
                    type='submit'
                    className={classes.submitButton}
                    onClick={() => setShowError(true)}
                    color='primary'
                    fullWidth
                  >
                    Forgot Password
                  </Button>
                </form>
              </Grid>
              <Divider />
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ChangePassword;