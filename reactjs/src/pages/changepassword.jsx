import React from 'react';
import {Avatar, Grid, Paper, TextField, Button, Alert} from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {addMessage} from "@redux/messageSlice";
import {useFormik} from "formik";
import * as Yup from 'yup'

function ChangePassword(props) {
  const paperStyle = {padding: '20px', height: '500px', width: '350px', margin: '120px auto'}
  const avatarStyle = {backgroundColor: '#0995bf', marginTop: '15px'}
  const btnStyle = {margin: '20px 0px'}
  const navigate = useNavigate();

  const message = useSelector(state => state.message);
  const dispatch = useDispatch();

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
            dispatch(addMessage(res.data.message));
          } else {
            navigate("/home");
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
          <h2>Change Password</h2>
        </Grid>
        {message && <Alert severity='error'>{message}</Alert>}
        <form onSubmit={formik.handleSubmit}>
          <TextField id='password' name='password' variant='standard' label='Password' placeholder='Enter Current Password' type='password' margin='normal' fullWidth required
                     value={formik.values.password}
                     onChange={formik.handleChange}
                     error={formik.errors.password}
                     helperText={formik.errors.password? 'Password must be have A-Z, a-z, 0-9 and least 6 characters': ''}
          />
          <TextField id='new_password' name='new_password' variant='standard' label='New Password' placeholder='Enter New Password' type='password' margin='normal' fullWidth required
                     value={formik.values.new_password}
                     onChange={formik.handleChange}
                     error={formik.errors.new_password}
                     helperText={formik.errors.new_password? 'New Password must be have A-Z, a-z, 0-9 and least 6 characters': ''}
          />
          <TextField id='confirm_password' name='confirm_password' variant='standard' label='Confirm New Password' placeholder='Enter Confirm New Password' type='password' margin='normal' fullWidth required
                     value={formik.values.confirm_password}
                     onChange={formik.handleChange}
                     error={formik.errors.confirm_password}
                     helperText={formik.errors.confirm_password? 'Confirm Password must be have A-Z, a-z, 0-9 and least 6 characters': ''}
          />
          <Button variant='contained' type='submit' color='primary' fullWidth style={btnStyle}>Change Password</Button>
        </form>
      </Paper>
    </Grid>
  );
}

export default ChangePassword;