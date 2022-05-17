import React, {useEffect, useState} from 'react';
import {Avatar, Grid, Paper, TextField, Button, Typography, Link} from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Alert from '@mui/material/Alert';
import {useForm} from "react-hook-form";
import axios from "axios";

function Login(props) {
  const paperStyle = {padding: '20px', height: '500px', width: '350px', margin: '120px auto'}
  const avatarStyle = {backgroundColor: '#0995bf', marginTop: '15px'}
  const btnStyle = {margin: '20px 0px'}
  const {handleSubmit, register} = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  })
  const [dataLogin, setDataLogin] = useState(null);
  const [message, setMessage] = useState('');
  const [dataRes, setDataRes] = useState(null);

  useEffect(() => {
    axios.post('http://localhost:3002/user/login', {user: dataLogin})
      .then((res) => {
        setMessage(res.data.message);
        setDataRes(res.data.data);
      })
      .catch(err => console.log(err));
  }, [dataLogin]);

  const onSubmit = (data) => {
    setDataLogin(data);
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
            <Link href='#'>
              Forgot Password ?
            </Link>
          </Typography>
          <Typography align='left' style={{marginTop: '8px'}}>
            Do you have an account ?
            <Link href='#'>
              Sign up
            </Link>
          </Typography>
        </Grid>
      </Paper>
    </Grid>
  );
}

export default Login;