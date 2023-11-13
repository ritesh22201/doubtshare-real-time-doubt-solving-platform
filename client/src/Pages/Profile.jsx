import { Box, Flex } from '@chakra-ui/react';
import React from 'react'
import Sidebar from '../Components/Sidebar';

const Profile = () => {
  return (
    <Flex>
        <Sidebar/>
        <Box w={'90%'} position={'absolute'} right={'0'}>
            Profile
        </Box>
    </Flex>
  )
}

export default Profile;