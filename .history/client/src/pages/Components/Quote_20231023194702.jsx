import {BiSolidQuoteLeft} from 'react-icons/bi';
import { BiSolidQuoteRight } from 'react-icons/bi';


export function Quote(props){
    return ( <div className="QuoteBox">
        <BiSolidQuoteLeft size={30} color={'black'} style={{position:'relative', bottom:'5rem', right:'4rem'}} />
        <p style={{}}>Awesome sauce</p>
        <BiSolidQuoteRight size={30} color={'black'} style={{position:'relative', top:'3rem', left:'7rem'}} />
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