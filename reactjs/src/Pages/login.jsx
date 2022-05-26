import React from 'react';
import {Avatar, Grid, Paper, TextField, Button, Typography, Link, Alert} from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {useForm} from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {addMessage} from "../Redux/messageSlice";

function Login(props) {
  const paperStyle = {padding: '20px', height: '500px', width: '350px', margin: '120px auto'}
  const avatarStyle = {backgroundColor: '#0995bf', marginTop: '15px'}
  const btnStyle = {margin: '20px 0px'}
  const navigate = useNavigate();
  const {handleSubmit, register} = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  })
  const message = useSelector(state => state.message);
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    axios.post('http://localhost:3002/user/login', {user: data})
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

  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align='center'>
          <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
          <h2>Sign In</h2>
        </Grid>
        {message && <Alert severity='error'>{message}</Alert>}
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField variant='standard' label='Email' placeholder='Enter Email' type='email' margin='normal' fullWidth required {...register('email')}/>
          <TextField variant='standard' label='Password' placeholder='Enter Password' margin='normal' type='password' fullWidth required {...register('password')}/>
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