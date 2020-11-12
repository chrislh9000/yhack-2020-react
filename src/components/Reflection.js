import React, { useEffect, useState } from 'react';
import Toggle from 'react-toggle';
import "react-toggle/style.css";


function Tog() {

    // use Audio constructor to create HTMLAudioElement
    this.state = {}
    return (
        <label>
            <Toggle
                icons={false}
            />
            <span>Wrapper label tag</span>
        </label>


    );
}

export default Tog;