import {
    Avatar, Box, Button, Flex, Grid, Heading, Image, Text,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    useDisclosure,
    Progress,
} from '@chakra-ui/react';
import React, { memo, useContext, useEffect } from 'react';
import img1 from '../Assets/Doubt/img1.avif';
import maths from '../Assets/Doubt/img2.jpg';
import chemistry from '../Assets/Doubt/img3.jpg';
import programming from '../Assets/Doubt/img4.jpg';
import biology from '../Assets/Doubt/biology.jpg';
import english from '../Assets/Doubt/english.jpg';
import geography from '../Assets/Doubt/geography.jpg';
import history from '../Assets/Doubt/history.jpg';
import { SiJavascript } from 'react-icons/si';
import { AiFillCheckCircle, AiFillStar } from 'react-icons/ai';
import { TbGeometry } from 'react-icons/tb';
import { SlChemistry } from 'react-icons/sl';
import { FaLightbulb, FaPython, FaUsers } from 'react-icons/fa';
import { BsGraphUp, BsStars } from 'react-icons/bs';
import Sidebar from '../Components/Sidebar';
import { HiComputerDesktop } from 'react-icons/hi2';
import { MdOutlineHistoryEdu } from 'react-icons/md'
import { GiSandSnake } from 'react-icons/gi';
import { useDispatch, useSelector } from 'react-redux';
import { deleteDoubt, getDoubts, updateDoubtResolved } from '../redux/doubtReducer/action';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import ModalPost from '../Components/ModalPost';
import toast, { Toaster } from 'react-hot-toast';

