import React, { useState } from 'react'
import { Box, Button, Container, FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, Paper, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux'
import { receiveData } from '../redux/signupSlice'

import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';


const SignUp = () => {


    const navigate = useNavigate();
    const dispatch = useDispatch()

    const data = useSelector(state => state.signUpData)

    // console.log("data", data);

    const [showPassword, setShowPassword] = useState(false);
    const [initialValues, setInitialValues] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });


    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const signUpValidationSchema = Yup.object({
        firstName: Yup.string().min(3, 'Min 3 character').max(15, 'Max 15 character').required('Please fill the FirstName is required'),
        lastName: Yup.string().min(3, 'Min 3 character').max(15, 'Max 15 character').required('Please fill the LastName is required'),
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

    const signUpFormik = useFormik({
        initialValues,
        validationSchema: signUpValidationSchema,
        onSubmit: (values, { resetForm }) => {

            let find = data.find((data) => data.email === values.email)

            if (find) {
                toast.error('Already SignUp! Change Your Email-Id')
            }
            else {

                let newData = [...data,values]

                dispatch(receiveData(newData))
                resetForm()
                setInitialValues({
                    firstName: '',
                    lastName: '',
                    email: '',
                    password: ''
                })
                navigate('/login')
            }
        }
    })

    return (
        <Box className='secondary-bgcolor' sx={{ height: '100vh' }}>
            <Container maxWidth='sm'>
                <Box sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Paper elevation={1} sx={{ width: '350px', padding: '30px' }}>
                        <Typography variant="h5" textAlign={'center'} sx={{ marginBottom: '25px', fontWeight: 'bold' }}>
                            SignUp
                        </Typography>
                        <Box>
                            <form onSubmit={signUpFormik.handleSubmit}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField fullWidth label="FirstName" id='firstName' name='firstName' value={signUpFormik.values.firstName} onChange={signUpFormik.handleChange} onBlur={signUpFormik.handleBlur} variant="outlined" size="small" />
                                        {signUpFormik.touched.firstName && signUpFormik.errors.firstName ? (
                                            <Typography variant="caption" display="block" color={'error'} gutterBottom>
                                                {signUpFormik.errors.firstName}
                                            </Typography>) : null}
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField fullWidth label="LastName" id='lastName' name='lastName' value={signUpFormik.values.lastName} onChange={signUpFormik.handleChange} onBlur={signUpFormik.handleBlur} variant="outlined" size="small" />
                                        {signUpFormik.touched.lastName && signUpFormik.errors.lastName ? (
                                            <Typography variant="caption" display="block" color={'error'} gutterBottom>
                                                {signUpFormik.errors.lastName}
                                            </Typography>) : null}
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField fullWidth label="Email" id='email' name='email' value={signUpFormik.values.email} onChange={signUpFormik.handleChange} onBlur={signUpFormik.handleBlur} variant="outlined" size="small" />
                                        {signUpFormik.touched.email && signUpFormik.errors.email ? (
                                            <Typography variant="caption" display="block" color={'error'} gutterBottom>
                                                {signUpFormik.errors.email}
                                            </Typography>) : null}
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControl fullWidth variant="outlined" size='small'>
                                            <InputLabel htmlFor="password">Password</InputLabel>
                                            <OutlinedInput
                                                id="password"
                                                name="password"
                                                type={showPassword ? 'text' : 'password'}
                                                value={signUpFormik.values.password}
                                                onChange={signUpFormik.handleChange}
                                                onBlur={signUpFormik.handleBlur}
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
                                        {signUpFormik.touched.password && signUpFormik.errors.password ? (
                                            <Typography variant="caption" display="block" color={'error'} gutterBottom>
                                                {signUpFormik.errors.password}
                                            </Typography>) : null}
                                    </Grid>
                                    <Grid item xs={12} textAlign={'center'}>
                                        <Button type='submit' variant="contained" className='primary-bgcolor' sx={{ textTransform: 'capitalize', marginTop: '10px', width: '100%' }}>submit</Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </Box>
                        <Box sx={{ textAlign: 'end', marginTop: '10px' }}>
                            <Typography variant="body2" onClick={() => navigate('/login')} component={'a'} color={'blue'} sx={{ cursor: 'pointer', textDecoration: 'underline' }}>
                                Already SignUp?  Login
                            </Typography>
                        </Box>
                    </Paper>
                </Box>
            </Container >
        </Box >
    )
}

export default SignUp