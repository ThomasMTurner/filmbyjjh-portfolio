import {BiSolidQuoteLeft} from 'react-icons/bi';
import {BiSolidQuoteRight } from 'react-icons/bi';


export function Quote(props) {
  return (
    <div className="QuoteBox">
      <div className="Quote">
        <BiSolidQuoteLeft />
        <p className="QuoteText">{props.quote}</p>
        <BiSolidQuoteRight />
      </div>
      <p className="Reference">{props.reference}</p>
    </div>
  );
}


export default function QuotesContainer (props) {
  return (
    <div className='sub-quotes-container'>
      <div>
        {Object.entries(props.quotes).map(([quote, reference]) => {
          return (
            <Quote key={quote} quote={quote} reference={reference} />
          )
        })}
      </div>
    </div>
  )
}