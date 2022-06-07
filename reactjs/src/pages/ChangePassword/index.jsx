import React from 'react';
import {Card, CardContent, Divider, Typography, Grid, TextField, Button, Alert, Zoom} from '@mui/material';
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
  },
  trans: {
    transitionDuration: '0.5s !important',
  }
}));

const ChangePassword = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [message, setMessage] = React.useState('');
  const formik = useFormik({
    initialValues: {
      password: '',
      new_password: '',
      confirm_password: ''
    },
    validationSchema: Yup.object({
      password: Yup.string().matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/).required("Password is required"),
      new_password: Yup.string().matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/).required("New Password is required"),
      confirm_password: Yup.string().oneOf([Yup.ref('new_password'), null], 'New Password must match')
    }),
    onSubmit: (values) => {
      const  submitData = {id: JSON.parse(localStorage.getItem('user')).data.id, ...values};
      axios.put('http://localhost:3002/user/changepassword', {user: submitData})
        .then((res) => {
          if (res.data.message !== 'Change Password Success') {
            setMessage(res.data.message);
          } else {
            navigate("/dashboard");
          }
        })
        .catch(err => console.log(err));
    }
  })

  return (
    <Grid container justifyContent="center" alignItems="center" className={classes.root}>
      <Zoom in={true} className={classes.trans}>
        <Grid item xs={11} sm={7} md={6} lg={4}>
          <Card className={classes.card}>
            <CardContent className={classes.content}>
              <Grid container direction="column" spacing={4} justifyContent="center">
                <Grid item xs={12}>
                  <Grid container justifyContent="space-between">
                    <Grid item>
                      <Typography color="textPrimary" gutterBottom variant="h3">
                        Change Password
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Please change password.
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
                      label="Password"
                      margin="normal"
                      name="password"
                      type="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      error={!!formik.errors.password}
                      helperText={formik.errors.password? formik.errors.password: ''}
                      variant="outlined"
                    />
                    <TextField
                      fullWidth
                      label="New Password"
                      margin="normal"
                      name="new_password"
                      type="password"
                      value={formik.values.new_password}
                      onChange={formik.handleChange}
                      error={!!formik.errors.new_password}
                      helperText={formik.errors.new_password? formik.errors.new_password: ''}
                      variant="outlined"
                    />
                    <TextField
                      fullWidth
                      label="Confirm New Password"
                      margin="normal"
                      name="confirm_password"
                      type="password"
                      value={formik.values.confirm_password}
                      onChange={formik.handleChange}
                      error={!!formik.errors.confirm_password}
                      helperText={formik.errors.confirm_password? formik.errors.confirm_password: ''}
                      variant="outlined"
                    />
                    <Button
                      variant='contained'
                      type='submit'
                      className={classes.submitButton}
                      color='primary'
                      fullWidth
                    >
                      Change Password
                    </Button>
                  </form>
                </Grid>
                <Divider />
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Zoom>
    </Grid>
  );
};

export default ChangePassword;