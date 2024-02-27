import React, { useState, useEffect } from 'react';

const Timer = () => {
    const targetDate = new Date('2023-12-31'); // Set your target date here
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    function calculateTimeLeft() {
        const difference = targetDate.getTime() - new Date().getTime();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 *60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }

        return timeLeft;
    }

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            {Object.keys(timeLeft).length > 0 ? (
                <div className='d-flex justify-content-evenly'>
                    <p className='d-flex flex-column'><samp className='h1 text-success'>{timeLeft.days}</samp> <span className='text-white h5'> Days</span></p>
                    <p className='d-flex flex-column'><samp className='h1 text-success'>{timeLeft.hours}</samp> <span className='text-white h5'> Hours</span></p>
                    <p className='d-flex flex-column'><samp className='h1 text-success'>{timeLeft.minutes}</samp> <span className='text-white h5'>Minutes</span> </p>
                    <p className='d-flex flex-column'><samp className='h1 text-success'>{timeLeft.seconds}</samp> <span className='text-white h5'>Seconds</span> </p>
                </div>
            ) : (
                <p>Countdown has ended!</p>
            )}
        </div>
    );
};

export default Timer;