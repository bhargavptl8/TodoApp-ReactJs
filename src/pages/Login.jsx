import React, { lazy, useState, Suspense } from 'react'
import { Box, Button, Container, FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, Paper, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik';
import * as Yup from 'yup';
const ForgetPassword = lazy(() => import('../components/ForgetPassword'))
import Loading from '../components/Loading';
import { useSelector } from 'react-redux'

import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";

import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const Login = () => {

    const navigate = useNavigate();

    const data = useSelector(state => state.signUpData)

    // console.log(data);

    const [isLogin, setIsLogin] = useState(true)
    const [showPassword, setShowPassword] = useState(false);

    const [initialValues, setInitialValues] = useState({
        email: '',
        password: ''
    });

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const loginValidationSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Please fill the Email is required'),
        password: Yup.string()
            .min(8, 'Password must be at least 8 characters')
            .max(12, 'Password must be at least max 12 characters')
            .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
            .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
            .matches(/[0-9]/, 'Password must contain at least one number')
            .matches(/[@$!%*?&#]/, 'Password must contain at least one special character (@, $, !, %, *, ?, &, #)')
            .required('one lowercase letter,one uppercase letter,one number,one special character is required with at least 8 characters'),
    })

    const loginFormik = useFormik({
        initialValues,
        validationSchema: loginValidationSchema,
        onSubmit: (values, { resetForm }) => {

            let find = data.find((data) => data.email === values.email)

            if (!find) {
                toast.error('Email-Id Not Found')
            }
            else {
                if (find.password !== values.password) {
                    toast.error('Invalid Password')
                }
                else {
                    navigate('/todoapp')   
                    resetForm()
                    setInitialValues({
                        email: '',
                        password: ''
                    })
                }
            }
        }
    })


    return (
        isLogin ? (
            <Box className='secondary-bgcolor' sx={{ height: '100vh' }} >
                <Container maxWidth='sm'>
                    <Box sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Paper elevation={1} sx={{ width: '320px', padding: '30px' }}>
                            <Typography variant="h5" textAlign={'center'} sx={{ marginBottom: '25px', fontWeight: 'bold' }}>
                                Login
                            </Typography>
                            <Box>
                                <form onSubmit={loginFormik.handleSubmit}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <TextField fullWidth label="Email" id='email' name='email' value={loginFormik.values.email} onChange={loginFormik.handleChange} onBlur={loginFormik.handleBlur} variant="outlined" size="small" />
                                            {loginFormik.touched.email && loginFormik.errors.email ? (
                                                <Typography variant="caption" display="block" color={'error'} gutterBottom>
                                                    {loginFormik.errors.email}
                                                </Typography>) : null}
                                        </Grid>
                                        <Grid item xs={12}>
                                            <FormControl fullWidth variant="outlined" size='small'>
                                                <InputLabel htmlFor="password">Password</InputLabel>
                                                <OutlinedInput
                                                    id="password"
                                                    name="password"
                                                    type={showPassword ? 'text' : 'password'}
                                                    value={loginFormik.values.password}
                                                    onChange={loginFormik.handleChange}
                                                    onBlur={loginFormik.handleBlur}
                                                    endAdornment={
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                aria-label="toggle password visibility"
                                                                onClick={handleClickShowPassword}
                                                                onMouseDown={handleMouseDownPassword}
                                                                edge="end"
                                                            >
                                                                {showPassword ? <FaEyeSlash /> : <IoEyeSharp />}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    }
                                                    label="Password"
                                                />
                                            </FormControl>
                                            {loginFormik.touched.password && loginFormik.errors.password ? (
                                                <Typography variant="caption" display="block" color={'error'} gutterBottom>
                                                    {loginFormik.errors.password}
                                                </Typography>) : null}
                                        </Grid>
                                        <Grid item xs={12} textAlign={'center'}>
                                            <Button type='submit' variant="contained" className='primary-bgcolor' sx={{ textTransform: 'capitalize', marginTop: '10px', width: '100%' }}>submit</Button>
                                        </Grid>
                                    </Grid>
                                </form>
                            </Box>
                            <Box sx={{ textAlign: 'end', marginTop: '10px' }}>
                                <Typography variant="body2" onClick={() => setIsLogin(false)} component={'a'} color={'blue'} sx={{ cursor: 'pointer', textDecoration: 'underline' }}>
                                    Forget Password?
                                </Typography>
                            </Box>
                        </Paper>
                    </Box>
                </Container >
            </Box >
        ) : <Suspense fallback={<Loading />} ><ForgetPassword setIsLogin={setIsLogin} /></Suspense>
    )
}

export default Login