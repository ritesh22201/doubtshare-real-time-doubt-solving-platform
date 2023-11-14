import { Box, Flex, Input } from '@chakra-ui/react';
import React, { useEffect } from 'react'
import Sidebar from '../Components/Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { getDoubts } from '../redux/doubtReducer/action';
import { BsSendFill } from 'react-icons/bs';

const Chats = () => {
    const {doubts} = useSelector(store => store.doubtReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDoubts());
    }, [])

    useEffect(() => {
        dispatch(getDoubts());
    }, [doubts.length])

    return (
        <Flex>
            <Sidebar />
            <Box w={'92%'} position={'absolute'} right={'0px'}>
                <Flex w={'100%'} minH={'100vh'}>
                    <Box lineHeight={'25px'} color={'gray.600'} p={'8px'} w={'20%'} bg={'#f0f0f0'}>
                        {doubts?.map(el => {
                            return <Flex cursor={'pointer'} p={'5px'} _hover={{background : '#90ce5e', color : 'white'}}>
                                {el.question.length > 25 ? `${el.question.substring(0, 26)}...` : el.question}
                            </Flex>
                        })}
                    </Box>
                    <Flex minH={'100vh'} justifyContent={'flex-end'} flexDir={'column'} w={'80%'} p={'5px'}>
                        <Flex _focusVisible={'none'} fontSize={'20px'} alignItems={'center'} gap={'10px'}>
                            <Input placeholder='Type your message...' w={'95%'}/>
                            <BsSendFill/>
                        </Flex>
                    </Flex>
                </Flex>
            </Box>
        </Flex>
    )
}

export default Chats;