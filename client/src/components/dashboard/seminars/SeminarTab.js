import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getSeminars } from '../../../actions/seminar'
import Moment from 'react-moment'

import SeminarEvent from './SeminarEvent';
import AddSeminar from './AddSeminar';

import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import { Calendar } from "react-modern-calendar-datepicker";

const SeminarTab = ({ getSeminars, seminar : { seminars } }) => {

    const [selectedSeminars, setSelectedSeminars] = useState([]); // fills out existing seminars on calendar
    const [currDate, setCurrDate] = useState(new Date());
    const [chosenSeminars, setChosenSeminars] = useState([]); // displays all seminars that exist on a given date (clicked by user)
    const [toggle, setToggle] = useState(false);

    useEffect(() => { 
        getSeminars(); 
    }, [getSeminars]);

    useEffect(() => { 
        const allSeminars = seminars.map(sem => new Date(sem.dateOfEvent));
        
        let tempSems = [];
        allSeminars.forEach(sem => tempSems.push({
            "year": sem.getFullYear(),
            "month": sem.getMonth() + 1,
            "day": sem.getDate() + 1,
            "className": "purpleDay"
        }));

        setSelectedSeminars(tempSems);
    }, [seminars]);

    const setSelectedDays = (date) => {
        let tempSeminars = seminars.filter(sem => ( // get seminar dates that macth with click item in calendar
            new Date(sem.dateOfEvent).getDate() === (date.day - 1) &&
            new Date(sem.dateOfEvent).getMonth() === (date.month -1)  &&
            new Date(sem.dateOfEvent).getFullYear() === date.year
        ));

        setCurrDate(new Date(date.year, date.month - 1, date.day));
        setChosenSeminars(tempSeminars);
        setToggle(!toggle);
    };

    return (
        <div className="seminar p-1">
            <p className="form-text header-text p-1">Click on circled date to view planned seminar</p>
            <div className="seminar-inner-1">
            <Calendar
                shouldHighlightWeekends
                onChange={setSelectedDays}
                customDaysClassName={selectedSeminars}
            />
            </div>
            <div className="seminar-inner-2">
                {chosenSeminars.length > 0 && toggle &&
                    <p className="form-text header-text"><strong>All Seminars on <Moment format='MMMM Do YYYY'>{currDate}</Moment></strong></p>
                }
                {chosenSeminars.length > 0 && toggle && 
                    chosenSeminars.map(sem => (
                        <SeminarEvent sem={sem} setToggle={setToggle} toggle={toggle} key={sem._id}/>
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
