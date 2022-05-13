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
  Button
} from "@mui/material";
import "./styles.scss"
import {useForm, Controller} from "react-hook-form";

function UpdateForm({onClose,data}) {
  const [newdata, setNewData] = useState(data)
  const handleChaneFullname = (e) => {
    const dataChange = newdata;
    dataChange.fullname = e.target.value;
    setNewData(dataChange);
  }
  const handleChaneAge = (e) => {
    const dataChange = newdata;
    dataChange.age = e.target.value;
    setNewData(dataChange);
  }
  const handleChaneDateOfBirth = (e) => {
    const dataChange = newdata;
    dataChange.dateofbirth = e.target.value;
    setNewData(dataChange);
  }
  const handleChaneAddress = (e) => {
    const dataChange = newdata;
    dataChange.address = e.target.value;
    setNewData(dataChange);
  }
  async function onSubmit(data) {
    const dataChange = newdata;
    dataChange.gender = data.gender;
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

  }
  const {handleSubmit, control} = useForm();

  return (
    <Grid justifyContent='center' alignContent='center'>
      <Grid item xs={0} md={0}>
        <Paper elevation={0} className='Paper'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField label='Họ và Tên' variant='standard' value={newdata.fullname} onChange={handleChaneFullname} required fullWidth margin='normal'/>
            <TextField label='Tuổi' type='number' variant='standard' value={newdata.age} onChange={handleChaneAge} required fullWidth margin='normal'/>
            <TextField label='Ngày Sinh' type='date'  variant='standard' value={newdata.dateofbirth} onChange={handleChaneDateOfBirth} required fullWidth margin='normal' InputLabelProps={{shrink: true}}/>
            <TextField label='Email' type='email' variant='standard' value={newdata.email} disabled required fullWidth margin='normal'/>
            <TextField label='Địa Chỉ' variant='standard' value={newdata.address} onChange={handleChaneAddress} required fullWidth margin='normal'/>
            <FormControl fullWidth margin='normal'>
              <FormLabel>Giới Tính</FormLabel>
              <Controller rules={{required: true}} control={control} name='gender' defaultValue={newdata.gender} render={({field}) => {
                return (
                  <RadioGroup row {...field}>
                    <FormControlLabel control={<Radio/>} label='Female' value='female'/>
                    <FormControlLabel control={<Radio/>} label='Male' value='male'/>
                  </RadioGroup>
                )
              }}/>
            </FormControl>
            <Button variant='contained' type= 'submit'>Update</Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default UpdateForm;