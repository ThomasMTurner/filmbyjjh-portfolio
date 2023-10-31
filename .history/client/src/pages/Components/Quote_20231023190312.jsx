
export default function Quote(props){
    return <div className="QuoteBox">
      <div className='quotemarkswrapper1'>
        <QuotationMarks className='quotemarksup'/>
      </div>
      <div className="quotewrapper">
        <h1>
          {props.quote}
        </h1>
      </div>
      <div className="referencewrapper">
        <h2>
            {props.reference} 
        </h2>
      </div>
      <div className='quotemarkswrapper2'>
        <QuotationMarks className='quotemarksdown'/>
      </div>
    </div>
  }
