import React, { useState, useEffect } from 'react'
import { Icon } from 'semantic-ui-react';


const DateInput = ({ i, semDates, setSemDates }) => {
    const [removeColor, setRemoveColor] = useState(false);

    const [formData, setFormData] = useState({
        startTime: '',
        endTime: '',
        dateOfEvent:''
    });

    const { startTime, endTime, dateOfEvent } = formData;

    const onChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    useEffect(() => {

        let tempDates = [...semDates];
        tempDates[i] = formData;
        setSemDates(tempDates);
    }, [formData]);

    const removeDate = () => {
        let tempDates = [...semDates];
        tempDates.splice(i, 1);
        setSemDates(tempDates);
    }

    return (
        <div className="date-input p-1" key={i}>
            <Icon className="remove-date"
                onMouseEnter={() => setRemoveColor(!removeColor)}
                onMouseLeave={() => setRemoveColor(!removeColor)}
                name={`large ${!removeColor ? 'red' : 'black'} times circle outline`} 
                onClick={() => removeDate()
            }></Icon>
             <div className="date-input-inner">
                <p>
                    <strong>Date of Seminar : </strong>
                </p>
                <input 
                    type="date"
                    name="dateOfEvent"
                    value={dateOfEvent}
                    onChange={e => onChange(e)}
                />
            </div>
            <div className="date-input-inner">
                <p>
                    <strong>Start time : </strong>
                </p>
                <input 
                    type="text"
                    placeholder="HH:MM AM"
                    name="startTime"
                    value={startTime}
                    onChange={e => onChange(e)}
                />
            </div>
            <div className="date-input-inner">
                <p>
                    <strong>End time : </strong>
                </p>
                <input 
                    type="text"
                    placeholder="HH:MM AM"
                    name="endTime"
                    value={endTime}
                    onChange={e => onChange(e)}
                />
            </div>
        </div>
    )
}

export default DateInput
