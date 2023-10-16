import PorfolioReel from './Components/Videos/portfolio-reel.mp4';
import Header from './Components/Videos/header.mp4';
import { useState, useEffect } from 'react';
import { NavLink, useLocation} from 'react-router-dom';
import {MdOpenInNew} from 'react-icons/md';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';


function VideoContainer (props) {
  const [buttonColour, setButtonColour] = useState('black')
  
  //we will take every caption and when modifying the link for the opener button we will key 
  //into here for the URL
  const captionMap = {};

  const handleOpenerClick = () => {
    if (buttonColour === 'black'){
      setButtonColour('darkgray')
    }
    else {

    }
  }

  const [ref, inView] = useInView({
    threshold: 0.5,
    triggerOnce: true
  })
  
  return(
    <motion.div ref={ref}  animate={{opacity: inView ? 1 : 0, y: inView ? 0 : -80}} viewport={{once:true}} transition={{duration:0.5,  type:'spring'}} className='video-container-1'>
      <video
      src={props.source}
      controls
      width='600'
      height='600'
      >
      </video>
      <div className='video-container-caption'>
          <p>{props.caption}</p>
          <button onMouseEnter = {() => setButtonColour('darkgray')} onMouseLeave = {() => setButtonColour('black')} className='full-opener-button'>
            <NavLink exact to={props.videoLink || ''} className='video-card-link'>
              <MdOpenInNew size={35} color={buttonColour} className='full-open-button'/>
            </NavLink>
          </button>
       </div>
    </motion.div>

  )
}

function VideosContainer(props) {
    return (
      <div className="video-container">
        {props.videos &&
          Object.entries(props.videos).map(([caption, source]) => (
            <VideoContainer
                source={source[0]}
                videoLink={source[1]}
                caption={caption}
                key={caption}
            />
           
          ))}
      </div>
    );
  }
  
  

function ContentSidebar(props) {
    const [currentPage, setCurrentPage] = useState('');
    const urlMap = {
      'event-highlights': 'Event highlights - a stellar collection of reels from my events',
      'promotional-material': 'Promotional material - increasing the noteriety of client brands',
      'my-first-highlight-reel': 'MY FIRST HIGHLIGHT REEL'
    }

    const location = useLocation();
  
    useEffect(() => {
      const currentPageName = window.location.pathname.split('/').pop();
      setCurrentPage(urlMap[currentPageName]);
    }, [location]);
    
  
  
    return (
      <div className='content-sidebar'>
        <p className='content-page-title'>{(currentPage)  || 'Sorry, no content to display at the moment' }</p>
        <div className='content-sidebar-title'> 
          <h1 style={{color:'black', width:'40rem', fontFamily:'helvetica', fontWeight:'100', fontSize:'1.2rem'}}>{props.contentTitle}</h1>
        </div>
        <VideosContainer videos={props.videos} />
      </div>
    );
  }
  


export function AtlasGym () {
  return (
    <div style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', width:'100%'}}>
      <div>
        <video src={Header} width='300' height='300' autoplay controls/>
      </div>
      <h1>get your rocks on mate!!</h1>
    </div>
  );
}


export function EventHighlights () {
    const eventHighlightVideos = {"2019 | First event | BBJCorporations": [PorfolioReel, null], "Atlas Gym  | Promotional video | Featuring Rio": [Header, "/video/links/event-highlights/atlas-gym"]};

    return(
        <div className='event-highlights-wrapper'>
            <ContentSidebar contentTitle="A collection of videos I have created in order to highlight brands, key examples include popular gyms, showcase events and expositions" videos={eventHighlightVideos}/>
        </div>
    );
}


export function PromotionalMaterial () {
    const promoVideos = {"2019 | First event | BBJCorporations": [Header, null]};

    return(
        <div className='promotional-material-wrapper'>
            <ContentSidebar contentTitle="Video content I have created in order to promote brands, key examples include popular gyms, showcase events and so on" videos={promoVideos}/>
        </div>
    );
}