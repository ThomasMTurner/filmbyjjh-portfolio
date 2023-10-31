import React from 'react';
import axios from 'axios';
import * as Yup from 'yup';
import './Components/main_styles.css';
//import JacobImage from './Components/Images/jacob-bio.jpg';
import { validate } from 'email-validator';
import { useState, useEffect } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { SpinnerCircular } from 'spinners-react';

//<img src={JacobImage} height='240' width='320' className='contact-image' alt='contact-image'/>


function FormValidationWindow () {
  const [rateMessage, setRateMessage] = useState('');

  const handleRateMessage = () => {
    axios.get('http://localhost:3001/send-email')
      .then((response) => {
        console.log(response.status);
      })
      .catch((error) => {
        if (error.response && error.response.status === 429){
          setRateMessage('Rate limit exceeded for sending emails, please try again shortly')
        }
        else {
          console.log('Error: ', error.message);
        }
      })
  }

  useEffect(() => {
    const interval = setInterval(() => {
      handleRateMessage()
    }, 5000);
    return () => {
      clearInterval(interval);
    }
  }, []);




  return (
    <div className='form-validation-window'>
      {rateMessage && <p>{rateMessage}</p>}
    </div>
  )
};

function ValidationPopUp (props) {
    let charCountColour = null;
    let charsLeft = props.maxLength - props.charCount;


    if (props.charCount <= props.maxLength){
        charCountColour = 'green';
    }
    else{
        charCountColour = 'red';
    }

    return (
        <div className='validation-wrapper'>
            <p>{props.alert}</p>
            {props.charCount !== undefined && (
                <p style={{color:charCountColour, position:'relative', bottom:'1rem'}}>{charsLeft} characters remaining</p>
            )}         
        </div>
    )
    
}
function TextForm(props) {
  const [isFocused, setIsFocused] = useState(false);
  var inputLength = props.value.length;
  

  const handleChange = (event) => {
    props.handleChange(event);
  };


  if (props.type === 'LargeTextForm') {

    return (
      <>
        <label className='large-text-form'>
          <textarea
            className={`${(props.isValid) ? 'green-border' : 'default-border'}`}
            value={props.value}
            onChange={handleChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            rows="4"
            columns="50"
            placeholder={props.placeholder}
          />
          {props.isValid && (
            <FaCheckCircle size="30" color="green" className="tick-mark tick-mark-reposition" />
          )}
        </label>
        {props.alert !== undefined && <ValidationPopUp alert={props.alert}  charCount={inputLength} maxLength={50000}/>}
      </>
    );
  } else {
    return (
      <>
        <label className='small-text-form'>
          <input
            className={`${(props.isValid)? 'green-border' : 'default-border'}`}
            type="text"
            value={props.value}
            onChange={handleChange}
            onClick={() => setIsFocused(!isFocused)}
            placeholder={props.placeholder}
          />
          {props.isValid && <FaCheckCircle size="30" color="green" className="tick-mark" />}
        </label>
        {(!props.isValid) && props.alert !== undefined && (
          <ValidationPopUp alert={props.alert} />
        )}
      </>
    );
  }
}



function TextFormComponent (props) {
    return(
        <div className='text-form-wrapper'>
            <div className='text-form-title-wrapper'>
                <p className='text-form-title'>{props.title} {props.isRequired ? (<span style={{color:'red'}}>*</span>) : null}</p>
            </div>
            <TextForm 
            type={props.type} 
            placeholder={props.placeholder} 
            value={props.value} 
            handleChange={props.handleChange}
            alert={props.alert}
            contentType={props.contentType}
            resetValidation={props.resetValidation}
            isValid={props.isValid}
            validator={props.validator}
            />
        </div>
    )
}


function EmailForm () {
    const [emailFormData, setEmailFormData] = useState({
        name: '',
        email: '',
        message:'',
        subject:''
    });

    const [validationErrors, setValidationErrors] = useState({});

    const [nameValid, setNameValid] = useState(false);
    const [emailValid, setEmailValid] = useState(false);
    const [subjectValid, setSubjectValid] = useState(false);
    const [messageValid, setMessageValid] = useState(false);

    const [isSubmitting, setIsSubmitting] = useState(false);

    const schema = Yup.object().shape({
      name: Yup.string().max(50, "Name must be less than 50 characters").required('Name is required'),
      email: Yup.string().test('email', 'Please enter a valid email address', (value) => validate(value)).required('Email is required'),
      subject: Yup.string().required("Subject is required").max(78, "Subject must be less than 78 characters"),
      message: Yup.string().required("Message is required").max(50000, "Message must be less than 50000 characters")
    });

   

    const handleNameChange = (event) => {
        const { value } = event.target;

        schema
       .validateAt('name', { name: value })
       .then(() => {
         setNameValid(true);
         setValidationErrors((prevErrors) => ({
           ...prevErrors,
           name: ''
         }));
       })
       .catch((error) => {
         setNameValid(false);
         setValidationErrors((prevErrors) => ({
           ...prevErrors,
           name: error.message
         }));
       });


        setEmailFormData((prevData) => ({
          ...prevData,
          name: event.target.value
        }));
      };
    
    const handleEmailChange = (event) => {
        const { value } = event.target;

        schema
        .validateAt('email', { email: value })
        .then(() => {
          setEmailValid(true);
          setValidationErrors((prevErrors) => ({
            ...prevErrors,
            email: ''
          }));
        })
        .catch((error) => {
          setEmailValid(false);
          setValidationErrors((prevErrors) => ({
            ...prevErrors,
            email: error.message
          }));
        });
        

        setEmailFormData((prevData) => ({
          ...prevData,
          email: event.target.value
        }));
      };
    
    const handleMessageChange = (event) => {
        const { value } = event.target;

        schema
        .validateAt('message', { message: value })
        .then(() => {
          setMessageValid(true);
          setValidationErrors((prevErrors) => ({
            ...prevErrors,
            message: ''
          }));
        })
        .catch((error) => {
          setMessageValid(false);
          setValidationErrors((prevErrors) => ({
            ...prevErrors,
            message: error.message
          }));
        });


        setEmailFormData((prevData) => ({
          ...prevData,
          message: event.target.value
        }));
      };

    const handleSubjectChange = (event) => {
        const { value } = event.target;

        schema
        .validateAt('subject', { subject: value })
        .then(() => {
          setSubjectValid(true);
          setValidationErrors((prevErrors) => ({
            ...prevErrors,
            subject: ''
          }));
        })
        .catch((error) => {
          setSubjectValid(false);
          setValidationErrors((prevErrors) => ({
            ...prevErrors,
            subject: error.message
          }));
        });

        setEmailFormData((prevData) => ({
          ...prevData,
          subject: event.target.value
        }));
      };


    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);

        setNameValid(false);
        setEmailValid(false);
        setSubjectValid(false);
        setMessageValid(false);


        const requestData = {
            name: emailFormData.name,
            email: emailFormData.email,
            subject: emailFormData.subject,
            message: emailFormData.message
        };

        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        };
        
        if (!nameValid || !emailValid || !subjectValid || !messageValid) {
          setIsSubmitting(false);
          return; 
      }

        const sendEmail = async () => {
          try {
            await axios.post('http://localhost:3001/send-email', requestData, config)
            .then(response => {
              setIsSubmitting(false);
              })
           
          }
          catch (error) {
            console.error(error);
          }
        }

        await sendEmail();

        setEmailFormData({
            name:'',
            email:'',
            message:'',
            subject:''
        })

   
    };


    const handleValue = () => {
      if (isSubmitting){
        return "SUBMITTING...."
      }
      else{
        return "SUBMIT"
      }
    }

    


    return (
        <div className='email-form'>
            <label className='submit-button'>
                <form onSubmit={handleSubmit}>
                  <p style={{fontFamily:'helvetica', fontWeight:'bold', fontSize:'1.5rem', color:'black', width:'1rem'}}>Fill in the form below to start your videography or photography project.</p>
                    <TextFormComponent 
                    title='Full Name' 
                    type='SmallTextForm' 
                    value={emailFormData.name}
                    handleChange={handleNameChange}
                    isRequired={true}
                    alert={validationErrors.name}
                    contentType={'name'}
                    isValid={nameValid}
        
                    
                    />
                    <TextFormComponent 
                    title='Email Address' 
                    type='SmallTextForm' 
                    value={emailFormData.email}
                    handleChange={handleEmailChange}
                    isRequired={true}
                    alert={validationErrors.email}
                    contentType={'email'}
                    isValid={emailValid}
                 
                    
                    />
                    <TextFormComponent 
                    title='Subject' 
                    type='SmallTextForm' 
                    value={emailFormData.subject}
                    handleChange={handleSubjectChange}
                    isRequired={true}
                    alert={validationErrors.subject}
                    contentType={'subject'} 
                    isValid={subjectValid}     
                    />
                    <TextFormComponent 
                    title='Write your message' 
                    type='LargeTextForm' 
                    value={emailFormData.message}
                    handleChange={handleMessageChange}
                    isRequired={true}
                    alert={validationErrors.message}
                    contentType={'message'}
                    isValid={messageValid}
                    />
                    <SubmitButton isSubmitting={isSubmitting}/>
                    <FormValidationWindow/>
                </form>
            </label>
        </div>
    )
}


