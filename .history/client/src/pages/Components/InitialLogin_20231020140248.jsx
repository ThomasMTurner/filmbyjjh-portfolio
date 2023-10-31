import React, { useState, useContext } from 'react';
import {motion} from 'framer-motion';
import {RiArrowGoBackLine} from 'react-icons/ri';
import {MdCheck} from 'react-icons/md';
import { SpinnerCircular } from 'spinners-react';
import { UserRoleContext } from '../../userRoleContext';
import axios from 'axios';



//this component will have a single input field to validate authentication token
// want to link up to individual authenticator application possibly.
export function AdminForm (props) {
    const [buttonColours, setButtonColours] = useState({'tick': 'silver', 'back': 'silver'});
    const [authInput, setAuthInput] = useState({'error': false, 'value': ''});
    const [tempToken, setTempToken] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState({'getToken': false, 'checkToken': false});


    const getAuthToken = () => {
      setIsSubmitting({'getToken': true, 'checkToken': false});
      axios.get('http://localhost:7102/get-token')
          .then((response) => {
            console.log(response);
            setAuthInput({'error': false, 'value': ''});
            setTempToken(response.data.token);
            setIsSubmitting({'getToken': false, 'checkToken': false});
          })
          .catch((error) => {
            console.error(error);
          });

    };

    const handleAdminFormChange = (event) => {
      event.preventDefault();
      const { value } = event.target;
      if (value.length <= 16){
        setAuthInput(prevState => {
          return {
            ...prevState,
            value: value
          }
        });
      }
      else {
        setAuthInput(prevState => {
          return {
            ...prevState,
            error: true
          }
        })

      }
    }

    //below function will do a POST request to a validate endpoint, sending 
    // the input body and check against the generated token.
    const handleSubmit = () => {
        setIsSubmitting({'getToken': true, 'checkToken': false});
        axios.post('http://localhost:7102/validate', {
            test: authInput.value,
            token: tempToken
        })
          .then((response) => {
            setIsSubmitting({'getToken': false, 'checkToken': false});
            if (response.data.valid == true){
              props.setUserRole("editor");
            }
            else {
              setAuthInput(prevState => ({ ...prevState, error: "Invalid authorisation token, please try again." }));
            }
          })
          .catch((error) => {
            console.error(error);
          })
        
    }


    
    return (
      <div className='admin-login-container'>
      <div style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
        <button style={{all:'unset', position:'relative', right:'1rem'}} onMouseEnter={() => setButtonColours(prevState => ({ ...prevState, back: 'black' }))} onMouseLeave={() => setButtonColours(prevState => ({ ...prevState, back: 'silver' }))} onClick={() => props.setAdminLogin(false)}>
          <RiArrowGoBackLine color={buttonColours.back} size={30}/>
        </button>
        <h1 className='admin-login-header'> Hello, Jacob. </h1>
      </div>
      <p className='admin-login-sub-header'> Enter your authentication key below </p>
      <form onChange={(event) => handleAdminFormChange(event)} className='admin-login-form'>
        <label className='smaller-text-form'>
          <input type="text" />
        </label>
        {isSubmitting.checkToken && <SpinnerCircular color='green' size={40} thickness={150} style={{display:'block', padding:'1rem'}}/>}
        {!isSubmitting.checkToken && <MdCheck className='admin-login-button' color={buttonColours.tick} size={40} onClick={() => handleSubmit()} onMouseEnter={() => setButtonColours(prevState => ({ ...prevState, tick: 'green' }))} onMouseLeave={() => setButtonColours(prevState => ({ ...prevState, tick: 'white' }))}/>}
        <p style={{color:'red', fontWeight:'200'}}>{authInput.error}</p>
        <div style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', gap:'1.5rem'}}>
          <button type="button" onClick={() => getAuthToken()} className='request-token-button'>Request new token</button>
          {isSubmitting.getToken && <SpinnerCircular color='white' size={30} thickness={150}/>}
        </div>
      </form>
    </div>
    )

}


export const InitialLoginContainer = ((props) => {
    const [adminLogin, setAdminLogin] = useState(false);
    const {setUserRole} = useContext(UserRoleContext);


    const handleUserLogin = () => {
      setUserRole("base");
    }

    if (adminLogin) {
      return (
        <div className='initial-login-container'>
          <AdminForm setAdminLogin={setAdminLogin} setUserRole={setUserRole}/>
        </div>
      )
    }
    else{
    return (
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0}} transition={{ duration: 1.2 }} viewport={{ once: true }}>
          <div className='initial-login-container' id='initial-login-container'>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem', position: 'relative', bottom: '3rem' }}>
                <p style={{ fontSize: '2.5rem', fontFamily: 'helvetica', fontWeight: '300', color: 'black', position:'relative', bottom:'2rem' }}> Welcome to <span style={{ color:'silver' }}>FILM.BY.JJH</span>. </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <button className='initial-login-link' onClick={() => setAdminLogin(true)}>
                    Hello, I am the editor
                  </button>
                  <button className='initial-login-link' onClick={() => handleUserLogin()}>
                    Hi, I am just browsing
                  </button>
                </div>
              </div>
          </div>
            
        </motion.div>
      )
      }
      
  });




