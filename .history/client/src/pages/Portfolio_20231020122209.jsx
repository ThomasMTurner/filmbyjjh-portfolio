import { useNavigate } from 'react-router-dom';
import { BiArrowToRight } from 'react-icons/bi';

const PortfolioCard = (props) => {
    const navigate = useNavigate();
    return (
        <div className='portfolio-card'>
            <p>{props.title}</p>
            <button type="button"
        </div>
    )
}
export default function Portfolio() {
    
}