import { NavLink, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import {BsChevronDown} from 'react-icons/bs';
import { motion, AnimatePresence } from 'framer-motion';
import {BiSolidRightArrow} from 'react-icons/bi';


export default function SubNav(props) {
  const [dimensions, setDimensions] = useState({width:null, height:null});
  const [isMobileNav, setMobileNav] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(true);
  const [menuOpenerSymbol, setMenuOpenerSymbol] = useState('-');
  const [currentPage, setCurrentPage] = useState(props.initialPage);
  const location = useLocation();

  console.log(currentPage);

  const urlMap = {
      'event-highlights': 'event highlights',
      'promotional-material': 'promotional material',
      'my-first-highlight-reel': 'drone footage',
      'wedding-photography': 'wedding photography'
    }


  useEffect(() => {
    const currentPageName = location.pathname.split('/').pop();
    if (currentPageName != "video" && currentPageName != "photo"){
    console.log(currentPageName);
    setCurrentPage(urlMap[currentPageName]);
    }
  }, [location]);

  
  
  const handleMenuOpenerClick = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    if (menuOpenerSymbol == '+'){
      setMenuOpenerSymbol('-');
    }
    else {
      setMenuOpenerSymbol('+');
    }

  }


  useEffect(() => {
      const handleDimensions = () => {
        setDimensions({ width: window.innerWidth, height: window.innerHeight });
      };
      window.addEventListener("resize", handleDimensions);
      handleDimensions();
      return () => window.removeEventListener("resize", handleDimensions);
    }, []);
  
  
  
  useEffect(() => {
      const handleResize = () => {
        if (dimensions.width > 768){
          setMobileNav(false);
        }
        else if (dimensions.width <= 768){
          setMobileNav(true);
        }
        
      };
    
      window.addEventListener("resize", handleResize);
      handleResize();
      return () =>  window.removeEventListener("resize", handleResize);

    }, [dimensions]);

  


  return (
    <div className='sub-nav-wrapper'>
      <ul className="SubNav">
        <div className='sub-nav-title'>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color:'black', width:'15rem' }}>{props.title}</p> 
          {isMobileNav && <button onClick={() => handleMenuOpenerClick()} className='sub-nav-menu-opener'>{menuOpenerSymbol}</button>}
        </div>
    
        <div style={{display:'flex', flexDirection:'column', gap:'1.5rem'}}>
        {(!isMobileNav || mobileMenuOpen) &&
          Object.entries(props.links).map(([key, value]) => (
            <li  key={key}>
              <motion.div whileHover={{x:5}} transition={{type:"string", duration:0.2, stiffness:300, damping:50}}>
              {currentPage.toUpperCase() == key.toUpperCase() && <BiSolidRightArrow style={{position:'relative', left:'0rem'}} size = {15} color='silver' className='sub-nav-arrow'/>}
              
                <NavLink
                  exact
                  to={value}
                  className={({ isActive }) => (isActive ? 'active-sub-link' : 'sub-link')}
                >
                  {key}
                </NavLink>
              </motion.div>
            </li> 
        
        ))}
        </div>
        <hr style={{display:"block",  width:"112%", position:'relative', right:'2.5rem',border:"0.07rem solid gray"}}/>
        <p className='sub-nav-desc'>{props.subNavDescription}</p>
      </ul>
    </div>
  );
}

//<p style={{fontSize: '2rem', fontWeight: 'bold', color:'silver', width:'15rem'}}> On this page: <span style={{color:'black'}}>{currentPage}</span> </p>
//<hr style={{display:"block",  width:"90%", position:'relative', bottom:"2rem", right:"1rem",   border:"0.05rem solid black"}}/><div className='sub-nav-sub-menu-wrapper'><ChevronMenu title={"Shoots"} links={chevronLinks["Shoots"]}/>
//<ChevronMenu title={"Individual projects"} links={chevronLinks["Individual projects"]} />
//</div>
//</ul>
//</div>


function ChevronMenu(props){
  const [chevronToggleUp, setChevronToggleUp] = useState(false);
  const linksEmpty = props.links.length == 0;

  console.log(props.links)

  return(
    <div style={{display:'flex', flexDirection:'column', gap:'1rem'}}>
      <div style={{display:'flex', flexDirection:'row', alignItems:'center'}}> 
        <h1 style={{color:'black'}}>{props.title}</h1>
        <BsChevronDown
        color='black'
        onClick={() => setChevronToggleUp(!chevronToggleUp)} 
        className={`${chevronToggleUp ? 'chevron-up' : 'chevron-down'}`}/>
      </div>
      
      {!chevronToggleUp ? (
  <motion.div initial={{ y: -20, opacity:0}} animate={{ y: 0, opacity:1 }} transition={{ type: "string", duration: 0.2, stiffness: 300, damping: 50 }}>
    <ul>
      {!linksEmpty &&
      Object.entries(props.links).map(([key, value]) => (
        <li style={{ listStyleType: 'none', position:'relative', right:'2rem' }} className="subnav-item" key={key}>
          <NavLink exact to={value} className='sub-nav-sub-menu-link'>
            {key}
          </NavLink>
        </li>
      ))}
      {linksEmpty && <li style={{ listStyleType: 'none', position:'relative', right:'2rem' }} className="subnav-item">Nothing found.</li>}
    </ul>
  </motion.div>
) : (null)}
    </div>
  )
}