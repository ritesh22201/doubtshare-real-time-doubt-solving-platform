import { Box, Button, Grid, Heading } from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Classes = () => {
    const grades = [
        { id: 1, grade: 'I' },
        { id: 2, grade: 'II' },
        { id: 3, grade: 'III' },
        { id: 4, grade: 'IV' },
        { id: 5, grade: 'V' },
        { id: 6, grade: 'VI' },
        { id: 7, grade: 'VII' },
        { id: 8, grade: 'VIII' },
        { id: 9, grade: 'IX' },
        { id: 10, grade: 'X' },
        { id: 11, grade: 'XI' },
        { id: 12, grade: 'XII' }
    ]
    const [gradeVal, setGradeVal] = useState('');
    const [classVal, setClassVal] = useState(null);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const token = JSON.parse(localStorage.getItem('login-token')) || {};

    const handleGrades = (ind, id) => {
        let gradeValues = classVal === ind ? null : ind;
        setClassVal(gradeValues);
        setGradeVal(id);
    }

    const handleSaveClass = () => {
        setLoading(true);
        axios.post('https://doubts-cleared.onrender.com/api/auth/addClass', {email : token.email, grade : gradeVal}, {
            headers : {
                'Authorization' : `Bearer ${token.token}`,
                'Content-Type' : 'application/json'
            }
        })
        .then(res => {
            setLoading(false);
            if(res.data.msg){
                toast.success(res.data.msg);
                setTimeout(() => {
                    navigate('/doubt');
                    window.location.reload();
                }, 3000)
            };
        })
        .catch(err => {
            console.log(err)
            setLoading(false);
            toast.error(err.message);
        })
    }

    return (
        <Box w={'65%'} textAlign={'center'} m={'auto'}>
            <Toaster toastOptions={{duration : 3000}}/>
            <Heading m={'80px 0 30px 0'} size={'md'}>SELECT YOUR CLASS</Heading>
            <Grid gridTemplateColumns={'repeat(3, 1fr)'} w={'50%'} gap={'10px'} m={'0 auto'}>
                {grades.map((el, i) => {
                    return <Button onClick={() => handleGrades(i, el.id)} variant={'outline'} fontWeight={classVal === i ? 'bold' : '500'} color={classVal === i ? '#90ca5e' : 'black'} outline={classVal === i ? '2px solid #90ca5e' : '1px solid black'} key={el.id}>Class {el.grade}</Button>
                })}
            </Grid>
            <Button isLoading={loading} loadingText={'Saving...'} onClick={handleSaveClass} _hover={{opacity : '0.8'}} _active={'none'} bg={'#90ca5e'} color={'white'} mt={'20px'} w={'50%'}>Save Changes</Button>
        </Box>
    )
}

export default Classes;