function SubmitButton (props) {
    // want to keep track of when the email is currently sending, during this time we 
    // load the spinner and also change the value of input to "sending..." 

    const handleValue = () => {
      if (props.isSubmitting){
        return "SENDING"
      }
      else{
        return "SUBMIT"
      }
    }

    return(
      <React.Fragment>
        <input type='submit' value={handleValue()} className={props.isSubmitting ? 'submit-button-1 submit-button-reposition-down submit-button-1-submitting': 'submit-button-1 submit-button-reposition-down'}/>
          {props.isSubmitting && 
          <div className='loading-spinner-2'>
            <SpinnerCircular color='white' size={40} thickness={100} />
          </div>
    }
      </React.Fragment>
    )
}



export default function Contact(){
    return (
        <div className="Contact">
            <div className='contacts-wrapper'>
                <div className="email-submission-wrapper">
                    <EmailForm/>
                </div>
                <div className='contact-details-wrapper'>   
                    <p className='render-on-mobile' style={{color:'black', fontSize:'3rem', fontFamily:'helvetica', fontWeight:'200', textDecoration:'underline', textDecorationColor:'darkgray'}}>Contact details</p>
                    <h1>EMAIL:</h1>
                    <h2>filmbyjjh@gmail.com</h2>
                    <h1>TELEPHONE:</h1>
                    <h2>(+44) 7413 493653 </h2> 
                    <h1>ADDRESS:</h1>
                    <h2>Birmingham <br/>West Midlands</h2>
                    <div className='contact-image-wrapper'>
                   
                    </div>
                </div>
            </div>

        </div>
    );
}