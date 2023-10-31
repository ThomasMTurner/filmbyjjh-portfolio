import {BsChevronDown} from 'react-icons/bs';
import {AiOutlineSearch} from 'react-icons/ai';
import {useState, useEffect} from 'react';
import {MdCheck} from 'react-icons/md';
import TagsContainer from './TagComponents';
import axios from 'axios';
import Calendar from 'react-calendar';
import { format } from 'date-fns';
import { enGB } from 'date-fns/locale';
import 'react-calendar/dist/Calendar.css';

const FilterDateBound = (props) => {
    const handleDateChange = (date) => {
        props.setSelectedDates((prevDates) => {
            return {
                ...prevDates,
                [props.bound]: date
            }
        })
    };

    return (
        <div>
            <Calendar onChange={(date) => handleDateChange(date)} />
        </div>
    )
}



const FilterDateBetweenBounds = (props) => {
    const [selectedDates, setSelectedDates] = useState({'lower': null, 'upper': null});
    const [selectedDatesToShow, setSelectedDatesToShow] = useState({'lower': null, 'upper': null});
    const [focuses, setFocuses] = useState({'lower': false, 'upper': false});
    const [buttonColour, setButtonColour] = useState('green');

    //changes date to appropriate format in input format on change.
    useEffect(() => {
        Object.entries(selectedDates).map(([bound, value]) => {
            if (value) {
                let formattedDate = format(value, 'dd/MM/yyyy', {locale: enGB});
                setSelectedDatesToShow((prevDates) => {
                    return {
                        ...prevDates,
                        [bound]: formattedDate
                    }
                })
            }
        })

        
    }, [selectedDates]);


    return (
        <div className='center-aligned-row-box' style={{gap:'0.5rem'}}>
            <p style={{fontFamily:'helvetica', fontWeight:'200'}}>From</p>
            <div style={{display:'flex', flexDirection:'column'}}>
                <input value = {selectedDatesToShow.lower} onClick={() => setFocuses((prevFocuses) => ({...prevFocuses, 'lower': !(prevFocuses.lower)}))} type='text' className='filter-input'></input>
                {focuses.lower && <FilterDateBound setSelectedDates = {setSelectedDates} bound = 'lower' />}
            </div>
            <p style={{fontFamily:'helvetica', fontWeight:'200'}}>To</p>
            <div style={{display:'flex', flexDirection:'column'}}>
                <input value = {selectedDatesToShow.upper} onClick={() => setFocuses((prevFocuses) => ({...prevFocuses, 'upper': !(prevFocuses.upper)}))} type='text' className='filter-input'></input>
                {focuses.upper && <FilterDateBound setSelectedDates = {setSelectedDates} bound = 'upper' />}
            </div>
            <MdCheck onClick={() => props.setQuery({...props.query, 'dateLower': selectedDates.lower, 'dateUpper': selectedDates.upper})} color={buttonColour} size={20}/>
        </div>
    )
}

const FilterDateSubMenu = (props) => {
    const [buttonColours, setButtonColours] = useState({'check1': 'black', 'check2': 'black'});
    const handleFilterPress = (sort, check) => {
        props.setQuery({...props.query, 'sort': sort});
        setButtonColours((prevData) => ({ ...prevData, [check]: 'green', ...Object.fromEntries(Object.keys(prevData).filter(field => field !== check).map(field => [field, 'black'])) }));
    };

    return (
        <>
            <div className='filters-list'>
                <div className='center-aligned-row-box' style={{gap:'0.3rem'}}>
                    <p style={{fontFamily:'helvetica', fontWeight:'200'}}>Oldest</p>
                    <button style={{all:'unset'}} onClick={() => handleFilterPress('oldest', 'check1')}>
                        <MdCheck color={buttonColours['check1']} size={20}/>
                    </button>
                </div>
                <div className='center-aligned-row-box' style={{gap:'0.3rem'}}>
                    <p style={{fontFamily:'helvetica', fontWeight:'200'}}>Most recent</p>
                    <button style={{all:'unset'}} onClick={() => handleFilterPress('most recent', 'check2')}>
                        <MdCheck color={buttonColours['check2']} size={20}/>
                    </button>
                </div>
                <FilterDateBetweenBounds query = {props.query} setQuery = {props.setQuery}/>
            </div>
        </>
    )
}

const FilterTagSubMenu = (props) => {
    //consists of a map of tags to their count (instances in all posts)
    const [filterTags, setFilterTags] = useState({});
    const [activeTags, setActiveTags] = useState([]);


    //make GET request to '/get-tags', then put this response into a list
    const getFilterTags = () => {
        axios.get('http://localhost:7182/get-tags')
        .then((response) => {
            setFilterTags(response.data);
        })
    }

    useEffect(() => {
        getFilterTags();
    }, []);

    

    useEffect(() => {
        props.setQuery({...props.query, 'filterTags': activeTags});
    }, [activeTags]);
    

    return (
        <div>
            {props.showFilters &&
            <TagsContainer setActiveTags = {setActiveTags} tagsPerRow = {3} isFilterTag={true} tags={filterTags} setQuery={props.setQuery}/>
            }
        </div>
    )
}

const FilterMenu = (props) => {
    const [showFilters, setShowFilters] = useState(false);

    return (
        <div className='filter-menu'>
            <div className='center-aligned-row-box'>
                <p style={{fontFamily:'helvetica', fontWeight:'200'}}>Filter by {props.filterType}</p>
                <BsChevronDown
                color='white'
                onClick={() => setShowFilters(!showFilters)} 
                className={`${showFilters ? 'chevron-down' : 'chevron-up'}`}/>
            </div>
            {showFilters && 
            <>
                <hr style={{borderStyle:'solid', borderColor:'black', position:'relative', bottom:'0.5rem'}}></hr>
                {props.filterType == 'date' && <FilterDateSubMenu showFilters = {showFilters} query = {props.query} setQuery={props.setQuery}/> || props.filterType == 'tags' && <FilterTagSubMenu showFilters = {showFilters} setQuery={props.setQuery}/>}
            </>
            }
        </div>
    )
}

const SearchBar = (props) => {
    const [buttonColour, setButtonColour] = useState('silver');
    const [searchQuery, setSearchQuery] = useState(null);

    const searchQueryMaxLength = 30;
    //need to copy data change handler for search-input
    const handleSearchChange = (event) => {
        const { value } = event.target;
        if ((value.length) < (searchQueryMaxLength + 1)) {
            setSearchQuery(value);
        }

    }
 

    //need handler for change to search input when doing search component
    return (
        <div className='center-aligned-row-box' style={{gap:'1rem'}}>
            <p style={{fontFamily:'helvetica', fontWeight:'200'}}>Search by title</p>
            <input type='text' className='search-input' onChange={(event) => handleSearchChange(event)}></input>
            <AiOutlineSearch onMouseEnter={() => setButtonColour('black')} onMouseLeave={() => setButtonColour('silver')} onClick={() => props.setQuery({...props.query, 'search': searchQuery})} size={20} color={buttonColour} style={{position:'relative', right:'3rem'}} />
        </div>
    )
}



export default function SearchBarContainer (props) {
    return (
        <div className='center-aligned-row-box search-bar-container' style={{gap:'2rem'}}>
            <FilterMenu filterType = "date" query = {props.query} setQuery = {props.setQuery}/>
            <FilterMenu filterType = "tags" query = {props.query} setQuery = {props.setQuery}/>
            <SearchBar query = {props.query} setQuery = {props.setQuery} />
        </div>
    )
}