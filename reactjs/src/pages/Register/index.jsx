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
import {useNavigate} from "react-router-dom";

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
  const [message, setMessage] = React.useState('');
  const [showError, setShowError] = React.useState(false);
  const formik = useFormik({
    initialValues: {
      fullname:'',
      email: '',
      password: '',
      confirm_password: '',
      age:0,
      dateofbirth: '',
      address: '',
      gender: '',
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
    onSubmit: (values) => {
      axios.post('http://localhost:3002/user/create', {user: values})
        .then((response) => {
          console.log(response);
          if (response.data.message === 'Create Success') {
            navigate('/dashboard');
          } else {
            setMessage(response.data);
          }
        })
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
                      Register Data
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Please register data.
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
                    error={showError}
                    helperText={showError? formik.errors.fullname: ''}
                    variant="outlined"
                  />
                  <TextField
                    fullWidth
                    label="Email"
                    margin="normal"
                    name="email"
                    type="text"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={showError}
                    helperText={showError? formik.errors.email: ''}
                    variant="outlined"
                  />
                  <TextField
                    fullWidth
                    label="Password"
                    margin="normal"
                    name="password"
                    type="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={showError}
                    helperText={showError? formik.errors.password: ''}
                    variant="outlined"
                  />
                  <TextField
                    fullWidth
                    label="Confirm Password"
                    margin="normal"
                    name="confirm_password"
                    type="password"
                    value={formik.values.confirm_password}
                    onChange={formik.handleChange}
                    error={showError}
                    helperText={showError? formik.errors.confirm_password: ''}
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
                    error={showError}
                    helperText={showError? formik.errors.age: ''}
                    variant="outlined"
                  />
                  <TextField
                    fullWidth
                    label="Ngày Sinh"
                    margin="normal"
                    name="dateofbirth"
                    type="date"
                    InputLabelProps={{shrink: true}}
                    value={formik.values.dateofbirth}
                    onChange={formik.handleChange}
                    error={showError}
                    helperText={showError? formik.errors.dateofbirth: ''}
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
                    error={showError}
                    helperText={showError? formik.errors.address: ''}
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
                    onClick={() => setShowError(true)}
                    color='primary'
                    fullWidth
                  >
                    Register
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