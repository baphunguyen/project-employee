import React, {useState} from 'react';
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
import {useForm, Controller} from "react-hook-form";

function Form({onClose, data, isRegister}) {
  const {handleSubmit, control, register} = useForm();
  const [newdata, setNewData] = useState(data);
  const [message, setMessage] = useState('')

  async function onSubmit(dataForm) {
    if (!isRegister) {
      const dataChange = newdata;
      dataChange.gender = dataForm.gender;
      dataChange.age = dataForm.age;
      dataChange.fullname = dataForm.fullname;
      dataChange.dateofbirth = dataForm.dateofbirth;
      dataChange.address = dataForm.address;
      setNewData(dataChange);
      await axios.put('http://localhost:3002/user/update', {user: newdata})
        .then((response) => {
          if (response.data.message === 'Update Success') {
            onClose();
          } else {
            alert(response.data.message);
          }
        })
        .catch(err => console.log(err));
    } else {
      await axios.post('http://localhost:3002/user/create', {user: dataForm})
        .then((response) => {
          if (response.data.message === 'Create Success') {
            onClose();
          } else {
            setMessage(response.data.message);
          }
        })
    }
  }

  return (
    <Grid justifyContent='center' alignContent='center'>
      {message && <Alert severity='error'>{message}</Alert>}
      <Grid item xs={0} md={0}>
        <Paper elevation={0} className='Paper'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField label='Họ và Tên' variant='standard' defaultValue={data.fullname} required fullWidth margin='normal' {...register('fullname')}/>
            {!isRegister &&
              <TextField label='Email' type='email' variant='standard' defaultValue={data.email} disabled required fullWidth margin='normal' {...register('email')}/>
            }
            {isRegister &&
              <>
                <TextField label='Email' type='email' variant='standard' defaultValue={data.email} required fullWidth margin='normal' {...register('email')}/>
                <TextField label='Mật khẩu' type='password'  variant='standard' required fullWidth margin='normal' {...register('password')}/>
                <TextField label='Nhập lại mật khẩu' type='password' variant='standard' required fullWidth margin='normal' {...register('confirm_password')}/>
              </>
            }
            <TextField label='Tuổi' type='number' variant='standard' defaultValue={data.age} required fullWidth margin='normal' {...register('age')}/>
            <TextField label='Ngày Sinh' type='date'  variant='standard' defaultValue={data.dateofbirth} required fullWidth margin='normal' InputLabelProps={{shrink: true}} {...register('dateofbirth')}/>
            <TextField label='Địa Chỉ' variant='standard' defaultValue={data.address} required fullWidth margin='normal' {...register('address')}/>
            <FormControl fullWidth margin='normal'>
              <FormLabel>Giới Tính</FormLabel>
              <Controller rules={{required: true}} control={control} name='gender' defaultValue={data.gender} render={({field}) => {
                return (
                  <RadioGroup row {...field}>
                    <FormControlLabel control={<Radio/>} label='Female' value='female'/>
                    <FormControlLabel control={<Radio/>} label='Male' value='male'/>
                  </RadioGroup>
                )
              }}/>
            </FormControl>
            <Button variant='contained' type= 'submit'>{isRegister ? 'Sign Up' : 'Update'}</Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Form;