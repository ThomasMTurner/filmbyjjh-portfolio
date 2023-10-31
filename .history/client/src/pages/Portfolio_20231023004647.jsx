import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { BsBoxArrowUpRight } from 'react-icons/bs';
const PortfolioCard = (props) => {
    const navigate = useNavigate();
    const [hovering, setHovering] = useState(false);
    const lowerCaseTitle = props.title.toLowerCase();
    const isVideography = lowerCaseTitle === "videography";
    const isPhotography = lowerCaseTitle === "photography";
  
    return (
      <div
        onClick={() => navigate(`/portfolio/${lowerCaseTitle.slice(0, 5)}`)}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        className={`portfolio-card portfolio-card-${lowerCaseTitle}`}
      >
        <div>
          <p
            style={{
              fontFamily: 'helvetica',
              fontWeight: 'bold',
              fontSize: '2.5rem',
              color: isVideography ? 'white' : isPhotography ? 'black' : '',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
              textDecoration:'underline',
              textDecorationThickness:'4px',
            }}
          >
            {props.title}
          </p>
        </div>
        <button
          className={`portfolio-card-button ${hovering ? 'portfolio-card-button-hover' : ''}`}
          type="button"
          onClick={() => navigate(`/portfolio/${lowerCaseTitle.slice(0, 5)}`)}
        >
          View more <BsBoxArrowUpRight color={'blue'} size={15} />
        </button>
          <p
            style={{
              fontFamily: 'helvetica',
              fontWeight: '200',
              fontSize: '1rem',
              color: isVideography ? 'white' : isPhotography ? 'black' : '',
            }}
          >
            {props.desc}
          </p>
      </div>
    );
  };
export default function Portfolio() {
    return(
        <div style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', width:'100%', gap:'5rem', minHeight:'75rem', position:'relative', backgroundColor:'white'}}>
            <div style={{display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center', width:'100%', gap:'5rem'}}>
                <PortfolioCard title="Photography" desc="Click here to see all of my latest photography shoots. I provide these services both professionally and freelance, presenting new products, venues and concepts to their respective " />
                <PortfolioCard title="Videography" desc="Click here to get all of my latest shoots with companies across numerous industries including healthcare and construction" />
            </div>
        </div>
    )
}