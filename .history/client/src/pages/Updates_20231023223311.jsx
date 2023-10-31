import './Components/main_styles.css';
import * as yup from 'yup';
import axios from 'axios';
import { useContext, useState, useEffect } from 'react';
import { UserRoleContext } from '../userRoleContext';
import {MdCheck} from 'react-icons/md';
import {AiOutlineClear} from 'react-icons/ai';
import TagsContainer from './Components/TagComponents';
import PostPreview from './Components/Post';
import SearchBarContainer from './Components/SearchBar';


const ResultsComponent = (props) => {
    const results = props.posts.length;
    return (
        <div style={{textAlign:'center'}}>
            <p style={{fontFamily:'helvetica', fontWeight:'bold', fontSize:'1.5rem', color:'green'}}>View the {results} latest updates from Jacob.</p>
        </div>
    )
}

const UserPage = () => {
  const [posts, setPosts] = useState([]);
  //queries can hold sorts, filters and search.
  //data holds search terms.
  const [query, setQuery] = useState({'sort': 'most recent', '' 'data': {}});

  const getPosts = async (query) => {
    const response = await axios.get('http://localhost:7182/get-posts', query);
    setPosts(response.data);
  }

  getPosts(query);

  useEffect(() => {
    getPosts(query);
  }, [query]);

  return (
    <div className='user-updates-container'>
    <SearchBarContainer setQuery={setQuery}/>
    <ResultsComponent posts={posts}/>
    {posts.map((data) => {
      return (
        <PostPreview data={data}/>
      )
    })}
    </div>
  )
}

