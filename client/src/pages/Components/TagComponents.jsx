import {ImCross} from 'react-icons/im';
import {useEffect} from 'react';


export function Tag (props) {
    const clearTag = () => {
        if (props.tags.length < 10){
            props.setValidationErrors((prevErrors) => ({
                ...prevErrors,
                tag: ''
            }))


        }
        props.tags.splice(props.index, 1);
        props.setPostData(prevData => {
            return {
                ...prevData,
                'tags': props.tags
            }
        })
    }


    return (
        <div className='tag-wrapper'>
            <p>{props.tag}</p>
            <button style={{all:'unset'}} onClick={() => clearTag()} type='button'><ImCross color='red' size={15}/></button>
        </div>
    )
}


//Will wrap in a larger div with a column flex direction per row. Based on how many tags we can fit.export default function TagsContainer(props) {
export default function TagsContainer(props) {
    if (props.tags) {
        const rows = [];
        for (let i = 0; i < props.tags.length; i += 6) {
          const rowTags = props.tags.slice(i, i + 6);
          rows.push(
            <div key={i} style={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
              {rowTags.map((tag, index) => (
                <Tag key={index} index={index} tag={tag} tags={props.tags} setValidationErrors = {props.setValidationErrors} setPostData={props.setPostData} />
              ))}
            </div>
          );
        }
      
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {rows}
          </div>
        );
      }
}