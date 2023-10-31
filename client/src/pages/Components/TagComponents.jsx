import { ImCross } from 'react-icons/im';
import { useState, useEffect } from 'react';


export function FilterTag (props) {
  //should be selected by default to show all results
  const [isSelected, setIsSelected] = useState(true);
  
  useEffect(() => {
    if (isSelected) {
      props.setActiveTags((prevTags) => [...prevTags, props.tag])
    }
    else {
      props.setActiveTags((prevTags) => prevTags.filter((tag) => tag !== props.tag))
    }
  }, [isSelected])

  return (
    <div onClick={() => setIsSelected(!isSelected)} className={`filter-tag-wrapper ${isSelected ? 'filter-tag-selected' : 'filter-tag-deselected'}`}>
      <p style={{fontWeight:'bold'}}>{props.tag}</p>
      <p style={{color:'whitesmoke'}}>{props.count}</p>
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
    for (let i = 0; i < (Array.isArray(props.tags) ? props.tags.length : Object.keys(props.tags).length); i += props.tagsPerRow) {
      const rowTags = Array.isArray(props.tags) ? props.tags.slice(i, i + props.tagsPerRow) : Object.entries(props.tags).slice(i, i + props.tagsPerRow);

      rows.push(
        <div key={i} style={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
          {!props.isFilterTag && rowTags.map((tag, index) => (
            <Tag key={index} index={index} tag={tag} tags={props.tags} />
          ))}
          {props.isFilterTag && rowTags.map(([tag, count], index) => (
            <FilterTag setActiveTags = {props.setActiveTags} key={index} index={index} tag={tag} count={count} tags={props.tags} />
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