import {BiSolidQuoteLeft} from 'react-icons/bs';


export function Quote(props){
    return ( <div className="QuoteBox">
        <BsChatLeftQuoteFill size={30}/>
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