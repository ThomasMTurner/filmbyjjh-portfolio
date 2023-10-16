import './main_styles.css';
import * as Yup from 'yup';
import axios from 'axios';
import JacobLogo from './Images/jacob-logo.jpg';
import {validate} from 'email-validator';
import { useState } from 'react';
import {MdCheck} from 'react-icons/md';
import {FaFacebook, FaInstagram} from 'react-icons/fa';
import ScrollButton from './ScrollButton';
import {RiUserFollowLine} from 'react-icons/ri';
import {GrMail} from 'react-icons/gr';
import {AiOutlineMessage} from 'react-icons/ai';
import { SpinnerCircular } from 'spinners-react';


function MailListSubmission () {
  const [buttonColour, setButtonColour] = useState('white');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [emailValid, setEmailValid] = useState(false);
  const [firstNameValid, setFirstNameValid] = useState(false);
  const [lastNameValid, setLastNameValid] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: ''
  });

  const schema = Yup.object().shape({
    firstName: Yup.string().max(50, "Name must be less than 50 characters").required('Name is required'),
    lastName: Yup.string().max(50, "Name must be less than 50 characters").required('Name is required'),
    email: Yup.string().test('email', 'Please enter a valid email address', (value) => validate(value)).required('Email is required'),
  });


  //dictionary to map field names onto their state setters so that we only need to create one function to handle field changes.
  const dataStateMap = {
    firstName: setFirstNameValid,
    lastName: setLastNameValid,
    email: setEmailValid
  };  

  const handleDataChange = (event, fieldName, dataStateMap, schema) => {
    const { value } = event.target;
  
    schema
      .validateAt(fieldName, { [fieldName]: value })
      .then(() => {
        dataStateMap[fieldName](true);
        setValidationErrors((prevErrors) => ({
          ...prevErrors,
          [fieldName]: ''
        }));
      })
      .catch((error) => {
        dataStateMap[fieldName](false);
        setValidationErrors((prevErrors) => ({
          ...prevErrors,
          [fieldName]: error.message
        }));
      });
  
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value
    }));
  };
  

  const handleSubmit = async () => {
    setFirstNameValid(false);
    setLastNameValid(false);
    setEmailValid(false);
    setIsSubmitting(true);

  

    const requestData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email
    }


    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    if (!firstNameValid || !lastNameValid || !emailValid) {
      console.log('Some input fields are invalid');
      setIsSubmitting(false);
      return;
    }

    console.log('made it to the API POST request')

    const addToMailListRequest = async () => {
      try {
        console.log(requestData)
        await axios.post('http://localhost:7060/add-to-mailing-list', requestData, config)
        .then(response => {
          console.log(response);
        })
      } catch (error) {
        console.error(error);
      }
      };

    await addToMailListRequest();
    

    setEmail('');
    setFirstName('');
    setLastName('');
    setFormData({
      email: '',
      firstName: '',
      lastName: ''
    })

    setIsSubmitting(false);
  }

  console.log(formData);


  return (
    <div className='mail-list-submission-wrapper'>
      <div className='mail-list-title-wrapper'>
        <GrMail size={45} color='white' className='gr-mail-icon'/>
        <p>JOIN THE MAILING LIST</p>
      </div>
      <form className='mail-list-submission-form'>
        <label className='first-name-submission-label'>
          <input onChange={(event) => handleDataChange(event, 'firstName', dataStateMap, schema)} type="text" className={`mail-list-input ${firstNameValid ? "green-border" : "red-border"} `} placeholder="Enter first name">
          </input>
        </label>
        <label className='second-name-submission-label'>
          <input onChange={(event) => handleDataChange(event, 'lastName', dataStateMap, schema)} type="text" className={`mail-list-input ${lastNameValid ? 'green-border' : 'red-border'}`} placeholder="Enter last name">
          </input>
        </label>
        <label className='email-submission-label'>
          <input onChange = {(event) => handleDataChange(event, 'email', dataStateMap, schema)} type="text" className={`mail-list-input ${emailValid ? 'green-border' : 'red-border'}`} placeholder="Enter email">
          </input>
        </label>
        {(!isSubmitting) && <MdCheck className='mail-list-submission-button' color={buttonColour} size={40} onClick={() => handleSubmit()} onMouseEnter={() => setButtonColour('green')} onMouseLeave={() => setButtonColour('white')}/>}
        {isSubmitting && <SpinnerCircular color='green' size={40} thickness={150} style={{display:'block', padding:'1rem'}}/>}
        
      </form>
    </div>
  )
}


export default function Footer(){
    const [facebookHover, setFacebookHover] = useState(false);
    const [instagramHover, setInstagramHover] = useState(false);
    const handleLogoState = (logoType) => {
      if (logoType == 'facebook'){
        setFacebookHover(!facebookHover);
      }
      if (logoType == 'instagram'){
        setInstagramHover(!instagramHover);
      }
    
    }
    const handleLogoColour = (logoState) => {
      if (logoState) {
        return 'gray';
      }
      else {
        return 'white';
      }
    }

    const handleButtonClick = (logoType) => {
      if (logoType == 'facebook'){
        window.open('https://www.facebook.com/filmbyjjh/', '_blank');
      }
      if (logoType == 'instagram'){
        window.open('https://www.instagram.com/filmbyjjh/', '_blank');
      }
    }



    const year = new Date().getFullYear()
    return ( 
    <div className="footer-wrapper">
      <footer>
        <ScrollButton/>
        <div className='footer-top-container'>
          <div className='contact-container'>
            <div className='contact-title-wrapper'>
              <AiOutlineMessage size={40} color='white'/>
              <h1>CONTACT ME</h1>
            </div>
            <h2>Professional and freelance videographer, photographer, and filmmaker.</h2>
            <h3>Jacob: (+44) 7413 493653 | Email: filmbyjjh@gmail.com</h3>
            <h2>Based In</h2>  
            <h3>Birmingham, UK</h3>
          </div>
          <div className='subscribe-container'>
            <MailListSubmission/>
          </div>
        </div>
        <hr style={{display:"block", color:"black",  width:"80%", position:'relative',  border:"0.1rem solid silver"}}></hr>
        <div className='follow-container'>
          <div className='follow-title-container'>
            <RiUserFollowLine color='white' size={40}/>
            <h1>FOLLOW ME</h1>
          </div>
          <div className='follow-icons-container'>
          <button onMouseEnter={() => handleLogoState('facebook')} onMouseLeave={() => handleLogoState('facebook')} onClick={() => handleButtonClick('facebook')} className='facebook-button'>
            <FaFacebook color={handleLogoColour(facebookHover)} size='50'/>
          </button>
          <button onMouseEnter={() => handleLogoState('instagram')} onMouseLeave={() => handleLogoState('instagram')} onClick={() => handleButtonClick('instagram')} className='instagram-button'>
            <FaInstagram color={handleLogoColour(instagramHover)} size='50'/>
            <a href='https://www.instagram.com/filmbyjjh/' target="_blank" rel="noopener noreferrer"></a>
          </button>
          </div>
        </div>
        <hr style={{display:"block", color:"black",  width:"40%", position:'relative', top:"0.5rem",  border:"0.1rem solid silver"}}></hr>
        <div className='copyright-container'>  
          <h2> © Copyright {year} | Jacob Hollis | All Rights Reserved</h2>
          <h3>Freelance Video Production in the West Midlands</h3>
        </div>
      </footer>
    </div> 
    );
  }