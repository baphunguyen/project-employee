import React, {useState} from 'react';
import {Avatar, Grid, Paper, TextField, Button, Alert} from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {useForm} from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ChangePassword(props) {
  const paperStyle = {padding: '20px', height: '500px', width: '350px', margin: '120px auto'}
  const avatarStyle = {backgroundColor: '#0995bf', marginTop: '15px'}
  const btnStyle = {margin: '20px 0px'}
  const navigate = useNavigate();
  const {handleSubmit, register} = useForm({
    defaultValues: {
      password: '',
      new_password: '',
      confirm_password: ''
    }
  })
  const [message, setMessage] = useState('');

  const onSubmit = (data) => {
    const  submitData = {id: JSON.parse(localStorage.getItem('isAuth')).data.id, ...data};
    axios.put('http://localhost:3002/user/changepassword', {user: submitData})
      .then((res) => {
        if (res.data.message !== 'Change Password Success') {
          setMessage(res.data.message);
        } else {
          navigate("/home");
        }
      })
      .catch(err => console.log(err));
  }

  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align='center'>
          <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
          <h2>Change Password</h2>
        </Grid>
        {message && <Alert severity='error'>{message}</Alert>}
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField variant='standard' label='Password' placeholder='Enter Current Password' type='password' margin='normal' fullWidth required {...register('password')}/>
          <TextField variant='standard' label='New Password' placeholder='Enter New Password' type='password' margin='normal' fullWidth required {...register('new_password')}/>
          <TextField variant='standard' label='Confirm New Password' placeholder='Enter Confirm New Password' type='password' margin='normal' fullWidth required {...register('confirm_password')}/>
          <Button variant='contained' type='submit' color='primary' fullWidth style={btnStyle}>Change Password</Button>
        </form>
      </Paper>
    </Grid>
  );
}

export default ChangePassword;