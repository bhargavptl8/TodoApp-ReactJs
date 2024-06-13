import React, { useEffect, useState } from 'react'
import { Backdrop, Box, Modal, Fade, Typography, Stack, TextField, Grid, InputLabel, MenuItem, FormControl, Select, Button, useMediaQuery, useTheme } from '@mui/material'
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { RiCloseCircleLine } from "react-icons/ri";

const ModelStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: '10px',
    p: 4,
};

const TodoModel = ({ open, setOpen, receiveContactData, updateData, setUpdateData, setUpdateId }) => {


    const theme = useTheme();
    const sm = useMediaQuery(theme.breakpoints.down('sm'));

    const [initialValues, setInitialValues] = useState({
        firstName: '',
        lastName: '',
        phoneNo: '',
        emailAddress: '',
        gender: ''
    })


    useEffect(() => {
        if (updateData) {
            setInitialValues({
                firstName: updateData.firstName,
                lastName: updateData.lastName,
                phoneNo: updateData.phoneNo,
                emailAddress: updateData.emailAddress,
                gender: updateData.gender
            });
            setUpdateData(null);
        }
    }, [updateData]);

    const contactInfoValidationSchema = Yup.object({
        firstName: Yup.string().min(3, 'Min 3 character').max(15, 'Max 15 character').required('Please fill the FirstName is required'),
        lastName: Yup.string().min(3, 'Min 3 character').max(15, 'Max 15 character').required('Please fill the LastName is required'),
        phoneNo: Yup.string()
            .min(10, 'PhoneNo must be at least 10 Digit')
            .max(10, 'PhoneNo must be at least 10 Digit')
            .matches(/^[0-9]+$/, 'PhoneNo must contain only digit')
            .required('Please fill the PhoneNo is Required'),
        emailAddress: Yup.string().email('Invalid email address').required('Please fill the Email is required'),
        gender: Yup.string().required('Please select the Gender is required')

    })


    const contactInfoFormik = useFormik({
        initialValues,
        enableReinitialize: true,
        validationSchema: contactInfoValidationSchema,
        onSubmit: (values, { resetForm }) => {

            receiveContactData(values)

            resetForm()
            setInitialValues({
                firstName: '',
                lastName: '',
                phoneNo: '',
                emailAddress: '',
                gender: ''
            })
            handleClose()
        }
    })

    const handleClose = () => {
        setOpen(false); contactInfoFormik.resetForm(); setInitialValues({
            firstName: '',
            lastName: '',
            phoneNo: '',
            emailAddress: '',
            gender: ''
        }); setUpdateId(null)
    }


    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open} >
                    <Box sx={ModelStyle} width={sm ? 200 : 400}>
                        <Stack sx={{ position: 'relative' }} direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                            <Typography id="transition-modal-title" variant="h5" fontWeight={'bold'} component="h2">
                                Contact Info
                            </Typography>
                            <Box onClick={handleClose} sx={{ position: 'absolute', right: -11, top: -13, cursor: 'pointer', lineHeight: 0 }}>
                                <RiCloseCircleLine size={22} />
                            </Box>
                        </Stack>
                        <Box sx={{ marginTop: '24px' }}>

                            <form onSubmit={contactInfoFormik.handleSubmit}>
                                <Grid container spacing={2}>
                                    <Grid item sm={6} xs={12}>
                                        <TextField fullWidth label="FirstName" id='firstName' name='firstName' value={contactInfoFormik.values.firstName} onChange={contactInfoFormik.handleChange} variant="outlined" size="small" />
                                        {contactInfoFormik.touched.firstName && contactInfoFormik.errors.firstName ? (
                                            <Typography variant="caption" display="block" color={'error'} gutterBottom>
                                                {contactInfoFormik.errors.firstName}
                                            </Typography>) : null}
                                    </Grid>
                                    <Grid item sm={6} xs={12}>
                                        <TextField fullWidth label="LastName" id='lastName' name='lastName' value={contactInfoFormik.values.lastName} onChange={contactInfoFormik.handleChange} variant="outlined" size="small" />
                                        {contactInfoFormik.touched.lastName && contactInfoFormik.errors.lastName ? (
                                            <Typography variant="caption" display="block" color={'error'} gutterBottom>
                                                {contactInfoFormik.errors.lastName}
                                            </Typography>) : null}
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField fullWidth label="PhoneNo" id='phoneNo' name='phoneNo' value={contactInfoFormik.values.phoneNo} onChange={contactInfoFormik.handleChange} variant="outlined" size="small" />
                                        {contactInfoFormik.touched.phoneNo && contactInfoFormik.errors.phoneNo ? (
                                            <Typography variant="caption" display="block" color={'error'} gutterBottom>
                                                {contactInfoFormik.errors.phoneNo}
                                            </Typography>) : null}
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField fullWidth label="Email Address" id='emailAddress' name='emailAddress' value={contactInfoFormik.values.emailAddress} onChange={contactInfoFormik.handleChange} variant="outlined" size="small" />
                                        {contactInfoFormik.touched.emailAddress && contactInfoFormik.errors.emailAddress ? (
                                            <Typography variant="caption" display="block" color={'error'} gutterBottom>
                                                {contactInfoFormik.errors.emailAddress}
                                            </Typography>) : null}
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControl size="small" fullWidth>
                                            <InputLabel>Gender</InputLabel>
                                            <Select id='gender' name='gender' label="Gender" value={contactInfoFormik.values.gender} onChange={contactInfoFormik.handleChange}>
                                                <MenuItem value='Male'>Male</MenuItem>
                                                <MenuItem value='Female'>Female</MenuItem>
                                                <MenuItem value='Other'>Other</MenuItem>
                                            </Select>
                                        </FormControl>
                                        {contactInfoFormik.touched.gender && contactInfoFormik.errors.gender ? (
                                            <Typography variant="caption" display="block" color={'error'} gutterBottom>
                                                {contactInfoFormik.errors.gender}
                                            </Typography>) : null}
                                    </Grid>
                                    <Grid item xs={12} textAlign={'center'}>
                                        <Button type='submit' variant="contained" className='primary-bgcolor' sx={{ textTransform: 'capitalize', borderRadius: '10px', marginTop: '10px', paddingX: '20px' }}>submit</Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </Box>
                    </Box>
                </Fade>
            </Modal>
        </div>
    )
}

export default TodoModel