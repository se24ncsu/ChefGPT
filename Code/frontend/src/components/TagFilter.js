// TagFilter.js
import React from "react";
import { Button, Box, Wrap, WrapItem } from "@chakra-ui/react";

const TagFilter = ({ tags, filterRecipesByTag }) => {
    return (
        <Box my={4}>
            <Wrap spacing={2}>
                {tags.map((tag, index) => (
                    <WrapItem key={index}>
                        <Button
                            colorScheme="green"
                            size="sm"
                            borderRadius="full"
                            onClick={() => filterRecipesByTag(tag)}
                        >
                            {tag}
                        </Button>
                    </WrapItem>
                ))}
            </Wrap>
        </Box>
    );
};

export default TagFilter;
