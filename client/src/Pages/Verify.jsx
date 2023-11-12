import React, { useContext, useEffect, useRef, useState } from 'react'
import { Box, Button, Heading, Text, Input, Flex, useToast } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { verifyOtp, verifyOtpForForgetPass } from '../redux/authReducer/action';
import { useLocation, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const Verify = () => {
    const [otpVal, setOtpVal] = useState('');
    const inputFocus = useRef();
    const { isLoading, registerErr, verifyOtpMsg, verifyForgetOtpMsg, resendOtpMsg } = useSelector(store => store.authReducer);
    const [loadingIcon, setLoadingIcon] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const email = localStorage.getItem('login-email') || '';
    const confirmEmail = localStorage.getItem('confirmEmail') || '';

    useEffect(() => {
        inputFocus.current.focus();
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();

        if(email){
            dispatch(verifyOtp({email, otp : otpVal}));
        }
        else if(confirmEmail){
            dispatch(verifyOtpForForgetPass({email : confirmEmail, otp : otpVal}));
        }
    }

    useEffect(() => {
        if(verifyOtpMsg){
           toast.success(verifyOtpMsg);

           localStorage.removeItem('confirmEmail');

           setTimeout(() => {
            navigate('/doubt');
            window.location.reload();
           }, 2000)
        }
        else if (verifyForgetOtpMsg) {
            toast.success(verifyForgetOtpMsg)

            setTimeout(() => {
                navigate('/changePassword');
                window.location.reload();
            }, 3000)
        }
        else if(registerErr){
            toast.error(registerErr);
        }
    }, [verifyOtpMsg, verifyForgetOtpMsg, registerErr])

    return (
        <Box w={'27%'} minH={'100vh'} display={'grid'} placeItems={'center'} m={'auto'}>
            <Toaster toastOptions={{duration : 3000}}/>
            <Box border={'1px solid #42a642'} borderRadius={'3px'} p={'80px 25px'} textAlign={'center'}>
                <Heading mb={'10px'} size={'lg'}>OTP Verification</Heading>
                <Text mb={'20px'} color={'gray.400'}>Enter OTP code sent to {email || confirmEmail}</Text>
                <form onSubmit={handleSubmit}>
                    <Input p={'25px 10px'} value={otpVal} ref={inputFocus} onChange={(e) => setOtpVal(e.target.value)} color={'gray.500'} textAlign={'center'} borderRadius={'none'} _focusVisible={'none'} fontSize={'20px'} letterSpacing={'10px'} type='text' placeholder='000000' maxLength={6} />
                    <Button isDisabled={otpVal.length < 6} isLoading={isLoading && !loadingIcon === true} type='submit' loadingText={'Submitting'} mt={'30px'} bg={'#90ca5e'} color={'white'} p={'0 15px'} _hover={{ opacity : '0.8' }} borderRadius={'8px'} w={'100%'}>Verify & Continue</Button>
                </form>
            </Box>
        </Box>
    )
}

export default Verify;