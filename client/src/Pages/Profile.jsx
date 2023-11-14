import { Avatar, Box, Button, Flex, Heading, Input, Progress, Text } from '@chakra-ui/react';
import React, { memo, useEffect, useState } from 'react'
import Sidebar from '../Components/Sidebar';
import { FaCheck, FaMedal, FaUser } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { BsCheckLg, BsFillClockFill } from 'react-icons/bs';
import { getDoubts } from '../redux/doubtReducer/action';
import { MdOutlineClass } from 'react-icons/md';
import { SiGoogleclassroom } from 'react-icons/si';
import { getSingleUser, updateProfile } from '../redux/authReducer/action';
import toast, { Toaster } from 'react-hot-toast';

const Profile = () => {
    const data = JSON.parse(localStorage.getItem('login-token')) || {};
    const name1 = data?.email?.slice(0, 2).split('').join(' ');
    const dispatch = useDispatch();
    const { doubts } = useSelector(store => store.doubtReducer);
    const {isUpdated, isLoading, user} = useSelector(store => store.authReducer);

    const [formDetails, setFormDetails] = useState({
        name: '',
    });

    useEffect(() => {
        if (user?.email) {
            setFormDetails({
                name: user.name || '',
            });
        }
    }, [user?.email]);


    useEffect(() => {
        dispatch(getSingleUser({email : data?.email}));
    }, [user?.name])

    useEffect(() => {
        dispatch(getDoubts());
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormDetails({ ...formDetails, [name]: value });
    }

    const handleUpdateProfile = (e) => {
        e.preventDefault();

        dispatch(updateProfile({id : user._id}, {name : formDetails.name}));
    }

    useEffect(() => {
        if(isUpdated){
            toast.success(isUpdated);
            setTimeout(() => {
                window.location.reload();
            }, 3000)
        }
        dispatch(getSingleUser({email : data?.email}));
    }, [isUpdated])

    return (
        <Flex>
            <Sidebar />
            <Toaster toastOptions={{duration : 3000}}/>
            <Flex w={'90%'} gap={'30px'} position={'absolute'} right={'0'}>
                <Box mt={'20px'} w={'50%'}>
                    <Flex gap={'10px'} alignItems={'center'}>
                        <Avatar bg={'#90ce5e'} color={'white'} name={user?.name ? user?.name : name1} size={'lg'} />
                        <Box>
                            <Heading size={'md'}>{user?.name ? user?.name : 'DoubtCleared User'}</Heading>
                            <Flex mt={'5px'} alignItems={'center'} gap={'3px'} fontSize={'14px'}>
                                <FaUser />
                                <Text>{data?.email?.split('@')[0]}</Text>
                            </Flex>
                        </Box>
                    </Flex>
                    <Text m={'25px 0 10px 0'} fontSize={'20px'} fontWeight={'500'}>Statistics Overview</Text>
                    <Flex mt={'10px'} w={'100%'} gap={'10px'}>
                        <Box fontWeight={'500'} w={'26%'} textAlign={'center'} borderRadius={'5px'} bg={'#f0f0f0'} p={'6px'}>
                            <Button fontSize={'18px'} _hover={'none'} _active={'none'} w={'full'} bg={'#90ca5e'}><FaCheck /></Button>
                            <Text mt={'5px'} fontSize={'13px'}>Doubts Resolved</Text>
                            <Text>{doubts?.filter(el => el.isResolved === true)?.length}</Text>
                        </Box>
                        <Box fontWeight={'500'} w={'26%'} textAlign={'center'} borderRadius={'5px'} bg={'#f0f0f0'} p={'6px'}>
                            <Button fontSize={'18px'} _hover={'none'} _active={'none'} w={'full'} bg={'#90ca5e'}><BsFillClockFill /></Button>
                            <Text mt={'5px'} fontSize={'13px'}>Doubts Unresolved</Text>
                            <Text>{doubts?.filter(el => el.isResolved === false)?.length}</Text>
                        </Box>
                        <Box fontWeight={'500'} w={'26%'} textAlign={'center'} borderRadius={'5px'} bg={'#f0f0f0'} p={'6px'}>
                            <Button fontSize={'21px'} _hover={'none'} _active={'none'} w={'full'} bg={'#90ca5e'}><FaMedal /></Button>
                            <Text mt={'5px'} fontSize={'13px'}>Total Doubts</Text>
                            <Text>{doubts?.length}</Text>
                        </Box>
                    </Flex>
                    <Text m={'25px 0 10px 0'} fontSize={'20px'} fontWeight={'500'}>Achievements</Text>
                    <Box w={'81.2%'}>
                        <Flex bg={'#f0f0f0'} p={'6px'} borderRadius={'5px'} gap={'10px'} w={'100%'}>
                            <Button h={'72px'} w={'85px'} fontSize={'25px'} _hover={'none'} _active={'none'} bg={'#90ca5e'}><BsFillClockFill /></Button>
                            <Box w={'85%'}>
                                <Flex justifyContent={'space-between'} alignItems={'center'}>
                                    <Heading size={'sm'}>Learning Streak</Heading>
                                    <Text fontSize={'12px'} color={'gray.500'}>1/3 Days</Text>
                                </Flex>
                                <Progress bg={'white'} m={'10px 0'} colorScheme='green' size='sm' value={20} />
                                <Text fontSize={'12px'} fontWeight={'500'} mt={'5px'}>Target Achieved</Text>
                            </Box>
                        </Flex>
                        <Flex mt={'15px'} bg={'#f0f0f0'} p={'6px'} borderRadius={'5px'} gap={'10px'} w={'100%'}>
                            <Button h={'72px'} w={'85px'} fontSize={'25px'} _hover={'none'} _active={'none'} bg={'#90ca5e'}><FaMedal /></Button>
                            <Box w={'85%'}>
                                <Flex justifyContent={'space-between'} alignItems={'center'}>
                                    <Heading size={'sm'}>Points Earned</Heading>
                                    <Text fontSize={'12px'} color={'gray.500'}>200/1600</Text>
                                </Flex>
                                <Progress bg={'white'} m={'10px 0'} colorScheme='green' size='sm' value={8} />
                                <Text fontSize={'12px'} fontWeight={'500'} mt={'5px'}>Earn 1400 more points</Text>
                            </Box>
                        </Flex>
                    </Box>
                </Box>
                <Box w={'50%'} mr={'20px'} mt={'50px'}>
                    <Text m={'25px 0 10px 0'} fontSize={'20px'} fontWeight={'500'}>Update Profile</Text>
                    <form onSubmit={handleUpdateProfile}>
                        <Box className='input-container'>
                            <Input name='name' value={formDetails.name} onChange={(e) => handleChange(e)} type='text' _focusVisible='none' borderRadius='0' border='1px solid #cccbcb' />
                            <label>Full Name*</label>
                        </Box>
                        <Box className='input-container'>
                            <Input readOnly value={user?.email} type='text' _focusVisible='none' borderRadius='0' border='1px solid #cccbcb' />
                            <label>Email*</label>
                        </Box>
                        <Flex justifyContent={'space-between'} w={'80%'}>
                            <Box>
                                <Text m={'25px 0 10px 0'} fontSize={'16px'} fontWeight={'500'}>User Type</Text>
                                <Box textAlign={'center'} w={'fit-content'} p={'6px'} borderRadius={'5px'} mt='10px' bg={'#f0f0f0'}>
                                    <Button w={'150px'} bg='#90ce5e' _hover='none' _active='none' borderRadius='6px'><FaUser /></Button>
                                    <Text color={'gray.600'} mt={'6px'} fontWeight={'500'} fontSize={'14px'}>{user?.userType?.charAt(0).toUpperCase() + user?.userType?.slice(1)}</Text>
                                </Box>
                            </Box>
                            <Box>
                                <Text m={'25px 0 10px 0'} fontSize={'16px'} fontWeight={'500'}>Grade</Text>
                                <Box textAlign={'center'} w={'fit-content'} p={'6px'} borderRadius={'5px'} mt='10px' bg={'#f0f0f0'}>
                                    <Button fontWeight={'bold'} w={'150px'} bg='#90ce5e' _hover='none' fontSize={'20px'} _active='none' borderRadius='6px'><SiGoogleclassroom /></Button>
                                    <Text color={'gray.600'} mt={'6px'} fontWeight={'500'} fontSize={'14px'}>{user?.grade}</Text>
                                </Box>
                            </Box>
                        </Flex>
                        <Button isLoading={isLoading} loadingText={'Saving...'} type='submit' w='80%' mt='25px' _hover={{ opacity: '0.8' }} _active='none' borderRadius='2px' fontSize='14px' fontWeight='bold' textTransform='uppercase' bg='#90ce5e' color='white'>Save Changes</Button>
                    </form>
                </Box>
            </Flex>
        </Flex>
    )
}

export default memo(Profile);