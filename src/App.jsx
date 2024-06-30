import { useState, useEffect, useRef } from 'react'

import './App.css'

function App() {


    const [breakTime, setBreakTime] = useState(2)

    const [sessionTime, setSessionTime] = useState(1)
    const [seconds, setSeconds] = useState(sessionTime * 60);
    const [state, setState] = useState(true)
    const [isBreak, setIsBreak] = useState(true)
    const audioRef = useRef()

    useEffect(() => {

        if (seconds == 0) {
            audioRef.current.play()
            console.log('entered')
            if (isBreak) {
                console.log("break")
                setSeconds(breakTime * 60)
            } else {
                console.log("session")
                setSeconds(sessionTime * 60)
            }
            setIsBreak(prevState => !prevState)

        }

        if (!state) {

            const timer = setInterval(() => {
                setSeconds((prevSeconds) => prevSeconds - 1);
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [seconds, state]);

    const formatTime = (timeInSeconds) => {
        const minutes = Math.floor(timeInSeconds / 60)
            .toString()
            .padStart(2, '0');
        const seconds = (timeInSeconds % 60).toString().padStart(2, '0');
        return `${minutes}:${seconds}`;

    };




    function startStopTimer() {
        setState(prevState => !prevState)

    }


    const increment = (numb, whichOne) => {

        if (state && !isBreak && seconds > 60) {
            if (whichOne === "break") {
                setBreakTime(numb + 1)
                setSeconds((breakTime + 1) * 60)
            }
            else {
                setSessionTime(numb + 1)
            }

        }

        else if (state && isBreak) {
            if (whichOne === "break") {
                setBreakTime(numb + 1)
            } else {
                setSessionTime(numb + 1)
                setSeconds((sessionTime + 1) * 60)
            }
        }

    }

    const decrement = (numb, whichOne) => {

        if (state && !isBreak) {
            if (whichOne === "break" && numb > 1) {
                setBreakTime(numb - 1)
                setSeconds((breakTime - 1) * 60)
            }
            else {
                if (numb > 1) { setSessionTime(numb - 1) }
            }

        }

        else if (state && isBreak) {
            if (whichOne === "break" && numb > 1) {
                setBreakTime(numb - 1)
            } else if (numb > 1) {

                setSessionTime(numb - 1)
                setSeconds((sessionTime - 1) * 60)

            }
        }

    }
    console.log(sessionTime)

    const Reset = () => {
        setBreakTime(5)
        setIsBreak(true)
        setSessionTime(25)
        setSeconds(sessionTime * 60)
        setState(true)
        audioRef.current.pause()

    }

    const colorChange = () => {
        if (seconds < 60) {
            return { color: "red" }
        } else {
            return { color: 'white' }
        }
    }

    return (
        <>
            <div className="container">
                <h2 id="timer-label">{isBreak ? 'Session' : 'Break'}</h2>

                <h1 style={colorChange()}>{formatTime(seconds)}</h1>
                <p id="break-label">Break Length</p>
                <p id="session-label">Session Length</p>

                <button id="break-decrement" onClick={() => decrement(breakTime, "break")}>Break Decrement</button>
                <button id="session-decrement" onClick={() => decrement(sessionTime, false)}>Session Decrement</button>

                <button id="break-increment" onClick={() => increment(breakTime, "break")}>Break Increment</button>
                <button id="session-increment" onClick={() => increment(sessionTime, false)}>Session Increment</button>

                <p id="break-length">Break: {breakTime}</p>
                <p id="session-length">Session: {sessionTime}</p>

                <p id="timer-label">{isBreak ? 'Session' : 'Break'}</p>
                <button id="start_stop" onClick={startStopTimer}>{state ? "Start" : "Stop"}</button>
                <button id="reset" onClick={() => Reset()}>Reset</button>
            </div>
            <audio src="https://bigsoundbank.com/UPLOAD/mp3/0925.mp3" ref={audioRef} id="beep"></audio>
        </>

    )
}

export default App
