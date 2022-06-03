import React from 'react';
import { Card, CardContent, Divider, Typography, Grid, TextField, Button, Box } from '@mui/material';
import {makeStyles} from "@mui/styles";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import * as Yup from 'yup'
import {useFormik} from "formik";
import Logo from './../../assets/images/logo-dark.svg';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.common.black,
        height: '100vh',
        minHeight: '100%',
    },
    backButton: {
        marginLeft: theme.spacing(2),
    },
    card: {
        overflow: 'visible !important',
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
        padding: `${theme.spacing(5, 4, 3, 4)} !important`,
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

const Login = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().email().matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/).required('Email is required'),
            password: Yup.string().matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/).required('Password is required')
        }),
        onSubmit: (values) => {
            axios.post('http://localhost:3002/user/login', {user: values})
              .then((res) => {
                  if (res.data.data) {
                      localStorage.setItem('user', JSON.stringify({
                          data: res.data.data,
                          authed: true,
                          expiry: new Date().getTime() + 300000
                      }))
                      navigate('/dashboard');
                  } else {
                      // dispatch(addMessage(res.data.message));
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
                                        <Typography color="textPrimary" gutterBottom variant="h2">
                                            Sign in
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            Please sign in.
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <img alt="Auth method" src={Logo} />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <form onSubmit={formik.handleSubmit}>
                                    <TextField
                                      fullWidth
                                      autoFocus
                                      label="Email Address"
                                      margin="normal"
                                      name="email"
                                      type="email"
                                      value={formik.values.email}
                                      onChange={formik.handleChange}
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
                                      variant="outlined"
                                    />
                                    <Button
                                      variant='contained'
                                      type='submit'
                                      className={classes.submitButton}
                                      color='primary'
                                      fullWidth
                                    >
                                        Sign In
                                    </Button>

                                </form>
                                <Grid container justifyContent='flex-end'>
                                    <Typography
                                      variant="subtitle2"
                                      color="secondary"
                                      component={Link}
                                      to="/forgotpassword"
                                      className={classes.forgot}
                                    >
                                        Forgot Password?
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Divider />
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export default Login;
