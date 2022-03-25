import React from 'react';

function DefaultTemplate({ commercial }) {
    return (
        <div id="default">
            <h1 id="msg0">{commercial.messages[0]}</h1>
            <h2 id="msg1">{commercial.messages[1]}</h2>
            <p id="msg2">{commercial.messages[2]}</p>
            <p id="msg3"></p>
            <p id="msg4"></p>
            <p id="msg5"></p>
            <p id="msg6"></p>
            <p id="msg7"></p>
            <p id="msg8"></p>
            <p id="msg9"></p>
            {commercial.images[0] && (
                <img id="img0" src={commercial.images[0]} alt=" " />
            )}
            {commercial.images[1] && (
                <img id="img1" src={commercial.images[1]} alt=" " />
            )}
            {commercial.images[2] && (
                <img id="img2" src={commercial.images[2]} alt=" " />
            )}
            {commercial.images[3] && (
                <img id="img3" src={commercial.images[3]} alt=" " />
            )}
            {commercial.images[4] && (
                <img id="img4" src={commercial.images[4]} alt=" " />
            )}
        </div>
    );
}

export default DefaultTemplate;
