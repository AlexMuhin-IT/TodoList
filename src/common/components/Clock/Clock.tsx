import React, {useEffect, useState} from 'react';
import s from './Clock.module.css'

const getTwoDigitalsString = (num: number) => num < 10 ? '0' + num : num;
export const Clock = () => {

    const [date, setDate] = useState(new Date());
    useEffect(() => {
        setInterval(() => {
            setDate(date);
        }, 1000)
    }, [])

    return (
        <div className={s.container}>
            <h6>{getTwoDigitalsString(date.getHours())}:</h6>
            <h6>{getTwoDigitalsString(date.getMinutes())}:</h6>
            <h6>{getTwoDigitalsString(date.getSeconds())}</h6>
        </div>
    );
};