/*
-> Want form with set format, determine format soon.
*/
const EditorPage = () => { 
  const [validationErrors, setValidationErrors] = useState({});
  const [postData, setPostData] = useState({'content': null, 'title': null, 'tags': []});
  const [buttonColour, setButtonColour] = useState({'clear': 'white', 'add': 'white'});

  console.log(buttonColour);

  const [titleValid, setTitleValid] = useState(false);
  const [contentValid, setContentValid] = useState(false);
  const [tagValid, setTagValid] = useState(false);

  const [currentTag, setCurrentTag] = useState(null);


  const postSchema = yup.object().shape({
    title: yup.string().max(50, "Title must be less than 50 characters").required("Title is a required field"),
    content: yup.string().max(50000, "Content must be less than 50000 characters").required("Content is a required field"),
    tag: yup.string().max(20, "Tag must be less than 20 characters")
  })

  console.log(postData.tags);
  const clearTags = () => {
    setPostData(prevData => {
      return {
        ...prevData,
        'tags': []
      }
    })
  }
  const addToTags = () => {
    if (postData.tags.length >= 10) {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        tag: "Cannot add more than 10 tags"
      }))
      return;
    }

    setPostData(prevData => {
      return {
        ...prevData,
        'tags': [...prevData.tags, currentTag]
      }
    })
    setCurrentTag('');
    setTagValid(false);

  }

  const handleTitleChange = (event) => {
      const { value } = event.target;

      postSchema.validateAt('title', { title: value })
      .then(() => {
        setTitleValid(true);
        setValidationErrors((prevErrors) => ({
          ...prevErrors,
          title: ''
        }));
      })
      .catch((error) => {
        setTitleValid(false);
        setValidationErrors((prevErrors) => ({
          ...prevErrors,
          title: error.message
        }))
      })

    setPostData((prevData) => {
      return {
        ...prevData,
        'title': value
      }
    })

  }


  const handleTagChange = (event) => {
    const { value } = event.target;

    postSchema
    .validateAt('tag', { tag: value })
    .then(() => {
      setTagValid(true);
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        tag: ''
      }));
    })
    .catch((error) => {
      setTagValid(false);
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        tag: error.message
      }));
    })

    setCurrentTag(value);
  }

    

  const handleContentChange = (event) => {
    const { value } = event.target;


    postSchema
    .validateAt('content', { content : value })
    .then(() => {
      setTitleValid(true);
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        content: ''
      }));
    })
    .catch((error) => {
      setTitleValid(false);
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        content: error.message
      }))
    })

    setPostData((prevData) => {
      return {
        ...prevData,
        'content': value
      }
    })
  }



  const createPost = () => {
    setValidationErrors({});
    setTitleValid(false);
    setContentValid(false);

    const contentBody = {
      title: postData.title,
      content: postData.content,
      tags: postData.tags
    }


    axios.post('http://localhost:7182/create-post', contentBody)
    .then((response) => {
      console.log(response.status);
    })
    .catch((error) => {
      console.error(error);
    })

    setPostData({'content': '', 'title': '', tags:[]});
  }

  


  return (
    <div className='editor-updates-container'>
      <div className='editor-create-form-wrapper'>
        <form className='editor-create-form'>
          <p style={{textAlign:'center', position:'relative', bottom:'1rem', fontSize:'2rem', color:'black', fontFamily:'helvetica', fontWeight:'200'}}>HI JACOB, CREATE A NEW POST.</p>
          <p style={{color:'black', fontSize:'1.2rem', fontFamily:'helvetica', fontWeight:'bold'}}>Set a title</p>
          <label className='small-text-form'>
            <input className={`${(titleValid) ? 'green-border' : 'red-border'}`} value={postData.title} type="text" onChange={(event) => handleTitleChange(event)}>
            </input>
            {validationErrors['title'] !== '' && (
              <p style={{color:'red', position:'relative', bottom:'0'}}>{validationErrors['title']}</p>
            )}
          </label>
          <p style={{color:'black', fontSize:'1.2rem', fontFamily:'helvetica', fontWeight:'bold'}}>Write the post</p>
          <label className='large-text-form'>
            <textarea className={`${(contentValid) ? 'green-border' : 'red-border'}`} value={postData.content} rows="4" columns="50" onChange={(event) => handleContentChange(event)}>
            </textarea>
            {validationErrors['content'] !== '' && (
              <p style={{color:'red', position:'relative', bottom:'0'}}>{validationErrors['content']}</p>
            )}
          </label>
          <label>
            <p style={{color:'black', fontSize:'1.2rem', fontFamily:'helvetica', fontWeight:'bold'}}>Set tags</p>
            <div style={{display:'flex', flexDirection:'row', alignItems:'center', gap: '1rem'}}>
              <input  className={`tag-input ${(tagValid) ? 'green-border' : 'red-border'}`} value={currentTag} onChange={(event) => handleTagChange(event)} type="text">
              </input>
              <button onMouseEnter={() => setButtonColour((prevData) => ({ ...prevData, 'add': 'green' }))} onMouseLeave={() => setButtonColour((prevData) => ({ ...prevData, 'add': 'white' }))}style={{all:'unset', position:'relative', bottom:'1rem'}} type='button' onClick={() => addToTags()}><MdCheck color={buttonColour['add']} size={30}/></button>
              <button style = {{all: 'unset', position:'relative', bottom:'1rem'}} onMouseEnter={() => setButtonColour((prevData) => ({ ...prevData, 'clear': 'red' }))} onMouseLeave={() => setButtonColour((prevData) => ({ ...prevData, 'clear': 'white' }))} type='button' onClick={() => clearTags()}><AiOutlineClear color={buttonColour['clear']} size={30}/></button>
            </div>
            <p style={{color:'red', fontSize:'0.8rem', position:'relative', bottom: '1.2rem'}} >{validationErrors['tag']}</p>
          </label>
        </form>
        <TagsContainer tagsPerRow={6} isTag={true} setValidationErrors = {setValidationErrors} setPostData = {setPostData} tags={postData.tags}/>
        <button onClick={() => createPost()} type="button" className='post-button'>CREATE</button>
      </div>
    </div>
  )}

export default function Updates () {
  const { userRole } = useContext(UserRoleContext);
  if (userRole == 'base'){
    return <UserPage />
  }

  else if (userRole == 'editor'){
    return <EditorPage />
  }

  else {
    return <div>
      Some error has occurred here
    </div>
  }
}