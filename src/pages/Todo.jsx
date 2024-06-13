import React, { useState } from 'react'
import TodoModel from '../model/TodoModel';
import { Box, Button, Container, Typography, styled, Paper, Grid, Stack, IconButton, useMediaQuery, useTheme } from '@mui/material'

import { FaPlus } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";

import { toast } from 'react-toastify';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2.5),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    borderRadius: '8px'
}));

const Todo = () => {

    const theme = useTheme();
    const sm = useMediaQuery(theme.breakpoints.down('sm'));

    const [open, setOpen] = useState(false);
    const [contactData, setContactData] = useState([{
        firstName: 'Bhargav',
        lastName: 'Patel',
        phoneNo: '1131414144',
        emailAddress: 'patel123@gmail.com',
        gender: 'Male'
    }]);
    const [updateId, setUpdateId] = useState(null);
    const [updateData, setUpdateData] = useState(null);


    const receiveContactData = (data) => {

        if (updateId >= 0 && updateId !== null) {

            let copyData = [...contactData]

            copyData[updateId] = data

            setContactData(copyData)
            
            toast.success('Contact Update Successfully')

            setUpdateId(null)
        }
        else {
            setContactData([...contactData, data])

            toast.success('Contact Add Successfully')
        }
    }

    const deleteData = (index) => {

        let copyData = [...contactData]

        copyData.splice(index, 1)

        setContactData(copyData)

        toast.success('Contact Delete Successfully')
    }

    const updatableData = (index) => {

        setUpdateId(index)

        let copyData = [...contactData]

        setUpdateData(copyData[index])
    }



    return (
        <Box className='secondary-bgcolor' sx={{paddingY : '30px'}}>
            <Container maxWidth="lg">
                <Typography variant="h1" sx={{ fontSize : sm ? '38px' : '45px' }} className='primary-color' textAlign={'center'} >
                    Todo App
                </Typography>

                <Button onClick={() => setOpen(true)} size={sm ? 'small' : 'medium'}  variant="contained" className='primary-bgcolor' sx={{ textTransform: 'capitalize', marginY: '30px', fontSize: '16px' }} startIcon={<FaPlus size={16} />}>
                    Add Contact
                </Button>
                <TodoModel open={open} setOpen={setOpen} receiveContactData={receiveContactData} updateData={updateData} setUpdateData={setUpdateData} setUpdateId={setUpdateId}/>

                <Box sx={{ marginTop: '30px' }}>
                    <Grid container spacing={4}>
                        {
                            contactData.map((data, index) => (
                                <Grid item md={4} sm={6} xs={12} key={index} >
                                    <Item sx={{ backgroundColor: '#dcdcff' }}>
                                        <Stack direction={'row'} spacing={1} justifyContent={'end'}>
                                            <IconButton aria-label="edit" onClick={() => {updatableData(index); setOpen(true)}}>
                                                <FiEdit size={20} />
                                            </IconButton>
                                            <IconButton aria-label="delete" onClick={() => deleteData(index)}>
                                                <MdDelete />
                                            </IconButton>
                                        </Stack>
                                        <Typography variant="body1" textAlign='start' fontWeight={'bold'} gutterBottom>
                                            FirstName : <span className='fw-lighter'>{data.firstName}</span>
                                        </Typography>
                                        <Typography variant="body1" textAlign='start' fontWeight={'bold'} gutterBottom>
                                            LastName : <span className='fw-lighter'>{data.lastName}</span>
                                        </Typography>
                                        <Typography variant="body1" textAlign='start' fontWeight={'bold'} gutterBottom>
                                            PhoneNo : <span className='fw-lighter'>{data.phoneNo}</span>
                                        </Typography>
                                        <Typography variant="body1" textAlign='start' fontWeight={'bold'} gutterBottom>
                                            Email : <span className='fw-lighter'>{data.emailAddress}</span>
                                        </Typography>
                                        <Typography variant="body1" textAlign='start' fontWeight={'bold'} gutterBottom>
                                            Gender : <span className='fw-lighter'>{data.gender}</span>
                                        </Typography>
                                    </Item>
                                </Grid>
                            ))
                        }
                    </Grid>
                </Box>

            </Container>
        </Box>
    )
}

export default Todo