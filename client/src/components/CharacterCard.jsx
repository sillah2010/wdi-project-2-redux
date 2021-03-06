import React from 'react';

const CharacterCard = (props) => {
    return (
        <div>
            <img className="characterPic" src={props.character.img} alt={props.character.name}/>
            <p>{props.character.name}</p>
        </div>
    );
};

export default CharacterCard;