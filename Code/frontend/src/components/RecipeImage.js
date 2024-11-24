import { useEffect, useRef, useState } from 'react';
import './css/misc.css';
import axios from 'axios';
import { Oval } from 'react-loader-spinner';
import { MdErrorOutline } from "react-icons/md";
import { getCache, setCache } from '../globalcache';
require('dotenv').config();

const RecipeImage = (props) => {

    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(true);
    const hoverEffects = props.hoverEffects === undefined ? true : props.hoverEffects;

    useEffect(() => {
        var cached = getCache(`img:${props.name}`);
        if (cached !== undefined) {
            setUrl(cached);
            setLoading(false);
        }
        else {
            const data = {
                name: props.name
            };
            setLoading(true);
            axios.post(process.env.GET_IMAGE_URL, data).then(response => {
                setUrl(response.data);
                setLoading(false);
                setCache(`img:${props.name}`, response.data);
            }).catch(() => {
                setLoading(false);
            });
        }
    }, [props.name]);

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