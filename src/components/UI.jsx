import React from 'react';

const UI = ({ techniqueName }) => {
    return (
        <>
            <div id="grain"></div>
            <div id="ui">
                <h1>呪術廻戦</h1>
                <div id="technique-name">{techniqueName}</div>
            </div>
        </>
    );
};

export default UI;
