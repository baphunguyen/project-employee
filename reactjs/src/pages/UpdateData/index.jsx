import React from 'react';
import {
  Card,
  CardContent,
  Divider,
  Typography,
  Grid,
  TextField,
  Button,
  Alert,
  FormControl,
  FormLabel, RadioGroup, FormControlLabel, Radio
} from '@mui/material';
import {useFormik} from "formik";
import {makeStyles} from "@mui/styles";
import * as Yup from 'yup'
import axios from 'axios'
import {useNavigate, useLocation} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.common.black,
    height: '100vh',
    minHeight: '10%',
  },
  backButton: {
    marginLeft: theme.spacing(2),
  },
  card: {
    overflow: 'visible',
    display: 'flex',
    position: 'relative',
    '& > *': {
      flexGrow: 1,
      flexBasis: '50%',
      width: '50%',
    },
    maxWidth: '475px',
    margin: '24px auto',
  },
  content: {
    padding: theme.spacing(5, 4, 3, 4),
  },
  forgot: {
    textDecoration: 'none',
    paddingLeft: '16px',
  },
  margin: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
  submitButton: {
    margin: '16px 0px !important'
  }
}));

const UpdateData = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const {state} = useLocation();
  const [message, setMessage] = React.useState('');
  const formik = useFormik({
    initialValues: {
      fullname: state.fullname,
      email: state.email,
      age: state.age,
      dateofbirth: state.dateofbirth,
      address: state.address,
      gender: state.gender,
    },
    validationSchema: Yup.object({
      fullname: Yup.string().required().min(4),
      email: Yup.string().email().matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
      age: Yup.number().required(),
      dateofbirth: Yup.date().required(),
      address: Yup.string().required(),
      gender: Yup.string().oneOf(['male', 'female']).required()
    }),
    onSubmit: (values) => {
      const dataChange = values;
      delete dataChange.password;
      delete dataChange.email;
      delete dataChange.confirm_password;
      dataChange.id = state.id;
      console.log(dataChange)
      axios.put('http://localhost:3002/user/update', {user: dataChange})
        .then((response) => {
          if (response.data.message === 'Update Success') {
            navigate('/dashboard');
          } else {
            setMessage(response.data.message);
          }
        })
        .catch(err => console.log(err));
    }
  })

  return (
    <Grid container justifyContent="center" alignItems="center" className={classes.root}>
      <Grid item xs={11} sm={7} md={6} lg={4}>
        <Card className={classes.card}>
          <CardContent className={classes.content}>
            <Grid container direction="column" spacing={4} justifyContent="center">
              <Grid item xs={12}>
                <Grid container justifyContent="space-between">
                  <Grid item>
                    <Typography color="textPrimary" gutterBottom variant="h3">
                      Update Data
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Please update data.
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Typography>
                  {message && <Alert severity='error'>{message}</Alert>}
                </Typography>
                <form onSubmit={formik.handleSubmit}>
                  <TextField
                    fullWidth
                    autoFocus
                    label="Họ và Tên"
                    margin="normal"
                    name="fullname"
                    type="text"
                    value={formik.values.fullname}
                    onChange={formik.handleChange}
                    error={!!formik.errors.fullname}
                    helperText={formik.errors.fullname? formik.errors.fullname: ''}
                    variant="outlined"
                  />
                  <TextField
                    fullWidth
                    disabled
                    label="Email"
                    margin="normal"
                    name="email"
                    type="text"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={!!formik.errors.email}
                    helperText={formik.errors.email ? formik.errors.email: ''}
                    variant="outlined"
                  />
                  <TextField
                    fullWidth
                    label="Tuổi"
                    margin="normal"
                    name="age"
                    type="number"
                    value={formik.values.age}
                    onChange={formik.handleChange}
                    error={!!formik.errors.age}
                    helperText={formik.errors.age ? formik.errors.age: ''}
                    variant="outlined"
                  />
                  <TextField
                    fullWidth
                    label="Ngày Sinh"
                    margin="normal"
                    name="dateofbirth"
                    type="date"
                    value={formik.values.dateofbirth}
                    onChange={formik.handleChange}
                    error={!!formik.errors.dateofbirth}
                    helperText={formik.errors.dateofbirth ? formik.errors.dateofbirth: ''}
                    variant="outlined"
                  />
                  <TextField
                    fullWidth
                    label="Địa chỉ"
                    margin="normal"
                    name="address"
                    type="text"
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    error={!!formik.errors.address}
                    helperText={formik.errors.address ? formik.errors.address: ''}
                    variant="outlined"
                  />
                  <FormControl fullWidth margin='normal'>
                    <FormLabel>Giới Tính</FormLabel>
                    <RadioGroup row name='gender' value={formik.values.gender} onChange={formik.handleChange}>
                      <FormControlLabel control={<Radio/>} label='Female' value='female'/>
                      <FormControlLabel control={<Radio/>} label='Male' value='male'/>
                    </RadioGroup>
                  </FormControl>
                  <Button
                    variant='contained'
                    type='submit'
                    className={classes.submitButton}
                    color='primary'
                    fullWidth
                  >
                    Update
                  </Button>
                </form>
              </Grid>
              <Divider />
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default UpdateData;