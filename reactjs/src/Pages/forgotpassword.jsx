import React, {useState} from 'react';
import {Avatar, Grid, Paper, TextField, Button, Alert, Typography} from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {useForm} from "react-hook-form";
import axios from "axios";

function ForgotPassword(props) {
  const paperStyle = {padding: '20px', height: '320px', width: '350px', margin: '120px auto'}
  const avatarStyle = {backgroundColor: '#0995bf', marginTop: '15px'}
  const btnStyle = {margin: '20px 0px'}
  const {handleSubmit, register} = useForm({
    defaultValues: {
      email: '',
    }
  })
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const onSubmit = (data) => {
    axios.put('http://localhost:3002/user/forgotpassword', {user: data})
      .then((res) => {
        if (res.data.message !== 'Update Password Success') {
          setMessage(res.data.message);
        } else {
          setIsSuccess(true);
        }
      })
      .catch(err => console.log(err));
  }

  return (
    <Grid>
      {!isSuccess &&
        <Paper elevation={10} style={paperStyle}>
          <Grid align='center'>
            <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
            <h2>Forgot Password</h2>
          </Grid>
          {message && <Alert severity='error'>{message}</Alert>}
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField variant='standard' label='Email' placeholder='Enter Email' type='email' margin='normal' fullWidth required {...register('email')}/>
            <Button variant='contained' type='submit' color='primary' fullWidth style={btnStyle}>Submit</Button>
          </form>
        </Paper>
      }
      {isSuccess &&
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