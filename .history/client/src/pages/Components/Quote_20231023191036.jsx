
export default function Quote(props){
    return ( <div className="QuoteBox">
        <h1>
          {props.quote}
        </h1>
      </div>
      <div className="referencewrapper">
        <h2>
            {props.reference} 
        </h2>
      </div>
    </div>
    )
  }
