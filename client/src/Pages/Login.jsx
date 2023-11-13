import React, { memo } from 'react';
import { useState, useRef, useEffect, useContext } from 'react';
import { Box, Heading, Input, Button, Text, Flex, useToast, Divider, AbsoluteCenter, Image, Select, VStack } from '@chakra-ui/react';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import vector4 from '../Assets/vector4.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/authReducer/action';
import toast, { Toaster } from 'react-hot-toast';

const Login = () => {
    const navigate = useNavigate();
    const [inputType, setInputType] = useState(false);
    const dispatch = useDispatch();
    const {registerErr, isAuth, isLoading} = useSelector(store => store.authReducer);
    const [formDetails, setFormDetails] = useState({
        email: '',
        password: '',
    })

    const [focusedInput, setFocusedInput] = useState(null);
    const emailInputRef = useRef(null);
    const passwordInputRef = useRef(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormDetails({ ...formDetails, [name]: value });
    }

    useEffect(() => {
        if(formDetails.email.includes('.com') && formDetails.email.includes('@')){
            localStorage.setItem('confirmEmail', formDetails.email);
        }
    }, [formDetails.email])

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

        if (!formDetails.password.trim()) {
            passwordInputRef.current?.focus();
            setFocusedInput('password');
            return;
        }

        const newUser = { ...formDetails };

        dispatch(login(newUser));

        isAuth && setFormDetails({
            email: '',
            password: ''
        })
    }

    useEffect(() => {
        if(isAuth && !registerErr){
            toast.success('User logged in successfully');

            localStorage.removeItem('confirmEmail');
            setTimeout(() => {
                navigate('/doubt');
                window.location.reload();
            }, 2000)
        }
        else if(registerErr){
            toast.error(registerErr);
        }
    }, [isAuth, registerErr])

    const handleConfirmEmail = () => {
        localStorage.setItem('confirmEmail', formDetails.email);
        navigate('/confirmEmail');
    }

    return (
        <Box p={'20px 40px'} h={'100vh'}>
            <Toaster toastOptions={{duration : 3000}}/>
            <Flex ml={'20px'} w={'100%'} flexDirection={{ base: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row', '2xl': 'row' }} h={'100%'} position={'relative'}>
                <Button onClick={() => navigate('/signup')} p={'15px 30px'} _hover={'none'} color={'white'} position={'absolute'} bg={'#90ca5e'} top={'10px'} right={'55%'}>Sign up</Button>
                <VStack w={{ base: '100%', sm: '100%', md: '100%', lg: '50%', xl: '50%', '2xl': '50%' }} bg={'rgb(240 240 240)'} borderRadius={'40px 0 0 40px'} alignItems={'center'} justifyContent={'center'}>
                    <Flex w={'100%'} flexDir={'column'} alignItems={'center'}>
                        <form onSubmit={handleSubmit} id='signup-form'>
                            <Heading textAlign={'center'} fontSize={'25px'}>Login to your account</Heading>
                            <Input name='email' value={formDetails.email} onChange={(e) => handleChange(e)} ref={emailInputRef} onFocus={() => handleFocus('email')} onBlur={handleBlur} borderColor={focusedInput === 'email' ? 'red.500' : 'gray.200'} p={'27px 15px'} borderRadius={'5px'} focusBorderColor={focusedInput === 'email' && formDetails.email.length === 0 ? 'red.500' : 'gray.200'} type='email' placeholder={focusedInput === 'email' ? 'This field is required' : 'Email address'} />
                            <Box position={'relative'}>
                                <Input name='password' value={formDetails.password} onChange={(e) => handleChange(e)} ref={passwordInputRef} onFocus={() => handleFocus('password')} onBlur={handleBlur} borderColor={focusedInput === 'password' ? 'red.500' : 'gray.200'} p={'27px 15px'} borderRadius={'5px'} focusBorderColor={focusedInput === 'password' && formDetails.password.length === 0 ? 'red.500' : 'gray.200'} type={inputType ? 'text' : 'password'} placeholder={focusedInput === 'password' ? 'This field is required' : 'Password'} />
                                <Box position={'absolute'} zIndex={'overlay'} top={'10px'} right={'3px'}>
                                    {inputType ? <Button h={'30px'} onClick={() => setInputType(false)} bg={'white'}><AiOutlineEyeInvisible size={'16px'} /></Button> :
                                        <Button h={'30px'} onClick={() => setInputType(true)} bg={'white'}><AiOutlineEye size={'16px'} /></Button>}
                                </Box>
                                {registerErr && <Box p={'15px 10px 10px 10px'} textAlign={'center'} color={'red'} fontSize={'13px'}>
                                    <Text>{registerErr}</Text>
                                </Box>}
                                {formDetails.email.includes('.com') && formDetails.email.includes('@') && <Flex onClick={handleConfirmEmail} justifyContent={'center'} color={'blue.500'} _hover={{ textDecoration: 'underline', cursor: 'pointer' }}>
                                    <Text>Forgot Password ?</Text>
                                </Flex>}
                            </Box>
                            <Button isLoading={isLoading === true} loadingText={'Submitting'} type='submit' bg={'#90ca5e'} color={'white'} p={'27px 15px'} _hover={{ opacity: '0.8' }} borderRadius={'8px'} w={'100%'}>Login</Button>
                        </form>
                        <Flex w={'50%'} ml={'70px'} mt={'10px'} mb={'20px'} fontSize={'13px'} color={'gray.600'} gap={'10px'}>
                            <Text>Terms of use</Text>
                            <Text>|</Text>
                            <Text>Privacy policy</Text>
                        </Flex>
                    </Flex>
                </VStack>
                <Box borderRight={'1px solid #ccd0d3'} h={'100%'} bg={'white'} borderRadius={'40px'} position={'absolute'} left={'46%'} w={'50%'} display={{ base: 'none', sm: 'none', md: 'none', lg: 'grid', xl: 'grid', '2xl': 'grid' }} placeItems={'center'}>
                    <Image w={'85%'} src={vector4} />
                </Box>
            </Flex>
        </Box>
    )
}

export default memo(Login);