import {BsChevronDown} from 'react-icons/bs';
import {AiOutlineSearch} from 'react-icons/ai';
import {useState} from 'react';
import {MdCheck} from 'react-icons/md';

const FilterDateBetweenBounds = (props) => {
    return (
        <div className='center-aligned-row-box' style={{gap:'0.5rem'}}>
            <p style={{fontFamily:'helvetica', fontWeight:'200'}}>From</p>
            <input type='text' className='filter-input'></input>
            <p style={{fontFamily:'helvetica', fontWeight:'200'}}>To</p>
            <input type='text' className='filter-input'></input>
            <MdCheck color='black' size={20}/>
        </div>
    )
}

const FilterDateSubMenu = (props) => {

    return (
        <>
            <div className='filters-list'>
                <div className='center-aligned-row-box' style={{gap:'0.3rem'}}>
                    <p style={{fontFamily:'helvetica', fontWeight:'200'}}>Oldest</p>
                    <button style={{all:'unset'}} onClick={() => props.setQuery({})}>
                        <MdCheck size={20}/>
                    </button>
                </div>
                <div className='center-aligned-row-box' style={{gap:'0.3rem'}}>
                    <p style={{fontFamily:'helvetica', fontWeight:'200'}}>Most recent</p>
                    <button style={{all:'unset'}}>
                        <MdCheck size={20}/>
                    </button>
                </div>
                <FilterDateBetweenBounds/>
            </div>
        </>
    )
}

const FilterTagSubMenu = (props) => {
    return (
        <div>
        </div>
    )
}

const FilterMenu = (props) => {
    const [showFilters, setShowFilters] = useState(false);


    return (
        <div className='filter-menu'>
            <div className='center-aligned-row-box'>
                <p style={{fontFamily:'helvetica', fontWeight:'bold'}}>Filter by {props.filterType}</p>
                <BsChevronDown
                color='black'
                onClick={() => setShowFilters(!showFilters)} 
                className={`${showFilters ? 'chevron-down' : 'chevron-up'}`}/>
            </div>
            {showFilters && props.filterType == 'date' && <FilterDateSubMenu setQuery={props.setQuery}/> || props.filterType == 'tags' && <FilterTagSubMenu setQuery={props.setQuery}/>}
        </div>
    )
}

const SearchBar = (props) => {
    //need handler for change to search input when doing search component



    return (
        <div className='center-aligned-row-box' style={{gap:'1rem'}}>
            <p style={{fontFamily:'helvetica', fontWeight:'bold'}}>Search by keyword</p>
            <input type='text' className='search-input'></input>
            <AiOutlineSearch size={20} color='silver' style={{position:'relative', right:'3rem'}} />
        </div>
    )
}



export default function SearchBarContainer (props) {

    return (
        <div className='center-aligned-row-box search-bar-container' style={{gap:'2rem'}}>
            <FilterMenu filterType="date" setQuery={props.setQuery}/>
            <FilterMenu filterType="tags" setQuery={props.setQuery}/>
            <SearchBar setQuery={props.setQuery} />
        </div>
    )
}