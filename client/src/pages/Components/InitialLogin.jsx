import React, { useState, useEffect, useRef } from 'react';
import {motion} from 'framer-motion';
import ReactDOM from 'react-dom';



//this component will have a single input field to validate authentication token
// want to link up to individual authenticator application possibly.
export function AdminForm () {

    const handleSubmit = () => {
        console.log("succ")
    }

    return (
        <div className='admin-login-container'>
            <form onSubmit={() => handleSubmit()} className='admin-login-form'>
            </form>
        </div>
    )

}


export const InitialLoginContainer = React.memo((props) => {
    const [adminLogin, setAdminLogin] = useState(false);
    
    return (

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2 }} viewport={{ once: true }}>
          <div className='initial-login-container' id='initial-login-container'>
            {!adminLogin && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem', position: 'relative', bottom: '3rem' }}>
                <p style={{ fontSize: '2.5rem', fontFamily: 'helvetica', fontWeight: '300', color: 'white' }}> Welcome to <span style={{ fontWeight: 'bold', textDecoration: 'underline', textDecorationThickness: '0.2rem' }}>FILM BY JJH</span>. </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <button className='initial-login-link' onClick={() => setAdminLogin(true)}>
                    Hello, I am the editor
                  </button>
                  <button className='initial-login-link' onClick={() => props.handleUnmount()}>
                    Hi, I am just browsing
                  </button>
                </div>
              </div>
            )}
            {adminLogin && <AdminForm />}
          </div>
            
        </motion.div>
      )
      
  });




