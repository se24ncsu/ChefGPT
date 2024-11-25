import React from 'react';
import { Box, useColorModeValue } from '@chakra-ui/react';

const Tag = (props) => {
    const bgColor = useColorModeValue('#eee', '#333');
    const selectedBgColor = useColorModeValue('#ccc', '#555');

    return (
        <Box
            padding={1}
            background={props.selected ? selectedBgColor : bgColor}
            fontSize="12px"
            margin={1}
            borderRadius="5px"
        >
            {props.children}
        </Box>
    );
}

export default Tag;