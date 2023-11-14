import { Box, Button, Divider, Flex, Grid, Heading, Select, Text, Textarea } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { AiFillCheckCircle } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { getDoubts, postDoubt } from '../redux/doubtReducer/action';
import toast, { Toaster } from 'react-hot-toast';

const ModalPost = ({ isOpen, onClose, onOpen }) => {
  const [langVal, setLangVal] = useState('');
  const [subject, setSubject] = useState('');
  const [question, setQuestion] = useState('');
  const [langId, setLangId] = useState(null);
  const { isLoading, isAdded } = useSelector(store => store.doubtReducer);
  const dispatch = useDispatch();

  const languages = [
    { id: 1, language: 'hindi' },
    { id: 2, language: 'english' },
    { id: 3, language: 'tamil' },
    { id: 4, language: 'kannada' },
    { id: 5, language: 'telugu' },
    { id: 6, language: 'malayalam' },
    { id: 7, language: 'marathi' },
    { id: 8, language: 'bengali' },
    { id: 9, language: 'gujrati' },
    { id: 10, language: 'punjabi' }
  ]

  const handleGrades = (ind, language) => {
    let gradeValues = langId === ind ? null : ind;
    setLangId(gradeValues);
    setLangVal(language);
  }

  const handlePostDoubt = (e) => {
    e.preventDefault();
    dispatch(postDoubt({ subject, question, language: langVal }));
    
    setTimeout(() => {
      !isLoading && onClose();
    }, 2000)
  }

  useEffect(() => {
    if (isAdded) {
      toast.success(isAdded);
      setLangVal('');
      setSubject('');
      setQuestion('');
    }

    dispatch(getDoubts());
  }, [isAdded])

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size={'3xl'}>
        <Toaster toastOptions={{ duration: 3000 }} />
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color={'#90ce5e'} fontWeight={'bold'}>Add Doubt Details</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handlePostDoubt}>
            <ModalBody minH={'50vh'}>
              <Flex gap={'10px'}>
                <Box w={'49%'}>
                  <Heading m={'-10px 0 8px 0'} color={'gray.600'} fontSize={'15px'}>CHOOSE SUBJECT</Heading>
                  <Select fontWeight={'500'} value={subject} onChange={(e) => setSubject(e.target.value)}>
                    <option value="">Select Subject</option>
                    <option value="mathematics">Mathematics</option>
                    <option value="chemistry">Chemistry</option>
                    <option value="biology">Biology</option>
                    <option value="computer science">Computer Science</option>
                    <option value="history">History</option>
                    <option value="geography">Geography</option>
                    <option value="english">English</option>
                  </Select>
                  <Flex justifyContent={'space-between'} alignItems={'center'}>
                    <Heading m={'20px 0 8px 0'} color={'gray.600'} fontSize={'15px'}>CHOOSE LANGUAGE</Heading>
                    {langVal && <Flex fontWeight={'500'} alignItems={'center'} gap={'5px'}>
                      <AiFillCheckCircle style={{ color: '#79e91c', fontSize: '20px' }} />
                      <Text>{langVal.charAt(0).toUpperCase() + langVal.slice(1)} Selected</Text>
                    </Flex>}
                  </Flex>
                  <Grid gridTemplateColumns={'repeat(3, 1fr)'} w={'100%'} gap={'10px'} m={'0 auto'}>
                    {languages.map((el, i) => {
                      return <Button
                        onClick={() => handleGrades(i, el.language)}
                        variant={'outline'}
                        fontWeight={'bold'}
                        color={langId === i && langVal ? '#90ca5e' : 'black'}
                        outline={langId === i && langVal ? '2px solid #90ca5e' : '1px solid black'}
                        key={el.id}>
                        {el.language === 'hindi' ? 'हिंदी' : el.language === 'english' ? 'English' : el.language === 'tamil' ? 'தமிழ்' : el.language === 'telugu' ? 'తెలుగు' : el.language === 'kannada' ? 'ಕನ್ನಡ' : el.language === 'bengali' ? 'বাংলা' : el.language === 'marathi' ? 'मराठी' : el.language === 'gujrati' ? 'ગુજરાતી' : el.language === 'malayalam' ? 'മലയാളം' : 'ਪੰਜਾਬੀ'}
                      </Button>
                    })}
                  </Grid>
                </Box>
                <Box w={'1px'}>
                  <Divider orientation='vertical' />
                </Box>
                <Box w={'49%'}>
                  <Heading mt={'-11px'} mb={'8px'} color={'gray.600'} fontSize={'15px'}>ASK YOUR QUESTION</Heading>
                  <Textarea value={question} onChange={(e) => setQuestion(e.target.value)} minH={'40vh'} placeholder='Type your question here ...' />
                </Box>
              </Flex>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={onClose}>
                Close
              </Button>
              <Button type='submit' isLoading={isLoading} loadingText={'Posting...'} p={'0 30px'} bg={'#90ce5e'} color={'white'} _hover={{ opacity: '0.8' }}>Post Doubt</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ModalPost;