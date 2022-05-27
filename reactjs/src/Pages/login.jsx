import React from 'react';
import {Avatar, Grid, Paper, TextField, Button, Typography, Link, Alert} from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {addMessage} from "../Redux/messageSlice";
import {useFormik} from "formik";
import * as Yup from 'yup'

function Login(props) {
  const paperStyle = {padding: '20px', height: '500px', width: '350px', margin: '120px auto'}
  const avatarStyle = {backgroundColor: '#0995bf', marginTop: '15px'}
  const btnStyle = {margin: '20px 0px'}
  const navigate = useNavigate();

  const message = useSelector(state => state.message);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().email().matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/).required('Email is required'),
      password: Yup.string().matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/).required('Password is required')
    }),
    onSubmit: (values) => {
      axios.post('http://localhost:3002/user/login', {user: values})
        .then((res) => {
          if (res.data.data) {
            localStorage.setItem('user', JSON.stringify({
              data: res.data.data,
              authed: true,
              expiry: new Date().getTime() + 300000
            }))
            navigate("/home");
          } else {
            dispatch(addMessage(res.data.message));
          }
        })
        .catch(err => console.log(err));
    }
  })

  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align='center'>
          <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
          <h2>Sign In</h2>
        </Grid>
        {message && <Alert severity='error'>{message}</Alert>}
        <form onSubmit={formik.handleSubmit}>
          <TextField id='email' name='email' variant='standard' label='Email' placeholder='Enter Email' type='email' margin='normal' fullWidth required
                     value={formik.values.email}
                     onChange={formik.handleChange}
                     error={formik.errors.email}
                     helperText={formik.errors.email? 'Email must be correct format': ''}
          />
          <TextField id='password' name='password' variant='standard' label='Password' placeholder='Enter Password' margin='normal' type='password' fullWidth required
                     value={formik.values.password}
                     onChange={formik.handleChange}
                     error={formik.errors.password}
                     helperText={formik.errors.password? 'Password must be have A-Z, a-z, 0-9 and least 6 characters': ''}
          />
          <Button variant='contained' type='submit' color='primary' fullWidth style={btnStyle}>Sign in</Button>
        </form>
        <Grid>
          <Typography align='right'>
            <Link href='/forgotpassword'>
              Forgot Password ?
            </Link>
          </Typography>
          <Typography align='left' style={{marginTop: '8px'}}>
            Do you have an account ?
            <Link href='/signup'>
              Sign up
            </Link>
          </Typography>
        </Grid>
      </Paper>
    </Grid>
  );
}

export default Login;