import React, { useState, useRef, useEffect } from 'react';
import { Box, Heading, Input, Button, Text, Flex, useToast, Image } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { forgetPassword } from '../redux/authReducer/action';
import toast, { Toaster } from 'react-hot-toast';

const ConfirmEmail = () => {
    // const [inputType, setInputType] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoading, forgetPassMsg, registerErr } = useSelector((store) => store.authReducer);
    const confirmEmail = localStorage.getItem('confirmEmail') || '';
    const [formDetails, setFormDetails] = useState({
        email: ''
    })

    useEffect(() => {
        if (confirmEmail) {
            setFormDetails({ ...formDetails, email: confirmEmail });
        }
    }, [confirmEmail])

    const [focusedInput, setFocusedInput] = useState(null);
    const emailInputRef = useRef(null);

    const handleFocus = (name) => {
        setFocusedInput(name);
    };

    const handleBlur = () => {
        setFocusedInput(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formDetails.email.trim()) {
            emailInputRef.current?.focus();
            setFocusedInput('email');
            return;
        }
        localStorage.setItem('confirmEmail', formDetails.email);
        localStorage.removeItem('login-email');

        const newUser = { ...formDetails };
        dispatch(forgetPassword(newUser));
    }

    useEffect(() => {
        if (forgetPassMsg) {
            toast.success(forgetPassMsg);

            setTimeout(() => {
                localStorage.setItem('isRegistered', formDetails.email);
                navigate('/verify');
                window.location.reload(); 
            }, 2000)
        }
    }, [forgetPassMsg])


    return (
        <Box minH={'90vh'} w={{ base: '90%', sm: '90%', md: '65%', lg: '25%', xl: '25%', '2xl': '25%' }} m={'auto'} display={'grid'} placeItems={'center'}>
            <Toaster toastOptions={{duration : 2000}}/>
            <Box w={'100%'} border={'1px solid #42a642'} borderRadius={'3px'} p={'40px 17px'}>
                <form onSubmit={handleSubmit} id='signup-form2'>
                    <Heading color={'gray.700'} textAlign={'center'} size={'lg'}>Confirm Email</Heading>
                    <Text mb={'10px'} textAlign={'center'} color={'gray.400'}>Please confirm your email.</Text>
                    <Input name='email' value={formDetails.email} onChange={(e) => setFormDetails({ ...formDetails, email: e.target.value })} ref={emailInputRef} onFocus={() => handleFocus('email')} onBlur={handleBlur} borderColor={focusedInput === 'email' ? 'red.500' : 'gray.200'} p={'20px 15px'} borderRadius={'5px'} focusBorderColor={focusedInput === 'email' && formDetails.email.length === 0 ? 'red.500' : 'gray.200'} type='email' placeholder={focusedInput === 'email' ? 'This field is required' : 'Email address'} />
                    <Box position={'relative'}>
                        {registerErr && <Box p={'15px 10px 10px 10px'} textAlign={'center'} color={'red'} fontSize={'13px'}>
                            <Text>{registerErr}</Text>
                        </Box>}
                    </Box>
                    <Button isLoading={isLoading ? true : false} loadingText={'Submitting'} type='submit' bg={'#90ca5e'} color={'white'} p={'20px 15px'} _hover={{ opacity : '0.8' }} borderRadius={'8px'} w={'100%'}>Confirm</Button>
                    <Flex w={'90%'} m={'5px auto'} fontSize={'14px'} justifyContent={'space-around'}>
                        <Text>Already know your password? </Text>
                        <Link style={{ color: '#10a37f' }} to={'/login'}>Login</Link>
                    </Flex>
                </form>
            </Box>
        </Box>
    )
}

export default ConfirmEmail;
