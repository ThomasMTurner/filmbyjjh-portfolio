import {ImCross} from 'react-icons/im';
import {useEffect} from 'react';


export function FilterTag(props) {
  return (
    <div className='filter-tag-wrapper'>
      <button type='button'><ImCross color='red' size={15}/></button>
      <p>{props.tag}</p>
    </div>
  )
}


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


//New state: props.tagsPerRow (need to pass to the tags in editor page) and props.isTag (true = normal tag, false = filter tag)
export default function TagsContainer(props) {
    if (props.tags) {
        const rows = [];
        for (let i = 0; i < props.tags.length; i += props.tagsPerRow) {
          const rowTags = props.tags.slice(i, i + props.tagsPerRow);
          rows.push(
            <div key={i} style={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
              {props.isTag && rowTags.map((tag, index) => (
                <Tag key={index} index={index} tag={tag} tags={props.tags} setValidationErrors = {props.setValidationErrors} setPostData={props.setPostData} />
              ))}
              {!props.isTag && rowTags.map((tag, index) => (
                <FilterTag key={index} index={index} tag={tag} tags={props.tags}/>
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