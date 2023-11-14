import { Box, Flex } from '@chakra-ui/react';
import React from 'react'
import Sidebar from '../Components/Sidebar';

const Chats = () => {
    return (
        <Flex>
            <Sidebar />
            <Box w={'90%'} position={'absolute'} right={'0px'}>
                <Flex>
                    
                </Flex>
            </Box>
        </Flex>
    )
}

export default Chats;