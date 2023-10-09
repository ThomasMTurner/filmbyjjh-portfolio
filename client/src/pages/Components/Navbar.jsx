import './main_styles.css'
import JacobLogo from './Images/jacob-logo.jpg';
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import Hamburger from 'hamburger-react';
import { CSSTransition } from 'react-transition-group';
import classNames from 'classnames';
import {BiSolidRightArrow} from 'react-icons/bi';



function DropDownMenu(props) {
  const isMobileNav = props.isMobileNav;

  const mobileContainer = {
    hidden: {
      opacity:0,
      y: -10
    },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.5
      },
      y:0
    }
  }

  const mobileItem = {
    hidden: {
      opacity: 0,
      y: -10
    },
    show: {
      opacity: 1,
      y: 0
      
    }
  }

  if (isMobileNav){
  return (
  <motion.div 
    variants = {mobileContainer}
    initial = "hidden"
    animate = "show"        
            >

        <ul className='test-sub-menu' onMouseLeave={() => (!isMobileNav) && props.setVideoSubMenu(false)}>
          {Object.entries(props.links).map(([key, value], index) => (
            <motion.div whileHover={{x: 10}}
                        transition={{type:"string", duration:0.2, stiffness:300, damping:50}}
                        initial= "hidden"
                        animate= "show"
                        variants={mobileItem}
                        >
              <li>
        
                <NavLink
                  exact
                  to={value}
                  className={({ isActive }) => (isActive ? 'active-sub-nav-item' : 'sub-nav-item')}
                  key={index}
                >
                  {key}
                </NavLink>
              </li>
            </motion.div>
          ))}
        </ul>
    </motion.div>
   
  );
   }
  else {
    return (
      <motion.div initial={{x:200, y:-65, opacity:0}} 
                  animate ={{y:-55, opacity:1}} 
                  transition={{type:"string", duration:0.2, stiffness:300, damping:50}}>
        <ul className='test-sub-menu' onMouseLeave={() => (!isMobileNav) && props.setVideoSubMenu(false)}>
          {Object.entries(props.links).map(([key, value], index) => (
            <motion.div whileHover={{x:5}} transition={{type:"string", duration:0.2, stiffness:300, damping:50}}>
              <li>
                <NavLink
                  exact
                  to={value}
                  className={({ isActive }) => (isActive ? 'active-sub-nav-item' : 'sub-nav-item')}
                  key={index}
                >
                  {key}
                </NavLink>
              </li>
            </motion.div>
          ))}
        </ul>
      </motion.div>
    )
  }
}





export default function NavBar() {
    const [isToggled, setToggled] = useState(false);
    const [isMobileNav, setMobileNav] = useState(false);
    const [VideoSubMenu, setVideoSubMenu] = useState(false);
    const [dimensions, setDimensions] = useState({width:null, height:null})
    const [dropDownOpener, setDropDownOpener] = useState('+');


    const handleToggle = () => {
      setToggled(!isToggled);
    }


    function useDimensions() {
      useEffect(() => {
        const handleDimensions = () => {
          setDimensions({ width: window.innerWidth, height: window.innerHeight });
        };
        window.addEventListener("resize", handleDimensions);
        handleDimensions();
        return () => window.removeEventListener("resize", handleDimensions);
      }, []);
    }
    
    function useResize() {
      useEffect(() => {
        const handleResize = () => {
          const width = window.innerWidth;
          setMobileNav(width <= 768);
          setToggled(!isMobileNav)
        };
    
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
      }, []);
    }
    


    
    const logoClasses = classNames({
      'main-logo-wrapper': true,
      'logo-reposition': isMobileNav
    })


    const handleMobileDropDownClick = () => {
      setVideoSubMenu(!VideoSubMenu);
      if (dropDownOpener == '+'){
        setDropDownOpener('-');
      }
      else{
        setDropDownOpener('+');
      }
    }

    

    useDimensions()
    useResize()


    
    return ( 

    <div className="app-wrapper">
      <nav className='Navigation'>
        <div className={logoClasses}>
          <img src={JacobLogo} className="main-logo" alt="Jacob's Logo"/>
        </div>
        <button onClick={() => handleToggle()} className="hamburger-menu-icon">
          <Hamburger toggled={isToggled} toggle={setToggled} size={30} color={"white"} />
        </button>
          {isToggled && 

              <ul className="nav-wrapper">
                <li>
                  <NavLink exact to="/" className={({ isActive }) => (isActive ? 'active-nav-item' : 'nav-item')}>Home</NavLink>
                </li>
                <li>
                  <NavLink exact to="/about" className={({ isActive }) => (isActive ? 'active-nav-item' : 'nav-item')}>Updates</NavLink>
                </li>
                <li onMouseEnter={() => (!isMobileNav) && setVideoSubMenu(true)} onMouseLeave ={() => (!isMobileNav) && setVideoSubMenu(false)}>
                  <NavLink exact to="/video" className={({ isActive }) => (isActive ? 'active-nav-item' : 'nav-item')}>Video</NavLink>
                  {isMobileNav && <button className='drop-down-mobile-button' onClick={() => handleMobileDropDownClick()}> {dropDownOpener} </button>}
                  {VideoSubMenu && (
                    <DropDownMenu 
                      VideoSubMenu={VideoSubMenu} 
                      setVideoSubMenu={setVideoSubMenu}
                      isMobileNav={isMobileNav}
                      links={{ 'Event highlights': '/video/event-highlights', 'Promotional material': '/video/promotional-material', 'Drone footage': '/video/my-first-highlight-reel' }}
                    />
              
  )}
                </li>
                <li>
                  <NavLink exact to="/photo" className={({ isActive }) => (isActive ? 'active-nav-item' : 'nav-item')}>Photo</NavLink>
                  {isMobileNav && <button className='drop-down-mobile-button'> + </button>}
                </li>
                <li>
                  <NavLink exact to="/contact" className={({ isActive }) => (isActive ? 'active-nav-item' : 'nav-item')}>Contact</NavLink>
                </li>
              </ul>

          
          }
       
      </nav>
    </div>
    
    );

  }
  
  