import './css/misc.css';

import React from 'react';

const Tag = (props) => {

    return (
        <div style={{ padding: 5, background: props.selected ? '#ccc' : '#eee', fontSize: 12, margin: 2, borderRadius: 5 }}>
            {props.children}
        </div>
    )
}
export default Tag;
