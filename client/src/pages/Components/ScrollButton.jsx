import './main_styles.css';
import { useState } from 'react';
import {AiOutlineArrowUp} from 'react-icons/ai';

export default function ScrollButton () {
    const [iconActive, setIconActive] = useState(false);
    const handlePress = () => {
        window.scrollTo({top:0, left:0, behavior:"smooth"});
    }

    const handleIconState = () => {
        setIconActive(!iconActive);
    }

    const handleIconColour = () => {
        if (iconActive) {
            return 'gray';
        }
        else {
            return 'white';
        }
    }


    return (
        <div className='scroll-button-wrapper' onMouseEnter={handleIconState} onMouseLeave={handleIconState}>
            <button onClick={handlePress} className='scroll-button'>BACK TO TOP
            <AiOutlineArrowUp width='200' height='200' color={handleIconColour()} className='scroll-icon'/>
            </button>
            
        </div>
    );
}