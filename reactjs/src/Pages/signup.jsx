import React from 'react';
import {Avatar, Grid, Paper} from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from "react-router-dom";
import {Form}from '../Component'

function SignUp(props) {
  const paperStyle = {padding: '20px', height: '800px', width: '350px', margin: '50px auto'}
  const avatarStyle = {backgroundColor: '#0995bf', marginTop: '15px'}
  const navigate = useNavigate();

  const handleClose = () => {
    navigate("/")
  }

  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align='center'>
          <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
          <h2>Sign Up</h2>
        </Grid>
        <Form onClose={handleClose} isRegister={true} data=''/>
      </Paper>
    </Grid>
  );
}

export default SignUp;