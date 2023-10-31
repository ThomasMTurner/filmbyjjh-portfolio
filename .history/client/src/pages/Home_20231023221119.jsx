import './Components/main_styles.css';
import { NavLink } from 'react-router-dom';
import MainVideo from './Components/Videos/header.mp4'
import QuotesContainer, {Quote} from './Components/Quote';
import JacobBio from './Components/Images/jacob-bio.jpg';
import PortfolioReel from './Components/Videos/portfolio-reel.mp4';
import { motion } from 'framer-motion';
import {InitialLoginContainer} from './Components/InitialLogin';
import { useState, useEffect, useContext } from 'react';

//classname = 'jacob-bio-image'
export default function Home() {

  return (
    <div className="Home">
        <div className='header-video-wrapper'>
          <video className='header-video' loop autoplay='true' muted playsinline>
            <source src={MainVideo} type="video/mp4"/>
          </video>
          <div className='header-video-text-wrapper'>
            <h1> Professional quality videography, photography and camera operation</h1>
            <h2> BIRMINGHAM | WEST MIDLANDS</h2>
          </div>
        </div>
        

        <motion.div initial={{y: -40, opacity:0}} whileInView={{y:20, opacity:1}} transition={{duration:1.2}} viewport={{once:true}}>
          <div className='biography-container' id='bio-container'>
            <div className="bio-container">
              <p className='bio-headline'>I am Jacob Hollis, a freelance <span style={{ color: 'black', fontWeight:'bold'}}>videographer</span> and <span style={{color: 'black', fontWeight:'bold'}}>camera operator</span></p>
              <p className='bio-content'>I am incredibly committed to my clients when it comes to delivering the best quality videos and images. After studying media at college, I became a full time videographer and have been doing this for two years. I have worked with a huge range of firms from all industries, from construction companies to cosmetics. My clients have trust in me to produce the best possible content, no matter what. I use the Sony FX3, a Netflix approved cinema camera, for all projects. This camera produces excellent image quality with wide dynamic range, allowing me to compose fantastic videos and images for clients.</p>
            </div>   
          <div className='jacob-image-container-1'>
            <img src={JacobBio} alt='jacob-bio' className='jacob-bio-image'/>
          </div>
          </div>
        </motion.div>
        <hr style={{width:"90%", border:"0.1rem solid silver"}}></hr>

        <motion.div initial={{x:-100, opacity:0}} whileInView={{x:0, opacity:1}} transition={{duration:1.2}} viewport={{once:true}}>
          <div className='home-reel-wrapper'>
            <p>This is a highlight reel, some of my most recent work.</p>
            <video className='home-reel' controls>
                <source src={PortfolioReel} type='video/mp4'/>
            </video>
            <p style={{color:'silver'}}>View my <NavLink to="/video" className='home-video-link'>portfolio</NavLink> to see more.</p>
          </div>
        </motion.div>
        <hr className='quote-container-breaker'></hr>
        <div className="quotes-container">
          <p className="quote-header">What my clients have to say about me.<span style={{color:'white'}}>.</span></p>
        </div>
    </div>
  );
}

