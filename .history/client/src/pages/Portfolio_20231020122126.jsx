import { useNavigate } from 'react-router-dom';
import {BiArrowRight}

const PortfolioCard = (props) => {
    const navigate = useNavigate();
    return (
        <div className='portfolio-card'>
            <p>{props.title}</p>
        </div>
    )
}
export default function Portfolio() {
    
}