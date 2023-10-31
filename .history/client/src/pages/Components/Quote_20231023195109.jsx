import {BiSolidQuoteLeft} from 'react-icons/bi';
import { BiSolidQuoteRight } from 'react-icons/bi';


export function Quote(props){
    return ( <div className="QuoteBox">
        <div style={{display:'flex', flexDirection:'row', backgroundColor:'blue', width:'100%'}}>
          <BiSolidQuoteLeft size={30} color={'black'} />
        </div>
        <div></div>
        <p style={{fontFamily:'helvetica', fontWeight:'200', fontSize:'1rem', color:'whitesmoke'}}>Awesome sauce</p>
        <div style={{display:'flex', flexDirection:'row'}}>
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