const Dashboard = () => {
    const dispatch = useDispatch();
    const { doubts, isDeleted, errorMsg, isUpdated } = useSelector(store => store.doubtReducer);
    const navigate = useNavigate();
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
            <Box w={'90%'} position={'absolute'} right={'0px'}>
                <Toaster toastOptions={{ duration: 3000 }} />
                <ModalPost isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
                <Flex position={'sticky'} top={'0px'} zIndex={'overlay'} bg={'white'} p={'7px 1px'} w={'95%'} m={'8px 0 8px 30px'} pr={'5px'} fontSize={'23px'} justifyContent={'space-between'} alignItems={'center'}>
                    <Heading fontSize={'23px'}>Frequently Asked</Heading>
                    <Button onClick={onOpen} _hover={{ opacity: '0.8' }} h={'33px'} bg={'#90ca5e'} color={'white'}>+ Post Doubt</Button>
                </Flex>
                <Flex gap={'10px'} justifyContent={'center'}>
                    <Box position={'relative'} w={'23%'} _hover={{ outline: '1px solid #CBD5E0' }} bg={'#f0f0f0'} p={'8px'} borderRadius={'8px'}>
                        <Image h={'120px'} w={'100%'} borderRadius={'10px'} src={img1} />
                        <Flex position={'absolute'} left={'6.5px'} bottom={'34%'} alignItems={'center'} gap={'5px'} w={'60%'} bg={'#c7eaa8'} fontSize={'25px'} p={'6px 8px'} borderRadius={'12px'}>
                            <SiJavascript style={{ borderRadius: '50%' }} />
                            <Text fontWeight={'500'} fontSize={'16px'}>JavaScript</Text>
                        </Flex>
                        <Text textAlign={'center'} mt={'20px'} fontWeight={'500'} fontSize={'14px'}>Object Oriented Programming</Text>
                        <Flex justifyContent={'space-around'} mt={'8px'} mb={'15px'}>
                            <Flex color={'green.500'} alignItems={'center'} gap={'2px'}>
                                <AiFillCheckCircle style={{ marginTop: '1px' }} />
                                <Text fontWeight={'500'} fontSize={'14px'}>Solved</Text>
                            </Flex>
                            <Flex alignItems={'center'} gap={'2px'}>
                                <AiFillStar />
                                <Text fontSize={'14px'} fontWeight={'500'}>4.7/5</Text>
                            </Flex>
                        </Flex>
                    </Box>
                    <Box position={'relative'} w={'23%'} _hover={{ outline: '1px solid #CBD5E0' }} bg={'#f0f0f0'} p={'8px'} borderRadius={'8px'}>
                        <Image h={'120px'} w={'100%'} borderRadius={'10px'} src={maths} />
                        <Flex position={'absolute'} left={'6.5px'} bottom={'34%'} alignItems={'center'} gap={'5px'} w={'60%'} bg={'#c7eaa8'} fontSize={'25px'} p={'6px 8px'} borderRadius={'12px'}>
                            <TbGeometry style={{ borderRadius: '50%', background: 'black', color: '#c7eaa8', padding: '3px' }} />
                            <Text fontWeight={'500'} fontSize={'16px'}>Mathematics</Text>
                        </Flex>
                        <Text textAlign={'center'} mt={'20px'} fontWeight={'500'} fontSize={'14px'}>Geometry</Text>
                        <Flex justifyContent={'space-around'} mt={'8px'} mb={'15px'}>
                            <Flex color={'green.500'} alignItems={'center'} gap={'2px'}>
                                <AiFillCheckCircle style={{ marginTop: '1px' }} />
                                <Text fontWeight={'500'} fontSize={'14px'}>Solved</Text>
                            </Flex>
                            <Flex alignItems={'center'} gap={'2px'}>
                                <AiFillStar />
                                <Text fontSize={'14px'} fontWeight={'500'}>4.5/5</Text>
                            </Flex>
                        </Flex>
                    </Box>
                    <Box position={'relative'} w={'23%'} _hover={{ outline: '1px solid #CBD5E0' }} bg={'#f0f0f0'} p={'8px'} borderRadius={'8px'}>
                        <Image h={'120px'} w={'100%'} borderRadius={'10px'} src={chemistry} />
                        <Flex position={'absolute'} left={'6.5px'} bottom={'34%'} alignItems={'center'} gap={'5px'} w={'60%'} bg={'#c7eaa8'} fontSize={'25px'} p={'6px 8px'} borderRadius={'12px'}>
                            <SlChemistry style={{ borderRadius: '50%', background: 'black', color: '#c7eaa8', padding: '3px' }} />
                            <Text fontWeight={'500'} fontSize={'16px'}>Chemistry</Text>
                        </Flex>
                        <Text textAlign={'center'} mt={'20px'} fontWeight={'500'} fontSize={'14px'}>P-Block Elements</Text>
                        <Flex justifyContent={'space-around'} mt={'8px'} mb={'15px'}>
                            <Flex color={'green.500'} alignItems={'center'} gap={'2px'}>
                                <AiFillCheckCircle style={{ marginTop: '1px' }} />
                                <Text fontWeight={'500'} fontSize={'14px'}>Solved</Text>
                            </Flex>
                            <Flex alignItems={'center'} gap={'2px'}>
                                <AiFillStar />
                                <Text fontSize={'14px'} fontWeight={'500'}>4.6/5</Text>
                            </Flex>
                        </Flex>
                    </Box>
                    <Box position={'relative'} w={'23%'} _hover={{ outline: '1px solid #CBD5E0' }} bg={'#f0f0f0'} p={'8px'} borderRadius={'8px'}>
                        <Image h={'120px'} w={'100%'} borderRadius={'10px'} src={programming} />
                        <Flex position={'absolute'} left={'6.5px'} bottom={'34%'} alignItems={'center'} gap={'5px'} w={'60%'} bg={'#c7eaa8'} fontSize={'25px'} p={'6px 8px'} borderRadius={'12px'}>
                            <FaPython style={{ borderRadius: '50%', background: 'black', color: '#c7eaa8', padding: '3px' }} />
                            <Text fontWeight={'500'} fontSize={'16px'}>Python</Text>
                        </Flex>
                        <Text textAlign={'center'} mt={'20px'} fontWeight={'500'} fontSize={'14px'}>Working with Classes</Text>
                        <Flex justifyContent={'space-around'} mt={'8px'} mb={'15px'}>
                            <Flex color={'green.500'} alignItems={'center'} gap={'2px'}>
                                <AiFillCheckCircle style={{ marginTop: '1px' }} />
                                <Text fontWeight={'500'} fontSize={'14px'}>Solved</Text>
                            </Flex>
                            <Flex alignItems={'center'} gap={'2px'}>
                                <AiFillStar />
                                <Text fontSize={'14px'} fontWeight={'500'}>4.9/5</Text>
                            </Flex>
                        </Flex>
                    </Box>
                </Flex>
                <Heading m={'30px 0 10px 30px'} fontSize={'23px'}>Subjects</Heading>
                <Flex p={'0 30px'} className='subjects' mt={'20px'} w={'100%'} justifyContent={'space-between'} gap={'10px'}>
                    <Box fontWeight={'bold'} border={'2px solid #EDF2F7'} p={'11px 20px'} borderRadius={'17px'} display={'grid'} placeItems={'center'}>
                        <BsGraphUp style={{ fontWeight: 'bolder' }} />
                        <Text mt={'4px'} fontSize={'13px'} fontWeight={'500'}>Mathematics</Text>
                    </Box>
                    <Box fontWeight={'bold'} border={'2px solid #EDF2F7'} p={'11px 20px'} borderRadius={'17px'} display={'grid'} placeItems={'center'}>
                        <FaUsers style={{ fontWeight: 'bold' }} />
                        <Text mt={'4px'} fontSize={'13px'} fontWeight={'500'}>Chemistry</Text>
                    </Box>
                    <Box fontWeight={'bold'} border={'2px solid #EDF2F7'} p={'11px 20px'} borderRadius={'17px'} display={'grid'} placeItems={'center'}>
                        <GiSandSnake style={{ fontWeight: 'bold' }} />
                        <Text mt={'4px'} fontSize={'13px'} fontWeight={'500'}>Biology</Text>
                    </Box>
                    <Box fontWeight={'bold'} border={'2px solid #EDF2F7'} p={'11px 20px'} borderRadius={'17px'} display={'grid'} placeItems={'center'}>
                        <HiComputerDesktop style={{ fontWeight: 'bold' }} />
                        <Text mt={'4px'} fontSize={'13px'} fontWeight={'500'}>Computer Science</Text>
                    </Box>
                    <Box fontWeight={'bold'} border={'2px solid #EDF2F7'} p={'11px 20px'} borderRadius={'17px'} display={'grid'} placeItems={'center'}>
                        <MdOutlineHistoryEdu style={{ fontWeight: 'bold' }} />
                        <Text mt={'4px'} fontSize={'13px'} fontWeight={'500'}>History</Text>
                    </Box>
                    <Box fontWeight={'bold'} border={'2px solid #EDF2F7'} p={'11px 20px'} borderRadius={'17px'} display={'grid'} placeItems={'center'}>
                        <FaLightbulb style={{ fontWeight: 'bold' }} />
                        <Text mt={'4px'} fontSize={'13px'} fontWeight={'500'}>Geography</Text>
                    </Box>
                    <Box fontWeight={'bold'} border={'2px solid #EDF2F7'} p={'11px 20px'} borderRadius={'17px'} display={'grid'} placeItems={'center'}>
                        <BsStars style={{ fontWeight: 'bold' }} />
                        <Text mt={'4px'} fontSize={'13px'} fontWeight={'500'}>English</Text>
                    </Box>
                </Flex>
                <Heading m={'30px 0 10px 30px'} fontSize={'23px'}>My Doubts</Heading>
                {doubts.length > 0 ? <Flex w={'100%'} m={'20px 0'} gap={'10px'} p={'0 30px'} >
                    {doubts?.slice(0, 2)?.map(el => {
                        return <Flex gap={'15px'} w={'50%'} key={el._id} bg={'#f0f0f0'} p={'10px'} borderRadius={'8px'}>
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
                                <Text fontSize={'14px'} mt={'9px'} color={el.isResolved ? 'green.500' : 'gray.500'} fontWeight={el.isResolved ? 'bold' : '500'}>Status : {el.isResolved ? 'Resolved' : 'Unresolved'}</Text>
                                <Progress mt={'4px'} colorScheme={el.isResolved ? 'green' : 'yellow'} bg={'gray.200'} size='md' value={el.isResolved ? 100 : 10} />
                                <Text color={'gray.600'} mt={'17px'} fontSize={'14px'} fontWeight={'500'}>{el.subject.toUpperCase()}</Text>
                            </Box>
                        </Flex>
                    })}
                </Flex>
                    : <Grid placeItems={'center'} textAlign={'center'}>
                        <Box>
                            <Heading size={'sm'} textTransform={'uppercase'}>Post your first doubt</Heading>
                            <Button mt={'10px'} onClick={onOpen} h={'32px'} bg={'#90ca5e'} p={'18px 32px'} color={'white'} borderRadius={'23px'} _hover={{ opacity: '0.8' }} _active={'none'}>+ Post Doubt</Button>
                        </Box>
                    </Grid>
                }
                {doubts.length > 0 && <Box pb={'20px'} textAlign={'center'}>
                    <Button onClick={() => navigate('/doubts')} h={'32px'} bg={'#90ca5e'} p={'18px 32px'} color={'white'} borderRadius={'23px'} _hover={{ opacity: '0.8' }} _active={'none'}>View More</Button>
                </Box>}
            </Box>
        </Flex>
    )
}

export default memo(Dashboard);