function Quote(props){
    return ( <div className="QuoteBox">
        <h1>
          {props.quote}
        </h1>
        <h2>
            {props.reference} 
        </h2>
      </div>
    )
  }

  
export default function QuotesContainer (props) {
  return(
    <div className='quotes-container'>
      {props.quotes.map((quote, index) => (
        <Quote key={index} quote={quote.quote} reference={quote.reference} />
      ))}
    </div>
  )
}