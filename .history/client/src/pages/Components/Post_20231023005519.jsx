import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

function PostBody(props) {
    const [showAll, setShowAll] = useState(false);

    return(
        <div style={{display:'flex', position:'relative', left:'0.5rem'}}>
            <p style={{fontFamily:'helvetica', fontSize:'1rem', color:'black', wordWrap: 'break-word', width:'55vw'}}>{showAll ? props.content : props.content.substring(0, 100) + '...'}<button className='show-post-button' onClick={() => setShowAll(!showAll)}>{showAll ? 'show less' : 'show more'}</button></p>
        </div>
    )
}


export default function PostPreview(props) {
    const tags = props.data.tags;
    const content = props.data.content;
    const title = props.data.title;

    const [ref, inView] = useInView({
        threshold: 0.5,
        triggerOnce: true
      })


    const getTimestamp = () => {
        const datePosted = new Date(props.data.postDate);
        const currentDate = new Date();
        const difference = currentDate.getTime() - datePosted.getTime();
        
        const minsPassed = Math.floor(difference / (1000 * 60));
        if (minsPassed < 60){
            return `${minsPassed} min`;
        }
        const hoursPassed = Math.floor(difference / (1000 * 60 * 60));
        if (hoursPassed < 24) {
          return `${hoursPassed} hr`;
        }
      
        const daysPassed = Math.floor(difference / (1000 * 60 * 60 * 24));
        if (daysPassed < 7) {
          return `${daysPassed} days`;
        }
      
        const weeksPassed = Math.floor(difference / (1000 * 60 * 60 * 24 * 7));
        return `${weeksPassed} wk`;
      };


    return (
        <motion.div style={{display:'flex', justifyContent:'center'}} ref={ref} animate={{opacity: inView ? 1 : 0, y: inView ? 0 : -80}} transition={{duration:1,  type:'spring'}}>
            <div className='post-preview-container'>
                <div style={{display:'flex', flexDirection:'column', gap:'0', position:'relative', left:'0.5rem'}}>
                    <p style={{fontFamily:'helvetica', color:'silver', position:'relative'}}>BY <span style={{color:'black', fontWeight:'bold'}}>JACOB HOLLIS.</span></p>
                    <p style={{fontWeight:'200', fontFamily:'helvetica', fontSize:'0.8rem', color:'darkgreen', position:'relative', bottom:'1rem'}}>Posted {getTimestamp()} ago</p>
                </div>
                <p style={{fontFamily:'helvetica', fontSize:'2rem', textDecoration:'underline', textDecorationThickness:'' color:'black', fontWeight:'bold', position:'relative', left:'0.5rem', textTransform:'uppercase'}}>{title}</p>
                <div style={{display:'flex', flexDirection:'row', gap:'0.3rem'}}>
                    {tags.map((tag) => {
                        return (
                            <p key={tag} className='tag-to-view'>#{tag}</p>
                        )
                    })}
                </div>
                <hr style={{width:'100%', borderStyle:'solid', borderColor:'silver', borderWidth:'0.05rem'}}></hr>
                <PostBody content={content}/>
            </div>
        </motion.div>
    )
}   