import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { BiRightArrow, BiLeftArrow } from 'react-icons/bi';



const ScrollLink = (props) => {
    const [displayDescription, setDisplayDescription] = useState(false);


    const linkMap = {
        '/portfolio/video/portfolio-reel': 'Portfolio Reel',
        '/portfolio/video/header': 'Header',
    }

    

    return (
            <div onMouseEnter = {() => setDisplayDescription(true)} onMouseLeave = {() => setDisplayDescription(false)} className='scroll-link-wrapper'>
                <NavLink exact to={props.link} className='scroll-link'>
                    {linkMap[props.link]}
                </NavLink>
            </div>

        
        
    )
}

/*
(1) Map props.links onto respective ScrollLink components 


*/


export default function ScrollBar (props) {
    const [offsetIndex, setOffsetIndex] = useState(0);

    const setOffsetLeft = () => {
        if (offsetIndex > 0){
            setOffsetIndex(offsetIndex - 1);
        }
    }

    const setOffsetRight = () => {
        if (offsetIndex < props.links.length - 3){
            setOffsetIndex(offsetIndex + 1);
        }
    }

    return (
        <div className='scroll-bar-wrapper'>
            <button onClick={() => setOffsetLeft()}><BiLeftArrow size={30} color='black'/></button>
            {props.links.slice(offsetIndex, offsetIndex + 3).map((link, index) => {
                return <ScrollLink key={index} link={link}/>
            })

            }
            <button onClick={() => setOffsetRight()}><BiRightArrow size={30} color='black'/></button>
        </div>
    )
}