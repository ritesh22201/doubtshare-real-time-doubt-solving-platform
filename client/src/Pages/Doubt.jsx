import { Avatar, Box, Flex, Heading, Image, Text } from '@chakra-ui/react';
import React from 'react';
import img1 from '../Assets/Doubt/img1.avif';
import img2 from '../Assets/Doubt/img2.jpg';
import img3 from '../Assets/Doubt/img3.jpg';
import img4 from '../Assets/Doubt/img4.jpg';
import { SiJavascript } from 'react-icons/si';
import { AiFillCheckCircle, AiFillStar } from 'react-icons/ai';
import { TbGeometry } from 'react-icons/tb';
import { SlChemistry } from 'react-icons/sl';
import { FaLightbulb, FaPython, FaUsers } from 'react-icons/fa';
import {BsGraphUp, BsStars} from 'react-icons/bs';
import Sidebar from '../Components/Sidebar';
import {HiComputerDesktop} from 'react-icons/hi2'; 
import {MdOutlineHistoryEdu} from 'react-icons/md'
import { GiSandSnake } from 'react-icons/gi';

const Doubt = () => {
    return (
        <Flex>
            <Sidebar/>
            <Box w={'90%'} position={'fixed'} right={'0px'}>
                <Heading m={'10px 0 10px 30px'} fontSize={'23px'}>Frequently Asked</Heading>
                <Flex gap={'10px'} justifyContent={'center'}>
                    <Box position={'relative'} w={'23%'} _hover={{outline : '1px solid #CBD5E0'}} bg={'#f0f0f0'} p={'8px'} borderRadius={'8px'}>
                        <Image h={'120px'} w={'100%'} borderRadius={'10px'} src={img1} />
                        <Flex position={'absolute'} left={'6.5px'} bottom={'76px'} alignItems={'center'} gap={'5px'} w={'60%'} bg={'#c7eaa8'} fontSize={'25px'} p={'6px 8px'} borderRadius={'12px'}>
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
                    <Box position={'relative'} w={'23%'} _hover={{outline : '1px solid #CBD5E0'}} bg={'#f0f0f0'} p={'8px'} borderRadius={'8px'}>
                        <Image h={'120px'} w={'100%'} borderRadius={'10px'} src={img2} />
                        <Flex position={'absolute'} left={'6.5px'} bottom={'76px'} alignItems={'center'} gap={'5px'} w={'60%'} bg={'#c7eaa8'} fontSize={'25px'} p={'6px 8px'} borderRadius={'12px'}>
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
                    <Box position={'relative'} w={'23%'} _hover={{outline : '1px solid #CBD5E0'}} bg={'#f0f0f0'} p={'8px'} borderRadius={'8px'}>
                        <Image h={'120px'} w={'100%'} borderRadius={'10px'} src={img3} />
                        <Flex position={'absolute'} left={'6.5px'} bottom={'76px'} alignItems={'center'} gap={'5px'} w={'60%'} bg={'#c7eaa8'} fontSize={'25px'} p={'6px 8px'} borderRadius={'12px'}>
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
                    <Box position={'relative'} w={'23%'} _hover={{outline : '1px solid #CBD5E0'}} bg={'#f0f0f0'} p={'8px'} borderRadius={'8px'}>
                        <Image h={'120px'} w={'100%'} borderRadius={'10px'} src={img4} />
                        <Flex position={'absolute'} left={'6.5px'} bottom={'76px'} alignItems={'center'} gap={'5px'} w={'60%'} bg={'#c7eaa8'} fontSize={'25px'} p={'6px 8px'} borderRadius={'12px'}>
                            <FaPython style={{ borderRadius: '50%', background: 'black', color: '#c7eaa8', padding: '3px' }} />
                            <Text fontWeight={'500'} fontSize={'16px'}>Python</Text>
                        </Flex>
                        <Text textAlign={'center'} mt={'20px'} fontWeight={'500'} fontSize={'14px'}>Working with classes</Text>
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
                        <BsGraphUp style={{fontWeight : 'bolder'}}/>
                        <Text mt={'4px'} fontSize={'13px'} fontWeight={'500'}>Mathematics</Text>
                    </Box>
                    <Box fontWeight={'bold'} border={'2px solid #EDF2F7'} p={'11px 20px'} borderRadius={'17px'} display={'grid'} placeItems={'center'}>
                        <FaUsers style={{fontWeight : 'bold'}}/>
                        <Text mt={'4px'} fontSize={'13px'} fontWeight={'500'}>Chemistry</Text>
                    </Box>
                    <Box fontWeight={'bold'} border={'2px solid #EDF2F7'} p={'11px 20px'} borderRadius={'17px'} display={'grid'} placeItems={'center'}>
                        <GiSandSnake style={{fontWeight : 'bold'}}/>
                        <Text mt={'4px'} fontSize={'13px'} fontWeight={'500'}>Biology</Text>
                    </Box>
                    <Box fontWeight={'bold'} border={'2px solid #EDF2F7'} p={'11px 20px'} borderRadius={'17px'} display={'grid'} placeItems={'center'}>
                        <HiComputerDesktop style={{fontWeight : 'bold'}}/>
                        <Text mt={'4px'} fontSize={'13px'} fontWeight={'500'}>Computer Science</Text>
                    </Box>
                    <Box fontWeight={'bold'} border={'2px solid #EDF2F7'} p={'11px 20px'} borderRadius={'17px'} display={'grid'} placeItems={'center'}>
                        <MdOutlineHistoryEdu style={{fontWeight : 'bold'}}/>
                        <Text mt={'4px'} fontSize={'13px'} fontWeight={'500'}>History</Text>
                    </Box>
                    <Box fontWeight={'bold'} border={'2px solid #EDF2F7'} p={'11px 20px'} borderRadius={'17px'} display={'grid'} placeItems={'center'}>
                        <FaLightbulb style={{fontWeight : 'bold'}}/>
                        <Text mt={'4px'} fontSize={'13px'} fontWeight={'500'}>Geography</Text>
                    </Box>
                    <Box fontWeight={'bold'} border={'2px solid #EDF2F7'} p={'11px 20px'} borderRadius={'17px'} display={'grid'} placeItems={'center'}>
                        <BsStars style={{fontWeight : 'bold'}}/>
                        <Text mt={'4px'} fontSize={'13px'} fontWeight={'500'}>English</Text>
                    </Box>
                </Flex>
            </Box>
        </Flex>
    )
}

export default Doubt;