import {
    Box, Button, Flex, Heading, Image, Text,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Grid,
    useDisclosure,
    Progress,
} from '@chakra-ui/react';
import maths from '../Assets/Doubt/img2.jpg';
import chemistry from '../Assets/Doubt/img3.jpg';
import programming from '../Assets/Doubt/img4.jpg';
import biology from '../Assets/Doubt/biology.jpg';
import english from '../Assets/Doubt/english.jpg';
import geography from '../Assets/Doubt/geography.jpg';
import history from '../Assets/Doubt/history.jpg';
import React, { memo, useEffect } from 'react'
import Sidebar from '../Components/Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { deleteDoubt, getDoubts, updateDoubtResolved } from '../redux/doubtReducer/action';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import toast, { Toaster } from 'react-hot-toast';
import ModalPost from '../Components/ModalPost';

const Doubts = () => {
    const { doubts, isDeleted, errorMsg, isUpdated } = useSelector(store => store.doubtReducer);
    const dispatch = useDispatch();
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        dispatch(getDoubts());
    }, [])

    const handleDeleteDoubt = (id) => {
        dispatch(deleteDoubt(id));
    }

    const handleEditDoubt = (id) => {
        dispatch(updateDoubtResolved(id));
    }

    useEffect(() => {
        if (isDeleted) {
            toast.success(isDeleted);
        }
        else if (isUpdated) {
            toast.success(isUpdated);
        }
        else if (errorMsg) {
            toast.error(errorMsg);
        }

        dispatch(getDoubts());
    }, [isDeleted, errorMsg, isUpdated])

    return (
        <Flex>
            <Sidebar />
            <Box w={'90%'} p={'0 20px 30px 10px'} position={'absolute'} right={'0px'}>
                <Toaster toastOptions={{ duration: 3000 }} />
                <ModalPost isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
                <Flex position={'sticky'} top={'0px'} zIndex={'overlay'} p={'7px 0'} justifyContent={'space-between'} alignItems={'center'}>
                    <Heading color={'gray.600'} fontSize={'20px'} m={'10px 0 20px 0'}>MY DOUBTS</Heading>
                    <Button onClick={onOpen} _hover={{ opacity: '0.8' }} h={'33px'} bg={'#90ca5e'} color={'white'}>+ Post Doubt</Button>
                </Flex>
                {doubts.length > 0 ? <Grid templateColumns={'repeat(2, 1fr)'} gap={'15px'} >
                    {doubts?.map(el => {
                        return <Flex gap={'15px'} key={el._id} bg={'#f0f0f0'} p={'10px'} borderRadius={'8px'}>
                            <Image borderRadius={'8px'} h={'120px'} w={'30%'} src={el.subject === 'computer science' ? programming : el.subject === 'biology' ? biology : el.subject === 'mathematics' ? maths : el.subject === 'chemistry' ? chemistry : el.subject === 'english' ? english : el.subject === 'geography' ? geography : history} />
                            <Box w={'70%'}>
                                <Flex w={'100%'} justifyContent={'space-between'} alignItems={'center'}>
                                    <Heading size={'md'}>{el.question?.substring(0, 22)} ...</Heading>
                                    <Menu>
                                        <MenuButton _hover={'none'} _active={'none'} as={Button}>
                                            <BiDotsVerticalRounded size={'20px'} cursor={'pointer'} />
                                        </MenuButton>
                                        <MenuList>
                                            <MenuItem onClick={() => handleEditDoubt(el._id)}>{el.isResolved ? 'Mark as Unresolved' : 'Mark as Resolved'}</MenuItem>
                                            <MenuItem onClick={() => handleDeleteDoubt(el._id)} color={'red.500'}>Delete</MenuItem>
                                        </MenuList>
                                    </Menu>
                                </Flex>
                                <Text fontSize={'14px'} mt={'10px'} color={el.isResolved ? 'green.500' : 'gray.500'} fontWeight={el.isResolved ? 'bold' : '500'}>Status : {el.isResolved ? 'Resolved' : 'Unresolved'}</Text>
                                <Progress mt={'4px'} colorScheme={el.isResolved ? 'green' : 'yellow'} bg={'gray.200'} size='md' value={el.isResolved ? 100 : 10} />
                                <Text color={'gray.600'} mt={'14px'} fontSize={'14px'} fontWeight={'500'}>{el.subject.toUpperCase()}</Text>
                            </Box>
                        </Flex>
                    })}
                </Grid>
                    : <Grid minH={'80vh'} placeItems={'center'} textAlign={'center'}>
                        <Box>
                            <Heading size={'md'} textTransform={'uppercase'}>Post your first doubt</Heading>
                            <Button mt={'10px'} onClick={onOpen} h={'32px'} bg={'#90ca5e'} p={'18px 32px'} color={'white'} borderRadius={'23px'} _hover={{ opacity: '0.8' }} _active={'none'}>+ Post Doubt</Button>
                        </Box>
                    </Grid>
                }
            </Box>
        </Flex>
    )
}

export default memo(Doubts);