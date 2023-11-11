import { Box, Button, Flex, Image, Text, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { AiFillBulb } from 'react-icons/ai';
import vector1 from '../Assets/Homepage/vector1.png';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    return (
        <Box p={{ base: '180px 10px', sm: '10px', md: '10px', lg: '20px 70px', xl: '20px 70px', '2xl': '20px 70px' }} h={'100vh'}>
            <Flex ml={'20px'} flexDirection={{ base: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row', '2xl': 'row' }} w={'100%'} h={'100%'} position={'relative'}>
                <VStack w={{ base: '100%', sm: '100%', md: '100%', lg: '50%', xl: '50%', '2xl': '50%' }} bg={'rgb(240 240 240)'} borderRadius={'40px 0 0 40px'} alignItems={'flex-start'} pl={'120px'} justifyContent={'center'}>
                    <Flex alignItems={'center'} gap={'10px'}>
                        <button style={{ background: '#90ca5e', padding: '4px 8px', color: 'white', borderRadius: '5px' }}><AiFillBulb /></button>
                        <Text fontWeight={'500'} color={'gray.700'}>Welcome to DoubtsCleared</Text>
                    </Flex>
                    <Text mt={'17px'} fontWeight={'500'} fontSize={'30px'}>Discover Your</Text>
                    <Box h={'100px'} className="animate__animated animate__fadeInDown">
                        <Text w={'65%'}>Find answers to your doubts in real-time, connect with experienced tutors, and unlock your learning potential.</Text>
                    </Box>
                    <Button onClick={() => navigate('/signup')} bg={'#90ca5e'} p={'0 30px'} _hover={{ opacity: '0.8' }} _active={'none'} color={'white'} h={'33px'}>Get Started</Button>
                </VStack>
                <Box borderRight={'1px solid #ccd0d3'} h={'100%'} bg={'white'} borderRadius={'40px'} position={'absolute'} left={'46%'} w={'50%'} display={{ base: 'none', sm: 'none', md: 'none', lg: 'grid', xl: 'grid', '2xl': 'grid' }} placeItems={'center'}>
                    <Image w={'85%'} src={vector1} />
                </Box>
            </Flex>
        </Box>
    )
}

export default Home;