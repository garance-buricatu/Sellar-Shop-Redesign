import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getSeminars } from '../../actions/seminar'
import Moment from 'react-moment'

// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';

import Calendar from 'react-calendar-multiday'
import SeminarEvent from './SeminarEvent';
import AddSeminar from './AddSeminar';

const SeminarTab = ({ getSeminars, seminar : { seminars } }) => {

    const [allSeminarDates, setAllSeminarDates] = useState([]);

    useEffect(() => { 
        getSeminars(); 
    }, [getSeminars]);

    useEffect(() => { 
        setAllSeminarDates(seminars.map(sem => new Date(sem.dateOfEvent)));
    }, [seminars]);

    const [currDate, setCurrDate] = useState(new Date());
    const [chosenSeminars, setChosenSeminars] = useState([]);
    const [toggle, setToggle] = useState(false);

    const onChange = date => {
        const newDate = new Date(date.current); // get date that user clicked on (on calendar)
        
        let tempSeminars = seminars.filter(sem => ( // get seminar dates that macth with click item in calendar
            new Date(sem.dateOfEvent).getDate() === newDate.getDate() &&
            new Date(sem.dateOfEvent).getMonth() === newDate.getMonth() &&
            new Date(sem.dateOfEvent).getFullYear() === newDate.getFullYear()
        ));
        
        setCurrDate(newDate);
        setChosenSeminars(tempSeminars);
        setToggle(!toggle);
    }

    return (
        <div className="seminar p-1">
            <p className="form-text header-text p-1">Click on shaded date to view planned seminar</p>
            <div className="seminar-inner-1">
            <Calendar
                isMultiple={true}
                selected={allSeminarDates}
                onChange={date => onChange(date)}
            />
            </div>
            <div className="seminar-inner-2">
                {chosenSeminars.length > 0 && toggle && 
                    <p className="form-text header-text"><strong>All Seminars on <Moment format='MMMM Do YYYY'>{currDate}</Moment></strong></p>
                }
                {chosenSeminars.length > 0 && toggle && 
                    chosenSeminars.map(sem => (
                        <SeminarEvent sem={sem}/>
                    ))
                }
            </div>
            <div className="seminar-inner p-2 m-1">
                <h1 className="lead">Add Seminar</h1>
                <AddSeminar />
            </div>
        </div>
    )
}

SeminarTab.propTypes = {
    getSeminars: PropTypes.func.isRequired,
    seminar: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    seminar: state.seminar
});

export default connect(mapStateToProps, { getSeminars })(SeminarTab)
