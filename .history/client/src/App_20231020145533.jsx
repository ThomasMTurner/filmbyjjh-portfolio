import { useLocation, useNavigate, Route, Outlet, BrowserRouter as Router, Routes} from 'react-router-dom';
import { useEffect, useState, Suspense, useContext } from 'react';
import { CSSTransition } from 'react-transition-group';
import { ColorRing } from 'react-loader-spinner';
import React from 'react';
import NavBar from "./pages/Components/Navbar"
import Footer from "./pages/Components/Footer";
import Updates from './pages/Updates';
import Contact from './pages/Contact';
import Home from './pages/Home';
import { EventHighlights, PromotionalMaterial } from './pages/Videography';
import SubNav from './pages/Components/SubNav';
import Portfolio from './pages/Portfolio';
import { InitialLoginContainer } from './pages/Components/InitialLogin';
import { UserRoleContext } from './userRoleContext';
import { Blur } from 'react-blur';


//page to capture individual shoots or projects, want back button at top right with title

const VideoPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  console.log(location.pathname);

  useEffect(() => {
    if (location.pathname == '/portfolio/video'){
      console.log("changes are not being applied properly")
      navigate('portfolio/video/event-highlights');
    }
  }, [navigate, location]);

  return (
    <div className='video-page-wrapper'>
      <div className='sideline-content'> 
        <SubNav
          title="Videography Content"
          parentLink="video"
          links={{"Event highlights": "event-highlights", "Promotional material": "promotional-material", "Drone footage": "my-first-highlight-reel" }}
          subLinks={{'event highlights': {"Shoots": {"Atlas Gym": "/video/links/atlas-gym"}, "Individual projects":{}}}}
          className='subnav'
        />
        <p className='sideline-content-text'>Welcome to the videography page, you can view all of my highlighted video projects on the right by scrolling. You can also look into each project by clicking on the button inside the caption. </p>
      </div>
      
      <div className='page-content-wrapper'>
        <Routes>
          <Route path="/event-highlights" element={<EventHighlights />} />
          <Route path="/promotional-material" element={<PromotionalMaterial />} />
        </Routes>
      </div>
    </div>
  );
};




const PhotoPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
  
    useEffect(() => {
      if (location.pathname == '/video'){
        navigate('/video/event-highlights');
      }
    }, [navigate, location]);
  
    return (
      <div className='photo-page-wrapper'>
        <SubNav
          title="Photography Content"
          parentLink="photo"
          links={{}}
        />
        <Routes>
          <Route path="/" element={<EventHighlights />} />
        </Routes>
      </div>
    );
  
}


const LoadingPage = () => {
  return (
    <div className='loading-page'>
      <ColorRing
        className='loading-spinner'
        visible={true}
        height="100"
        width="100"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={['#000000', '#808080', '#C0C0C0', '#808080', '#000000']}
    />

      <p>Loading, please wait...</p>
    </div>
  )
}


const Layout = () => {
  const [showFooter, setShowFooter] = useState(false);
  const { userRole } = useContext(UserRoleContext);
  const [showBlur, setShowBlur] = useState(true);

  const blurStyle = showBlur ? { filter: 'blur(4px)' } : {};

  useEffect(() => {
    const handleBlur = () => {
      if (userRole != null){
        setShowBlur(false);
    }
  };

    handleBlur();
    
  }, [userRole]);

  
  useEffect(() => {
    const handleScroll= () => {
      const content = document.getElementById('content');
      if (content) {
        const scrollOffset = content.offsetHeight - document.documentElement.clientHeight;
        setShowFooter(window.pageYOffset >= scrollOffset);

      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


      return (
        <div className='layout-wrapper'>
          <CSSTransition
           in={!showFooter}
           timeout={300}
           classNames='nav-transition'
           unmountOnExit>
            <NavBar id='nav' blurStyle={blurStyle}/>
          </CSSTransition>
          <div id="content">
            {userRole == null && <InitialLoginContainer/>}
            <div style={blurStyle}>
              <Outlet />

            </div>
          </div>
          <div style={blurStyle}>
            <Footer/>
          </div>
        </div>
      );
    };
    
/*
Notes for later:


*/


export default function App() {
  return (
    <div className="App">
      <Router>
        <Suspense fallback={<LoadingPage />} timeout={200}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/updates" element={<Updates />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/portfolio" element={<Portfolio/>} />
                <Route path="/portfolio/video/*" element={<VideoPage />} />
                <Route path="/portfolio/photo/*" element={<PhotoPage />} />
            </Route>
          </Routes>
        </Suspense>
      </Router>
    </div>
  );
}