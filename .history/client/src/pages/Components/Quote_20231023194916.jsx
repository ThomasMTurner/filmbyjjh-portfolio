import {BiSolidQuoteLeft} from 'react-icons/bi';
import { BiSolidQuoteRight } from 'react-icons/bi';


export function Quote(props){
    return ( <div className="QuoteBox">
        <div style={{display:'flex', flexDirection:'row', backgroundColor:'blue'}}>
          <BiSolidQuoteLeft size={30} color={'black'} />
        </div>
        <p style={{fontFamily:'helvetica', fontWeight:'200', fontSize:'1rem', padding:0, color:'whitesmoke'}}>Awesome sauce</p>
        <div>
          <BiSolidQuoteRight size={30} color={'black'}  />
        </div>
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