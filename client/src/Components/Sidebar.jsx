import React, { useEffect } from 'react';
import {
    VStack, Avatar, Box, Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button,
} from '@chakra-ui/react';
import { PiDotsSixBold } from 'react-icons/pi';
import { CgNotes } from 'react-icons/cg';
import { FaMizuni, FaXmark } from 'react-icons/fa6';
import { RxDragHandleDots2 } from 'react-icons/rx';
import { FiLogOut, FiSettings } from 'react-icons/fi';
import { AiOutlineFileSearch, AiOutlineQuestionCircle } from 'react-icons/ai';
import { RiChatSmile2Line } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { MdDashboard } from 'react-icons/md';
import { FaLightbulb, FaUser } from 'react-icons/fa';
import { BiSolidUser } from 'react-icons/bi';
import { ImProfile } from 'react-icons/im';
import { useDispatch, useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import { getSingleUser, logout } from '../redux/authReducer/action';

const Sidebar = () => {
    const navigate = useNavigate();
    const data = JSON.parse(localStorage.getItem('login-token')) || {};
    const dispatch = useDispatch();
    const { logoutMsg, user } = useSelector(store => store.authReducer);

    const name1 = data?.email?.slice(0, 2);

    const handleLogout = () => {
        dispatch(logout(data.email));
    }

    useEffect(() => {
        dispatch(getSingleUser({ email: data?.email }));
    }, [])

    useEffect(() => {
        dispatch(getSingleUser({ email: data?.email }));
    }, [user])

    useEffect(() => {
        if (logoutMsg) {
            toast.success(logoutMsg);
            setTimeout(() => {
                window.location.reload();
            }, 3000)
        }
    }, [logoutMsg])

    return (
        <section>
            <Toaster toastOptions={{ duration: 3000 }} />
            <VStack className='sidebar' display={{ base: 'none', sm: 'none', md: 'flex', lg: 'flex', xl: 'flex', '2xl': 'flex' }} position={'fixed'} zIndex={'overlay'} left={'0'} p={'10px 0'} justifyContent={'space-between'} h={'100vh'} fontSize={'20px'} bg={'#171717'} w={'8%'} alignItems={'center'} color={'gray.200'}>
                <VStack gap={'30px'}>
                    <MdDashboard onClick={() => navigate('/dashboard')} className={window.location.pathname === '/dashboard' && 'navigate'} />
                    <FaLightbulb onClick={() => navigate('/doubts')} className={window.location.pathname === '/doubts' && 'navigate'} />
                    <RiChatSmile2Line onClick={() => navigate('/chats')} className={window.location.pathname === '/chats' && 'navigate'} />
                    <BiSolidUser onClick={() => navigate('/profile')} className={window.location.pathname === '/profile' && 'navigate'} />
                </VStack>
                <AiOutlineQuestionCircle style={{ marginTop: '270px', fontSize: '22px' }} />
                {data.email && <Menu>
                    <MenuButton as={Button} _hover={'none'} bg={'#171717'} _active={'none'}>
                        <Avatar cursor={'pointer'} bg='#90ce5e' color={'white'} size={'sm'} name={user?.name ? user?.name : name1.toUpperCase().split('').join(' ')} />
                    </MenuButton>
                    <MenuList color={'gray.600'}>
                        <MenuItem fontSize={'15px'}><FaUser /> <span style={{ marginLeft: '8px' }}>{user.name || 'DoubtCleared User'}</span></MenuItem>
                        <MenuItem onClick={() => navigate('/profile')} fontSize={'15px'}><ImProfile /> <span style={{ marginLeft: '8px' }}>Profile</span></MenuItem>
                        <MenuItem onClick={handleLogout} fontSize={'15px'}><FiLogOut /> <span style={{ marginLeft: '8px' }}>Logout</span></MenuItem>
                    </MenuList>
                </Menu>}
            </VStack>
        </section>
    )
}

export default Sidebar;