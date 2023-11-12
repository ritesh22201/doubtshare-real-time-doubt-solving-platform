import React, { useState, useRef, useEffect } from 'react';
import { Box, Heading, Input, Button, Text, Flex, useToast, Image } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { changePassword, forgetPassword } from '../redux/authReducer/action';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import toast, { Toaster } from 'react-hot-toast';

const ChangePassword = () => {
    const dispatch = useDispatch();
    const [inputType, setInputType] = useState(false);
    const [inputType2, setInputType2] = useState(false);
    const navigate = useNavigate();
    const { isLoading, changePassMsg, registerErr } = useSelector((store) => store.authReducer);
    const confirmEmail = localStorage.getItem('confirmEmail') || '';
    const [error, setError] = useState(false);
    const [formDetails, setFormDetails] = useState({
        password: '',
        confirmPassword: ''
    })
    const [validate, setValidate] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormDetails({ ...formDetails, [name]: value });
    }

    useEffect(() => {
        setError(false);
    }, [formDetails.password, formDetails.confirmPassword])

    const [focusedInput, setFocusedInput] = useState(null);
    const passwordInputRef = useRef(null);
    const confirmPasswordInputRef = useRef(null);

    const handleFocus = (name) => {
        setFocusedInput(name);
    };

    const handleBlur = () => {
        setFocusedInput(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formDetails.password.trim()) {
            passwordInputRef.current?.focus();
            setFocusedInput('password');
            return;
        }

        if (!formDetails.confirmPassword.trim()) {
            confirmPasswordInputRef.current?.focus();
            setFocusedInput('confirmPassword');
            return;
        }

        if (formDetails.password !== formDetails.confirmPassword) {
            setValidate(true);
            return;
        }
        // localStorage.setItem('confirmEmail', formDetails.email);
        // localStorage.setItem('login-email', '');
        const newUser = { email: confirmEmail, newPassword: formDetails.password };
        dispatch(changePassword(newUser));
    }

    useEffect(() => {
        if (changePassMsg) {
            toast.success(changePassMsg);
            localStorage.removeItem('confirmEmail');
            setTimeout(() => {
                navigate('/login');
                window.location.reload();
            }, 3000)
        }
        else if(registerErr){
            // toast.error(registerErr);
            setValidate(true);
        }
    }, [changePassMsg, registerErr])


    return (
        <Box minH={'90vh'} w={{ base: '90%', sm: '90%', md: '65%', lg: '25%', xl: '25%', '2xl': '25%' }} m={'auto'} display={'grid'} placeItems={'center'}>
            <Toaster toastOptions={{duration : 3000}}/>
            <Box border={'1px solid #42a642'} borderRadius={'3px'} p={'40px 20px'} textAlign={'center'}>
                <form onSubmit={handleSubmit} id='signup-form2'>
                    <Heading mb={'20px'} color={'gray.700'} textAlign={'center'} size={'lg'}>Enter your new password</Heading>
                    <Box position={'relative'}>
                        <Input name='password' value={formDetails.password} onChange={(e) => handleChange(e)} ref={passwordInputRef} onFocus={() => handleFocus('password')} onBlur={handleBlur} borderColor={focusedInput === 'password' ? 'red.500' : 'gray.200'} p={'22px 15px'} borderRadius={'5px'} focusBorderColor={focusedInput === 'password' && formDetails.password.length === 0 ? 'red.500' : 'gray.200'} type={inputType ? 'text' : 'password'} placeholder={focusedInput === 'password' ? 'This field is required' : 'Password'} />
                        <Box position={'absolute'} zIndex={'overlay'} top={'2px'} right={'3px'}>
                            {inputType ? <Button _hover={'none'} _active={'none'} onClick={() => setInputType(false)} bg={'white'}><AiOutlineEyeInvisible size={'18px'} /></Button> :
                                <Button _hover={'none'} _active={'none'} onClick={() => setInputType(true)} bg={'white'}><AiOutlineEye size={'18px'} /></Button>}
                        </Box>
                    </Box>
                    <Box position={'relative'}>
                        <Input name='confirmPassword' value={formDetails.confirmPassword} onChange={(e) => handleChange(e)} ref={confirmPasswordInputRef} onFocus={() => handleFocus('confirmPassword')} onBlur={handleBlur} borderColor={focusedInput === 'confirmPassword' ? 'red.500' : 'gray.200'} p={'22px 15px'} borderRadius={'5px'} focusBorderColor={focusedInput === 'confirmPassword' && formDetails.confirmPassword.length === 0 ? 'red.500' : 'gray.200'} type={inputType2 ? 'text' : 'password'} placeholder={focusedInput === 'confirmPassword' ? 'This field is required' : 'Confirm Password'} />
                        <Box position={'absolute'} zIndex={'overlay'} top={'2px'} right={'3px'}>
                            {inputType2 ? <Button _hover={'none'} _active={'none'} onClick={() => setInputType2(false)} bg={'white'}><AiOutlineEyeInvisible size={'18px'} /></Button> :
                                <Button _hover={'none'} _active={'none'} onClick={() => setInputType2(true)} bg={'white'}><AiOutlineEye size={'18px'} /></Button>}
                        </Box>
                    </Box>
                    <Box position={'relative'}>
                        {validate && !error && <Box p={'15px 10px 10px 10px'} textAlign={'center'} color={'red'} fontSize={'13px'}>
                            <Text>{registerErr ? registerErr : 'Password and Confirm Password must be equal'}</Text>
                        </Box>}
                    </Box>
                    <Button isLoading={isLoading ? true : false} loadingText={'Submitting'} type='submit' bg={'#90ce5e'} color={'white'} p={'22px 15px'} _hover={{ opacity : '0.8' }} borderRadius={'8px'} w={'100%'}>Continue</Button>
                </form>
            </Box>
        </Box>
    )
}

export default ChangePassword;
