const { Text } = require("@chakra-ui/react");
const { useEffect, useState } = require("react");


const TypingEffect = ({data}) => {
    const [temp, setTemp] = useState(0);
    const [tempText, setTempText] = useState('');
    const [hidden, setHidden] = useState(Array(data.length).fill('none'));
    const [typingIndex, setTypingIndex] = useState(0);

    useEffect(() => {
        let hideElement = setInterval(() => {
            if (temp == data?.length - 1) {
                setTemp(0);
            }
            else {
                setTemp(prev => prev + 1)
            }
        }, 5000)

        return () => clearInterval(hideElement);
    }, [temp])

    useEffect(() => {
        let newTemp = new Array(data?.length).fill('none');
        newTemp[temp] = 'block'
        setHidden(newTemp);

        setTypingIndex(0);
        setTempText('');
    }, [temp])

    useEffect(() => {
        if (typingIndex < data[temp].text?.length) {
            const timeout = setTimeout(() => {
                setTempText(prevText => prevText + data[temp].text[typingIndex]);
                setTypingIndex(prevIndex => prevIndex + 1);
            }, 15);

            return () => clearTimeout(timeout);
        }
    }, [temp, typingIndex])

    return <Text>{hidden[temp] && tempText}</Text>;
}

export default TypingEffect;