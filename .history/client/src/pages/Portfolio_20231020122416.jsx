import { useNavigate } from 'react-router-dom';
import { BiArrowToRight } from 'react-icons/bi';

const PortfolioCard = (props) => {
    const navigate = useNavigate();

    return (
        <div className='portfolio-card'>
            <p>{props.title}</p>
            <button type="button" onClick={() => navigate(`/portfolio/${props.title.toLowerCase().slice(0, 5)}`)}>View more <BiArrowToRight color={'blue'} size={20} /></button>
            <p>{props.desc}</p>
        </div>
    )
}
export default function Portfolio() {
    return(
        <div>
        <p>Welcome to my portfolio</p>
        <div style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', width:'100%'}}>
            <PortfolioCard title="Photo" desc="Photography" />
            <PortfolioCard title="Video" desc="Videography" />
        </div>
    )
}