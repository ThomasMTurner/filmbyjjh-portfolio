import {BiSolidQuoteLeft} from 'react-icons/bi';
import { BiSolidQuoteRight } from 'react-icons/bi';


export function Quote(props){
    return ( <div className="QuoteBox">
        <div style={{display:'flex', width:"80%", alignItems:'center', justifyContent:'center', textAlign:'center'}}>
          <p style={{all:'initial', fontFamily:'helvetica', fontWeight:'200', fontSize:'1rem', color:'whitesmoke'}}>Awesome sauces man really get those awesome sauces</p>
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