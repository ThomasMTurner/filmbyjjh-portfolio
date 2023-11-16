import PorfolioReel from './Components/Videos/portfolio-reel.mp4';
import Header from './Components/Videos/header.mp4';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { BsCamera } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import ScrollBar from './Components/ScrollBar';

const DescriptionPopUp = (props) => {
  return (
      <div className='description-pop-up-wrapper'>
          <p style={{textDecoration:'underline', textUnderlineOffset:'10px', fontFamily:'helvetica', color:'black', fontWeight:'bold', fontSize:'1.5rem'}}>What's in this project?</p>
          <p style={{fontFamily:'helvetica', color:'white', fontWeight:'200', position:'relative', bottom:'1.5rem'}}>{props.description}</p>
      </div>
  )
}


function VideoContainer (props) {
  const [descriptionIsToggled, setDescriptionIsToggled] = useState(false);


  const [ref, inView] = useInView({
    threshold: 0.5,
    triggerOnce: true
  })

  const navigate = useNavigate();

  
  return (
    <motion.div ref={ref}  animate={{opacity: inView ? 1 : 0, y: inView ? 0 : -80}} viewport={{once:true}} transition={{duration:0.5,  type:'spring'}} className='video-container-1'>
      <video
      src={props.source}
      controls
      width='600'
      height='600'
    >
    
      </video>
      <button onMouseEnter={() => setDescriptionIsToggled(true)} onMouseLeave={() => setDescriptionIsToggled(false)} onClick={() => navigate(`/portfolio/video/${props.videoLink}`)} className='video-caption'>
        <p>View full project.</p>
      </button>

      {descriptionIsToggled && <DescriptionPopUp description="A beautiful display of winery, from the great winesmen of new eve business ventures."/>}


    </motion.div>
  )
}

function PhotosContainer(props){
  return (
    <div className='content-container'>
      {props.photos && Object.entries(props.photos).map(([caption, source]) => (
        <img size={'300'} src={source} alt={caption} key={caption} />
      ))}
    </div>
  )
}


//1st idea: 2 videos per row

//
function VideosContainer(props) {
  return (
    <div className="content-container">
      <div className='video-row'>
        {props.videos &&
          Object.entries(props.videos).map(([name, [source, videoLink]], index) => (
            <div key={index} className='video-item'>
              <VideoContainer
                 source={source}
                 videoLink={videoLink}
              />
            </div>
          ))}
        </div>
    </div>
  );
}
  
  

export default function ContentSidebar(props) {
    const [currentPage, setCurrentPage] = useState(null);
    const displaysVideos = Boolean(props.videos || false);
    //const displaysPhotos = (!displaysVideos);
    
    const urlMap = {
      'event-highlights': 'Event highlights, a stellar collection of reels from my events.',
      'promotional-material': 'Promotional material, increasing the noteriety of client brands.',
      'wedding-photography': 'Wedding photography, elegant portraits of you and your loved ones on this special day'
    }
    
    const links = Object.values(props.videos).map(i => i[1]);
    
    /*
    const location = useLocation();
    useEffect(() => {
      const currentPageName = window.location.pathname.split('/').pop();
      if (currentPageName != "photo"){
        setCurrentPage(urlMap[currentPageName]);
      }
    }, [location]);
    */

    useEffect(() => {
      if (currentPage == null){
        setCurrentPage(urlMap[props.contentTitle]);
      };
    }, [])
    
  
    return (
      <div className='content-sidebar'>
        <div>
          <div style={{display:'flex', flexDirection:'row', gap:'0.5rem', justifyContent:'center', alignItems:'center'}}>
            <BsCamera size={15} color={'silver'}/>
            <p style={{color:'darkgray', fontWeight:'200'}}>PRODUCED BY JACOB HOLLIS.</p>
          </div>
          <p className='content-page-title'>{(currentPage)  || 'Sorry, no content to display at the moment' }</p>
          <hr style={{width:"100%", border:'1px solid black', position:'relative', top:'1.5rem'}}/>
        </div>
        <div className='content-sidebar-title'> 
          <h1 style={{fontSize:'1rem', fontFamily:'helvetica', fontWeight:'200', width:'40rem'}}>{props.contentDesc}</h1>
          <hr style={{width:"100%", border:'0.7px solid black'}}/>
          <p style={{fontFamily:'helvetica', fontWeight:'200', color:'darkslategray'}}>Projects in this section:</p>
          <ScrollBar links={links}/>
        </div>
        {displaysVideos ? <VideosContainer videos={props.videos} /> : <PhotosContainer photos={props.photos} />}
      
  
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
    const eventHighlightVideos = {"2019 First event BBJCorporations": [PorfolioReel, null], "Atlas Gym": [Header, "/video/links/event-highlights/atlas-gym"]};

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

