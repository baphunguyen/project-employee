import React from 'react';
import {Avatar, Grid, Paper, TextField, Button, Alert, Typography} from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {addMessage, isSuccess} from "@redux/forgotPasswordSlice";
import {useFormik} from "formik";
import * as Yup from 'yup'

function ForgotPassword(props) {
  const paperStyle = {padding: '20px', height: '320px', width: '350px', margin: '120px auto'}
  const avatarStyle = {backgroundColor: '#0995bf', marginTop: '15px'}
  const btnStyle = {margin: '20px 0px'}

  const forgotState = useSelector(state => state.forgot);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().email().matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/).required('Email is required')
    }),
    onSubmit: (values) => {
      axios.put('http://localhost:3002/user/forgotpassword', {user: values})
        .then((res) => {
          if (res.data.message !== 'Update Password Success') {
            dispatch(addMessage(res.data.message))
          } else {
            dispatch(isSuccess(true));
          }
        })
        .catch(err => console.log(err));
    }
  })

  return (
    <Grid>
      {!forgotState.success &&
        <Paper elevation={10} style={paperStyle}>
          <Grid align='center'>
            <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
            <h2>Forgot Password</h2>
          </Grid>
          {forgotState.message && <Alert severity='error'>{forgotState.message}</Alert>}
          <form onSubmit={formik.handleSubmit}>
            <TextField id='email' name='email' variant='standard' label='Email' placeholder='Enter Email' type='email' margin='normal' fullWidth required
                       value={formik.values.email}
                       onChange={formik.handleChange}
                       error={formik.errors.email}
                       helperText={formik.errors.email? 'Email must be correct format': ''}
            />
            <Button variant='contained' type='submit' color='primary' fullWidth style={btnStyle}>Submit</Button>
          </form>
        </Paper>
      }
      {forgotState.success &&
        <Paper elevation={10} style={paperStyle}>
          <Grid align='center'>
            <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
            <h2>Forgot Password</h2>
          </Grid>
          <Typography align='center' marginTop='50px' marginBottom='30px'>
            Thanks for you Forgot Password. Please check your email new password and login.
          </Typography>
          <Button variant='contained' href='/' color='primary' fullWidth>Login</Button>
        </Paper>
      }
    </Grid>
  );
}

export default ForgotPassword;