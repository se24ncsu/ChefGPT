import { useEffect, useRef, useState } from "react";
import SearchBar from "./SearchBar";
import axios from 'axios';
import RecipeImage from "./RecipeImage";
import { LuClock4 } from "react-icons/lu";
import './css/misc.css';
import Tag from "./Tag";
import jsPDF from 'jspdf';
import { Oval } from "react-loader-spinner";
import { bookmarkRecipe, unbookmarkRecipe, isRecipeBookmarked } from '../service/firestoreService';
import { useAuth } from "../contexts/authContext/index";


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
            const data = {
                ingredients: searchIngredients.toString(),
                page
            };
            const response = await axios.post('https://get-recipes-from-ingredients-3rhjd2q7dq-uc.a.run.app', data);
            setItems([...(page === 0 ? [] : items), ...response.data.recipes]);
        }
        else {
            const data = {
                name: searchName,
                page
            };
            const response = await axios.post('https://get-recipes-by-name-3rhjd2q7dq-uc.a.run.app', data);
            setItems([...(page === 0 ? [] : items), ...response.data.recipes]);
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
        const data = {
            name: items[index].name,
            ingredients: items[index].ingredients,
        };
        const response = await axios.post('https://get-detailed-recipe-3rhjd2q7dq-uc.a.run.app', data);
        const allIngredients = response.data.ingredients.map(ingredient => ingredient.trim());
        response.data.ingredients = allIngredients;
        setDetailedItem(response.data);
    }

    const handleBookmark = async () => {
        if (isBookmarked) {
            await unbookmarkRecipe(detailedItem.name);
            setIsBookmarked(false);
        } else {
            await bookmarkRecipe(detailedItem.name);
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
                            <div style={{ minHeight: 100, display: 'flex', flexWrap: "wrap", justifyContent: 'center', gap: 10 }}>
                                {
                                    items.map((item, index) => {
                                        return <div onClick={() => showDetailedRecipe(index)} key={index} className="hover_pointer" style={{ display: 'flex', flexDirection: 'column', padding: 5, background: '#7771', borderRadius: 10 }}>
                                            <div style={{ borderRadius: 10, overflow: 'hidden' }}>
                                                <RecipeImage name={item.name} height={300} width={200} />
                                            </div>
                                            <div style={{ padding: 10, maxWidth: 150, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                                <div>{item.name}</div>
                                                <div style={{ display: 'flex', alignItems: 'center', columnGap: 4 }}>
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
                            <div>{detailedItem.name}</div>
                            <div>{detailedItem.time}</div>
                        </div>
                        {userLoggedIn  && (
                                <button 
                                    onClick={handleBookmark}
                                    style={{ padding: '5px 5px', backgroundColor: '#A9A9A9', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', transition: 'background-color 0.3s' }}    
                                >
                                    {isBookmarked ? "Unbookmark this recipe" : "Bookmark this recipe"}
                                </button>
                        )}
                        <div style={{ display: 'flex', marginTop: 5 }}>
                            {detailedItem.tags.map((tag, index) => {
                                return <Tag key={index}>{tag}</Tag>;
                            })}
                        </div>
                        <div style={{ marginTop: 30 }}>Ingredients</div>
                        <div style={{ marginTop: 10, display: 'flex', columnGap: 10, flexWrap: 'wrap', rowGap: 10 }}>
                            {detailedItem.ingredients.map((ing, i) =>
                                <div key={i} style={{ background: '#eee', borderRadius: 10, padding: 10 }}>{ing}</div>
                            )}
                        </div>
                        <div style={{ marginTop: 30 }}>Steps</div>
                        <div style={{ display: 'flex', flexDirection: 'column', rowGap: 20, marginTop: 10 }}>
                            {detailedItem.process.map((step, index) => {
                                return <div key={index} style={{ display: 'flex', background: '#eee', borderRadius: 10, overflow: 'hidden' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', padding: 20, background: '#ddd' }}>{index + 1}</div>
                                    <div style={{ padding: 10, display: 'flex', alignItems: 'center' }}>{step.replace(/[0-9]*\./, '')}</div>
                                </div>;
                            })}
                        </div>
                        {detailedItem && (
                            <div style={{ display: 'flex', flexDirection: 'column', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)', margin: '20px', padding: '20px', alignItems: 'center', }}>
                                <p>Need a quick shopping list of ingredients? Here's a PDF you can download!</p>
                                <button
                                    onClick={() => generatePDF(detailedItem.name, detailedItem.ingredients)}
                                    style={{ padding: '10px 20px', fontSize: '16px', backgroundColor: '#A9A9A9', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', transition: 'background-color 0.3s', marginTop: '10px' }}
                                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#808080'}
                                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#A9A9A9'}
                                >
                                    Download Shopping List
                                </button>
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