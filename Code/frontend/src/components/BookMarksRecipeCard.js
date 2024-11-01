/* MIT License

Copyright (c) 2023 Pannaga Rao, Harshitha, Prathima, Karthik  */

import React from "react";
import RecipeImage from "./RecipeImage";
import { Card, CardHeader, Heading, Text, CardBody, CardFooter, Button, Image, Tag } from "@chakra-ui/react"

const BookMarksRecipeCard = (props) => {
    const handleClick = () => {
        props.handler(props.recipe);
    }

    return (
        <>
            <Card onClick={handleClick} data-testid="recipeCard" _hover={{ transform: "scale(1.05)", bg: "green.300", transitionDuration: "4", cursor: "pointer" }}>
                <CardHeader>
                    <Heading data-testid="recipeName" size='md'>{props.recipe.recipeName}</Heading>
                </CardHeader>
                <CardBody>
                    <RecipeImage name={props.recipe.recipeName} height={300} width={200} />
                </CardBody>
            </Card>
        </>
    )
}

export default BookMarksRecipeCard;