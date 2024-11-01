import { useEffect, useRef, useState } from 'react';
import './css/misc.css';
import axios from 'axios';
import { Oval } from 'react-loader-spinner';
import { MdErrorOutline } from "react-icons/md";


const RecipeImage = (props) => {

    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(true);
    const hoverEffects = props.hoverEffects === undefined ? true : props.hoverEffects;

    useEffect(() => {
        const data = {
            name: props.name
        };
        axios.post('https://get-image-by-name-3rhjd2q7dq-uc.a.run.app', data).then(response => {
            setUrl(response.data);
            setLoading(false);
        }).catch(() => {
            setLoading(false);
        });
    }, []);

    if (loading) {
        return <div style={{ height: props.height, width: props.width, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Oval height={30} />
        </div >;
    }

    if (url === '') {
        return <div style={{ height: props.height, width: props.width, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <MdErrorOutline size={30} />
        </div >;
    }

    return (
        <img src={url} alt='' className={hoverEffects ? 'hover_scale' : ''} style={{ height: props.height, width: props.width, objectFit: 'cover', objectPosition: 'center' }} />
    )
}
export default RecipeImage;