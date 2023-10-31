import {RiChatQuoteFilled} from 'react-icons/ri'
export function Quote(props){
    return ( <div className="QuoteBox">
        <h1 style={{color:'black', fontSize:'1rem'}}>
          {props.quote}
        </h1>
        <h2 style={{color:'black', fontSize:'1rem'}}>
            {props.reference} 
        </h2>
      </div>
    )
  }


export default function QuotesContainer (props) {
  return(
    <div className='sub-quotes-container'>
      <div>
        {props.quotes.map((quote, index) => (
          <Quote key={index} quote={quote.quote} reference={quote.reference} />
        ))}
      </div>
    </div>
  )
}