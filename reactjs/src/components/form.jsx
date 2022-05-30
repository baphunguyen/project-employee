import React from 'react';
import axios from 'axios'
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Button, Alert
} from "@mui/material";
import {useFormik} from "formik";
import * as Yup from 'yup';
import {useDispatch, useSelector} from "react-redux";
import {addMessage} from "@redux/messageSlice";

function FormData({onClose, data, isRegister}) {
  const message = useSelector(state => state.message);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      fullname: data.fullname || '',
      email: data.email || '',
      password: '',
      confirm_password: '',
      age: data.age || 0,
      dateofbirth: data.dateofbirth || '',
      address: data.address || '',
      gender: data.gender || ''
    },
    validationSchema: Yup.object({
      fullname: Yup.string().required().min(4),
      email: Yup.string().email().matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
      password: Yup.string().matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/),
      confirm_password: Yup.string().oneOf([Yup.ref('password'), null], 'Password must match'),
      age: Yup.number().required(),
      dateofbirth: Yup.date().required(),
      address: Yup.string().required(),
      gender: Yup.string().oneOf(['male', 'female']).required()
    }),
    onSubmit: (dataForm) => {
      if (!isRegister) {
        const dataChange = dataForm;
        delete dataChange.password;
        delete dataChange.email;
        delete dataChange.confirm_password;
        dataChange.id = data.id;
        axios.put('http://localhost:3002/user/update', {user: dataChange})
          .then((response) => {
            if (response.data.message === 'Update Success') {
              onClose();
            } else {
              dispatch(addMessage(response.data.message));
            }
          })
          .catch(err => console.log(err));
      } else {
        axios.post('http://localhost:3002/user/create', {user: dataForm})
          .then((response) => {
            console.log(response);
            if (response.data.message === 'Create Success') {
              onClose();
            } else {
              dispatch(addMessage(response.data));
            }
          })
      }
    }
  })

  return (
    <Grid justifyContent='center' alignContent='center'>
      {message && <Alert severity='error'>{message}</Alert>}
      <Grid item xs={0} md={0}>
        <Paper elevation={0} className='Paper'>
          <form onSubmit={formik.handleSubmit}>
            <TextField id='fullname' name='fullname' label='Họ và Tên' variant='standard' required fullWidth margin='normal'
                       value={formik.values.fullname}
                       onChange={formik.handleChange}
                       error={formik.errors.fullname}
                       helperText={formik.errors.fullname? 'Họ và Tên must be at least 4 characters': ''}
            />
            {!isRegister &&
              <TextField id='email' name='email' label='Email' type='email' variant='standard' disabled required fullWidth margin='normal'
                         value={formik.values.email}
                         onChange={formik.handleChange}
                         error={formik.errors.email}
                         helperText={formik.errors.email? 'Email must be correct format': ''}
              />
            }
            {isRegister &&
              <>
                <TextField id='email' name='email' label='Email' type='email' variant='standard' required fullWidth margin='normal'
                           value={formik.values.email}
                           onChange={formik.handleChange}
                           error={formik.errors.email}
                           helperText={formik.errors.email? 'Email must be correct format': ''}
                />
                <TextField id='password' name='password' label='Mật khẩu' type='password'  variant='standard' required fullWidth margin='normal'
                           onChange={formik.handleChange}
                           error={formik.errors.password}
                           helperText={formik.errors.password? 'Password must be have A-Z, a-z, 0-9 and least 6 characters': ''}
                />
                <TextField id='confirm_password' name='confirm_password' label='Nhập lại mật khẩu' type='password' variant='standard' required fullWidth margin='normal'
                           onChange={formik.handleChange}
                           error={formik.errors.confirm_password}
                           helperText={formik.errors.confirm_password? 'Confirm Password must be match with Password': ''}
                />
              </>
            }
            <TextField id='age' name='age' label='Tuổi' type='number' variant='standard' required fullWidth margin='normal'
                       value={formik.values.age}
                       onChange={formik.handleChange}
                       error={formik.errors.age}
                       helperText={formik.errors.age? 'Age must be a number': ''}
            />
            <TextField id='dateofbirth' name='dateofbirth' label='Ngày Sinh' type='date'  variant='standard' required fullWidth margin='normal' InputLabelProps={{shrink: true}}
                       value={formik.values.dateofbirth}
                       onChange={formik.handleChange}
                       error={formik.errors.dateofbirth}
                       helperText={formik.errors.dateofbirth? 'Date must be a correct format': ''}
            />
            <TextField id='address' name='address' label='Địa Chỉ' variant='standard' required fullWidth margin='normal'
                       value={formik.values.address}
                       onChange={formik.handleChange}
                       error={formik.errors.address}
                       helperText={formik.errors.address? 'Address must be have a values': ''}
            />
            <FormControl fullWidth margin='normal'>
              <FormLabel>Giới Tính</FormLabel>
              <RadioGroup row id='gender' name='gender' value={formik.values.gender} onChange={formik.handleChange}>
                <FormControlLabel control={<Radio/>} label='Female' value='female'/>
                <FormControlLabel control={<Radio/>} label='Male' value='male'/>
              </RadioGroup>
            </FormControl>
            <Button variant='contained' type= 'submit'>{isRegister ? 'Sign Up' : 'Update'}</Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default FormData;