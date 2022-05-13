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
  Button
} from "@mui/material";
import "./styles.scss"
import {useForm, Controller} from "react-hook-form";

function RegistrationForm({onClose}) {
  const {handleSubmit, register, control} = useForm({
    defaultValues: {
      fullname: '',
      age: 0,
      dateofbirth: '',
      email: '',
      address: '',
      gender: ''
    }
  })

  async function onSubmit(data) {
    await axios.post('http://localhost:3002/user/create', {user: data})
      .then((response) => {
        if (response.data.message === 'Create Success') {
          onClose();
        } else {
          alert(response.data.message);
        }
      })
      .catch(err => console.log(err));
  }

  return (
    <Grid justifyContent='center' alignContent='center'>
      <Grid item xs={0} md={0}>
        <Paper elevation={0} className='Paper'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField label='Họ và Tên' variant='standard' required fullWidth margin='normal' {...register('fullname')}/>
            <TextField label='Tuổi' type='number' variant='standard' required fullWidth margin='normal'{...register('age')}/>
            <TextField label='Ngày Sinh' type='date'  variant='standard' required fullWidth margin='normal' InputLabelProps={{shrink: true}} {...register('dateofbirth')}/>
            <TextField label='Email' type='email' variant='standard' required fullWidth margin='normal'{...register('email')}/>
            <TextField label='Địa Chỉ' variant='standard' required fullWidth margin='normal' {...register('address')}/>
            <FormControl fullWidth margin='normal'>
              <FormLabel>Giới Tính</FormLabel>
              <Controller rules={{required: true}} control={control} name='gender' render={({field}) => {
                return (
                  <RadioGroup row {...field}>
                    <FormControlLabel control={<Radio/>} label='Female' value='female'/>
                    <FormControlLabel control={<Radio/>} label='Male' value='male'/>
                  </RadioGroup>
                )
              }}/>
            </FormControl>
            <Button variant='contained' type= 'submit'>Submit</Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default RegistrationForm;