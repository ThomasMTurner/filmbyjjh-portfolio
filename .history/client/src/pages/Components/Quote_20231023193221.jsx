export function Quote(props){
    console.log(props.quote);
    return ( <div className="QuoteBox">
        <h1 style={{color:'black', fontSize:'10rem'}}>
          {props.quote}
        </h1>
        <h2>
            {props.reference} 
        </h2>
      </div>
    )
  }


export default function QuotesContainer (props) {
  console.log(props.quotes)
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