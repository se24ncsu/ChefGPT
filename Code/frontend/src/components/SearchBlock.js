/* istanbul ignore file */
import { useEffect, useRef, useState } from "react";
import SearchBar from "./SearchBar";
import axios from 'axios';
import RecipeImage from "./RecipeImage";
import { LuClock4 } from "react-icons/lu";
import './css/misc.css';
import Tag from "./Tag";
import jsPDF from 'jspdf';
import { Oval } from "react-loader-spinner";
import { bookmarkRecipe, unbookmarkRecipe, isRecipeBookmarked, addToCartDB, saveRecipe, fetchUserRecipes, fetchDetailedRecipe, saveDetailedRecipe} from '../service/firestoreService';
import { useAuth } from "../contexts/authContext/index";
import { CiBookmark, CiBookmarkCheck } from "react-icons/ci";
import { useColorModeValue } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';
import RecipeVideo from './video';
import React from 'react';


const SearchBlock = (props) => {

    const [searchName, setSearchName] = useState('');
    const [searchIngredients, setSearchIngredients] = useState([]);
    const [items, setItems] = useState([]);
    const currentPage = useRef(1);
    const [loading, setLoading] = useState(false);
    const [showingDetailed, setShowingDetailed] = useState(-1);
    const [detailedItem, setDetailedItem] = useState(null);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const { userLoggedIn } = useAuth();
    const [tags, setTags] = useState([]);
    const [filteredTags, setFilteredTags] = useState([]);
    const bgColor = useColorModeValue('gray.100', 'gray.700');
    const textColor = useColorModeValue('gray.800', 'gray.100');
    const stepBgColor = useColorModeValue('gray.200', 'gray.600');
    const stepNumberBgColor = useColorModeValue('gray.300', 'gray.500');

    const [speechSynthesisActive, setSpeechSynthesisActive] = useState(false);

    const startVoiceOver = () => {
        if (!detailedItem || !detailedItem.process) return;
    
        // Stop any ongoing speech
        if (speechSynthesis.speaking) {
            speechSynthesis.cancel();
        }
    
        const steps = detailedItem.process.map((step, index) =>
            `Step ${index + 1}: ${step.replace(/[0-9]*\./, '')}`
        );
    
        let currentStep = 0;
    
        const speakStep = () => {
            if (currentStep >= steps.length) {
                setSpeechSynthesisActive(false);
                return;
            }
    
            const utterance = new SpeechSynthesisUtterance(steps[currentStep]);
            utterance.lang = 'en-US';
            utterance.rate = 0.7; // Adjust the rate of speech (1 is normal speed)
            utterance.pitch = 1.0; // Adjusted pitch to be more natural
            utterance.onend = () => {
                currentStep++;
                setTimeout(speakStep, 4000); // 4-second delay before the next step
            };
    
            setSpeechSynthesisActive(true);
            speechSynthesis.speak(utterance);
        };
    
        speakStep();
    };

    const stopVoiceOver = () => {
        if (speechSynthesis.speaking) {
            speechSynthesis.cancel();
            setSpeechSynthesisActive(false);
        }
    };

    const onChange = (query) => {
        if (searchIngredients.length === 0) {
            setSearchName(query);
        }
    };

    const onIngredientAdded = (added, all) => {
        setSearchIngredients([...all]);
    };

    const onRemoveIngredient = (index) => {
        searchIngredients.splice(index, 1);
        setSearchIngredients([...searchIngredients]);
        if (searchIngredients.length === 0) {
            setItems([]);
        }
    }

    const searchRecipes = async (page = 0) => {
        if (searchIngredients.length === 0 && searchName === '') return;

        currentPage.current = page;
        setLoading(true);

        // Either search by ingredients or by name
        if (searchIngredients.length > 0) {
            const ingredients = searchIngredients.map(i => i.toLowerCase());
            const data = {
                ingredients: searchIngredients.toString(),
                page
            };

            // Check Firestore for existing recipes
            if (ingredients.length === 1) {
                const existingRecipes = await fetchUserRecipes(searchIngredients);
                console.log("existingRecipes", existingRecipes);
                const filteredRecipes = existingRecipes.filter(recipe => 
                    searchIngredients.every(ingredient => 
                        recipe.ingredients.some(recipeIngredient => 
                            recipeIngredient.toLowerCase().includes(ingredient.toLowerCase())
                        )
                    )
                );
                console.log("existingRecipes", existingRecipes);
                console.log("filteredRecipes", filteredRecipes);
                if (filteredRecipes.length > 0) {
                    console.log("Fetched recipes from Firestore:", filteredRecipes);
                    setItems([...(page === 0 ? [] : items), ...filteredRecipes]);
                    setTags(Array.from(new Set([...(page === 0 ? [] : items.map(i => i.tags)), ...filteredRecipes.map(i => i.tags)].flat())));
                } 
            }
            console.log("Fetching recipes from API:", searchIngredients);
            const response = await axios.post(process.env.REACT_APP_GET_RECIPES_FROM_INGREDIENTS_URL, data);
            const recipes = response.data.recipes;
            setItems([...(page === 0 ? [] : items), ...recipes]);
            setTags(Array.from(new Set([...(page === 0 ? [] : items.map(i => i.tags)), ...recipes.map(i => i.tags)].flat())));
            if (ingredients.length === 1){
                recipes.forEach(recipe => saveRecipe(recipe));
            }

        } else {
            const data = {
                name: searchName,
                page
            };
            const existingRecipes = await fetchUserRecipes([searchName]);
            const filteredRecipes = existingRecipes.filter(recipe => 
                recipe.name.toLowerCase().includes(searchName.toLowerCase())
            );

            if (filteredRecipes.length > 0) {
                setItems([...(page === 0 ? [] : items), ...filteredRecipes]);
                setTags(Array.from(new Set([...(page === 0 ? [] : items.map(i => i.tags)), ...filteredRecipes.map(i => i.tags)].flat())));
            } else {
                const response = await axios.post(process.env.REACT_APP_GET_RECIPES_BY_NAME_URL, data);
                const recipes = response.data.recipes;
                setItems([...(page === 0 ? [] : items), ...recipes]);
                setTags(Array.from(new Set([...(page === 0 ? [] : items.map(i => i.tags)), ...recipes.map(i => i.tags)].flat())));
                // Save recipes to Firestore
                recipes.forEach(recipe => saveRecipe(recipe));
            }
        }
        setLoading(false);
        setShowingDetailed(-1);
    }

    useEffect(() => { searchRecipes() }, [searchName, searchIngredients]);

    useEffect(() => {
        const checkBookmarkStatus = async () => {
            if (detailedItem?.name) {
                const status = await isRecipeBookmarked(detailedItem.name);
                setIsBookmarked(status);
            }
        };

        if (detailedItem) {
            checkBookmarkStatus();
        }
    }, [detailedItem]);

    const loadMore = () => {
        if (loading) return;
        currentPage.current = currentPage.current + 1;
        searchRecipes(currentPage.current);
    }

    const showDetailedRecipe = async (index) => {
        setShowingDetailed(index);
        setDetailedItem(undefined);
        const recipeName = items[index].name;

        // Check Firestore for existing detailed recipe
        const savedRecipe = await fetchDetailedRecipe(recipeName);
        
        if (savedRecipe) {
            console.log("Fetched detailed recipe from Firestore:", savedRecipe);
            setDetailedItem(savedRecipe);
        } else {
            console.log("Fetching detailed recipe from API:", recipeName);
            const data = {
                name: recipeName,
                ingredients: items[index].ingredients,
            };
            const response = await axios.post(process.env.REACT_APP_GET_DETAILED_RECIPE_URL, data);
            const allIngredients = response.data.ingredients.map(ingredient => ingredient.trim());
            response.data.ingredients = allIngredients;
            setDetailedItem(response.data);
            // Save detailed recipe to Firestore
            await saveDetailedRecipe(response.data);
        }
    }

    const handleBookmark = async () => {
        if (isBookmarked) {
            await unbookmarkRecipe(detailedItem.name);
            setIsBookmarked(false);
        } else {
            await bookmarkRecipe(detailedItem);
            setIsBookmarked(true);
        }
    };

    const generatePDF = () => {
        const recipeName = detailedItem.name;
        const ingredients = detailedItem.ingredients;
        const doc = new jsPDF();
        doc.setFontSize(16);
        doc.text("Shopping List", 20, 20);

        doc.setFontSize(14);
        doc.text(`Recipe: ${recipeName}`, 20, 40);

        doc.setFontSize(12);
        let yOffset = 50;
        console.log("inside generating pdf:" + ingredients);
        ingredients.forEach((ingredient, index) => {
            doc.text(`${index + 1}. ${ingredient}`, 20, yOffset);
            yOffset += 10;
        });

        doc.save(`${recipeName}-shopping-list.pdf`);
    };

    const addTagToFilter = (tag) => {
        if (filteredTags.includes(tag)) {
            setFilteredTags(filteredTags.filter(i => i !== tag));
        }
        else {
            setFilteredTags([...filteredTags, tag]);
        }
    };
    
    const addToCart = async (detailedItem) => {
        await addToCartDB(detailedItem);
        // Example implementation for handling "Add to Cart"
        console.log("Adding to cart:", detailedItem);
        // Replace this with the actual functionality, e.g., updating cart state or making an API call
        alert("Shopping list added to your cart!");
    };

    return (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <SearchBar onChange={onChange} onIngredientAdded={onIngredientAdded} />
            <div style={{ display: 'flex' }}>
                {searchIngredients.map((ing, i) =>
                    <div key={i} className="hover_pointer" onClick={() => onRemoveIngredient(i)}><Tag>{ing}</Tag></div>
                )}
            </div>
            {showingDetailed === -1 &&
                (
                    ((items.length === 0 && loading) &&
                        <div style={{ height: 400, display: 'flex', alignItems: 'center' }}><Oval /></div>
                    ) ||
                    ((items.length > 0) &&
                        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', width: '70%', marginTop: 20 }}>

                            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                {tags.map((tag, i) =>
                                    <div key={i} className="hover_pointer" onClick={() => addTagToFilter(tag)}>
                                        <Tag selected={filteredTags.includes(tag)}>{tag}</Tag>
                                    </div>
                                )}
                            </div>

                            <div style={{ marginTop: 30, minHeight: 100, display: 'flex', flexWrap: "wrap", justifyContent: 'center', gap: 10 }}>
                                {
                                    items.map((item, index) => {
                                        return <div onClick={() => showDetailedRecipe(index)} key={index} className="hover_pointer" style={{
                                            display: (filteredTags.length > 0 && !item.tags.some(i => filteredTags.includes(i))) ? 'none' : 'flex',
                                            flexDirection: 'column', padding: 5, background: '#7771', borderRadius: 10
                                        }}>
                                            <div style={{ borderRadius: 10, overflow: 'hidden' }}>
                                                <RecipeImage name={item.name} height={300} width={200} />
                                            </div>
                                            <div style={{ padding: 10, maxWidth: 200, display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'space-between' }}>
                                                <div>{item.name}</div>
                                                <div style={{ marginTop: 10, display: 'flex', flexWrap: 'wrap' }}>
                                                    {item.tags.map((t, i) => <Tag key={i}>{t}</Tag>)}
                                                </div>
                                                <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', columnGap: 4 }}>
                                                    <LuClock4 size={14} />
                                                    <div style={{ fontSize: 14 }}>
                                                        {item.time.replaceAll(' ', '').replace('hour', 'h ').replace('minutes', 'm')}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    })
                                }
                            </div>
                            {items.length > 0 && (
                                (loading &&
                                    <div style={{ margin: 20 }}><Oval height={20} /></div>
                                ) || (!loading &&
                                    <div onClick={loadMore} className="hover_pointer" style={{ margin: 20 }}>Load more</div>
                                )
                            )
                            }
                        </div>
                    )
                )
            }
            {
                showingDetailed !== -1 && ((detailedItem === undefined &&
                    <div style={{ height: 400, display: 'flex', alignItems: 'center' }}><Oval /></div>
                ) || (detailedItem !== undefined &&
                    <div style={{ width: '50%', marginTop: 40 }}>
                        <div style={{ height: 400, overflow: 'hidden', borderRadius: 10 }}>
                            <RecipeImage name={detailedItem.name} width='100%' height='100%' />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: 10 }}>
                            <div style={{ display: 'flex', alignItems: 'center', columnGap: 10 }}>
                                <div>{detailedItem.name}</div>
                                {userLoggedIn && (
                                    <div className="hover_pointer" onClick={handleBookmark}>
                                        {isBookmarked ? <CiBookmarkCheck size={24} /> : <CiBookmark size={24} />}
                                    </div>
                                )}
                            </div>
                            <div>{detailedItem.time}</div>
                        </div>
                        <div style={{ display: 'flex', marginTop: 5 }}>
                            {detailedItem.tags.map((tag, index) => {
                                return <Tag key={index}>{tag}</Tag>;
                            })}
                        </div>
                        <div style={{ marginTop: 30 }}>Ingredients</div>
                        <div style={{ marginTop: 10, display: 'flex', columnGap: 10, flexWrap: 'wrap', rowGap: 10 }}>
                            {detailedItem.ingredients.map((ing, i) =>
                                <Box key={i} bg={bgColor} borderRadius="md" px={2} py={2} >{ing}</Box>
                            )}
                        </div>
                        {detailedItem && (
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                            margin: '20px',
                            marginTop: 50,
                            padding: '20px',
                            borderRadius: '10px',
                            backgroundColor: '#fff'
                        }}>
                            <h3 style={{
                                marginBottom: '16px',
                                color: '#333',
                                textAlign: 'center',
                                fontSize: '24px'
                            }}>
                                Want to cook hands free? 
                            </h3>

                            <div style={{
                                textAlign: 'center'
                            }}>
                                <button
                                    onClick={startVoiceOver}
                                    style={{
                                        padding: '12px 24px',
                                        fontSize: '18px',
                                        backgroundColor: speechSynthesisActive ? '#E95D4F' : '#007BFF',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '8px',
                                        cursor: 'pointer',
                                        transition: 'background-color 0.3s',
                                        marginBottom: '20px',
                                        marginRight: '10px'
                                    }}
                                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = speechSynthesisActive ? '#D14D43' : '#0056b3'}
                                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = speechSynthesisActive ? '#E95D4F' : '#007BFF'}
                                >
                                    Start Voice Over
                                </button>
                                <button
                                    onClick={stopVoiceOver}
                                    style={{
                                        padding: '12px 24px',
                                        fontSize: '18px',
                                        backgroundColor: '#FF6F61',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '8px',
                                        cursor: 'pointer',
                                        transition: 'background-color 0.3s',
                                        marginTop: '10px'
                                    }}
                                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#E95D4F'}
                                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#FF6F61'}
                                >
                                    Stop Voice Over
                                </button>
                            </div>
                        </div>
                    )}
                        <RecipeVideo videoQuery={detailedItem.videoLink} />
                        <div style={{ marginTop: 30 }}>Steps</div>
                        <div style={{ display: 'flex', flexDirection: 'column', rowGap: 20, marginTop: 10 }}>
                            {detailedItem.process && detailedItem.process.map((step, index) => {
                                return <Box display="flex" bg={stepBgColor} borderRadius="md" overflow="hidden" key={index}>
                                        <Box display="flex" alignItems="center" px={5} py={1} bg={stepNumberBgColor}>{index + 1}</Box>
                                        <Box px={2} py={3} display="flex" alignItems="center" color={textColor}>{step.replace(/[0-9]*\./, '')}</Box>
                                </Box>;
                            })}
                        </div>
                        {detailedItem && (
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                margin: '20px',
                                marginTop: 50,
                                padding: '20px',
                                borderRadius: '10px',
                                backgroundColor: '#fff'
                            }}>
                                <h3 style={{
                                    marginBottom: '16px',
                                    color: '#333',
                                    textAlign: 'center',
                                    fontSize: '24px'
                                }}>
                                    Shopping List Preview
                                </h3>

                                <div style={{
                                    backgroundColor: '#f9f9f9',
                                    padding: '20px',
                                    borderRadius: '8px',
                                    marginBottom: '20px',
                                    border: '1px solid #ddd'
                                }}>
                                    <h4 style={{
                                        marginBottom: '16px',
                                        color: '#444',
                                        fontSize: '20px'
                                    }}>
                                        {detailedItem.name}
                                    </h4>
                                    <ul style={{
                                        listStyle: 'none',
                                        padding: 0,
                                        margin: 0
                                    }}>
                                        {detailedItem.ingredients.map((ingredient, index) => (
                                            <li key={index} style={{
                                                padding: '12px 0',
                                                borderBottom: '1px solid #eee',
                                                display: 'flex',
                                                alignItems: 'center',
                                                fontSize: '16px',
                                                color: '#555',
                                                transition: 'background-color 0.3s, padding 0.3s',
                                                cursor: 'pointer'
                                            }}
                                                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f1f1f1'}
                                                onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                            >
                                                <span style={{
                                                    width: '30px',
                                                    height: '30px',
                                                    backgroundColor: '#FF6F61',
                                                    color: 'white',
                                                    borderRadius: '50%',
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    marginRight: '15px',
                                                    fontSize: '14px',
                                                    fontWeight: 'bold'
                                                }}>
                                                    {index + 1}
                                                </span>
                                                {ingredient}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div style={{
                                    textAlign: 'center'
                                }}>
                                    <button
                                        onClick={() => addToCart(detailedItem)}
                                        style={{
                                            padding: '12px 24px',
                                            fontSize: '18px',
                                            backgroundColor: '#007BFF',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '8px',
                                            cursor: 'pointer',
                                            transition: 'background-color 0.3s',
                                            marginBottom: '20px',
                                            marginRight: '10px'
                                        }}
                                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0056b3'}
                                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#007BFF'}
                                    >
                                        Add to Cart
                                    </button>
                                    <button
                                        onClick={() => generatePDF(detailedItem.name, detailedItem.ingredients)}
                                        style={{
                                            padding: '12px 24px',
                                            fontSize: '18px',
                                            backgroundColor: '#FF6F61',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '8px',
                                            cursor: 'pointer',
                                            transition: 'background-color 0.3s',
                                            marginTop: '10px'
                                        }}
                                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#E95D4F'}
                                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#FF6F61'}
                                    >
                                        Download Shopping List
                                    </button>
                                </div>
                            </div>
                        )}
                        <div style={{ height: 100 }}></div>
                    </div>
                    ))
            }
        </div >
    )
}
export default SearchBlock;
