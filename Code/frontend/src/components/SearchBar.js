import { useRef } from 'react'
import { IoIosSearch, IoIosAdd } from 'react-icons/io'
import './css/misc.css';

const SearchBar = (props) => {

    const DEBOUNCE_TIME = 1000;

    const searchRef = useRef();
    const allIngreds = useRef([]);
    let lastDebounce = useRef(0);

    const onChange = () => {
        lastDebounce = Date.now();
        setTimeout(() => {
            if (lastDebounce < Date.now() - DEBOUNCE_TIME) {
                props.onChange(searchRef.current.value);
            }
        }, DEBOUNCE_TIME);
    }

    const onIngredientAdded = () => {
        let ingred = searchRef.current.value;
        allIngreds.current.push(ingred);
        props.onIngredientAdded(ingred, allIngreds.current);
    }

    return (
        <div style={{ width: '100%', padding: 10, display: 'flex', justifyContent: 'center' }}>
            <div style={{ position: 'relative', width: '50%' }}>
                <input ref={searchRef} onChange={onChange} placeholder='Add ingredients or search by name' type="text" style={{ width: '100%', height: 50, border: '2px solid #0007', borderRadius: 25, paddingLeft: 50, paddingRight: 25 }} />
                <div style={{ position: 'absolute', left: 17, top: 0, height: '100%', display: 'flex', alignItems: 'center' }}>
                    <IoIosSearch size={25} color='#333' />
                </div>
                <div onClick={onIngredientAdded} style={{ position: 'absolute', right: 17, top: 0, height: '100%', display: 'flex', alignItems: 'center' }}>
                    <IoIosAdd size={30} className='hover_pointer hover_rotate_anim' style={{ borderRadius: 5 }} />
                </div>
            </div>
        </div>
    )
}
export default SearchBar;