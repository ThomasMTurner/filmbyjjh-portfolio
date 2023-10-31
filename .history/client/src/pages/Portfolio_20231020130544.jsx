import { useNavigate } from 'react-router-dom';
import {BsBoxArrowUpRight, BsArrowRight} from 'react-icons/bs';

const PortfolioCard = (props) => {
    const navigate = useNavigate();
    console.log(props.title.toLowerCase().slice(0, 5))
    return (
        <div className={`portfolio-card portfolio-card-${props.title.toLowerCase()}`}>
            <p style={{fontFamily:'helvetica', fontWeight:'bold', fontSize:'2.5rem', color:'black'}}>{props.title}</p>
            <button className='portfolio-card-button' type="button" onClick={() => navigate(`/portfolio/${props.title.toLowerCase().slice(0, 5)}`)}>View more <BsBoxArrowUpRight color={'blue'} size={15} /></button>
            <p style={{fontFamily:'helvetica', fontWeight:'200', fontSize:'1rem'}}>{props.desc}</p>
        </div>
    )
}
export default function Portfolio() {
    return(
        <div style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', width:'100%', gap:'5rem', minHeight:'75rem', position:'relative', bottom:'5rem'}}>
            <p style={{fontFamily:'helvetica', fontWeight:'200', fontSize:'2.5rem', color:'silver'}}>THIS IS MY PORTFOLIO</p>
            <div style={{display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center', width:'100%', gap:'5rem'}}>
                <PortfolioCard title="Photography" desc="Click here to get all of my latest shoots with companies across numerous industries including healthcare and construction" />
                <PortfolioCard title="Videography" desc="Click here to get all of my latest shoots with companies across numerous industries including healthcare and construction" />
            </div>
        </div>
    )
}