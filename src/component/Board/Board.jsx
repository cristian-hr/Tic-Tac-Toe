import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Square from '../Square/Square';
import usePlays from "../../services/usePlays";
import Swal from "sweetalert2";
import "./Board.css";

function Board(props) {

    const { roomId } = props.match.params;
    const { play, sendPlay } = usePlays(roomId);
    const [player, setPlayer] = useState({ mark: "", won: false })

    useEffect(() => {
        if (play.plays.length === 1 && player.mark === "") setPlayer({ ...player, mark: "O" })
        if (play.plays.length === 0 && player.mark !== "") setPlayer({ ...player, mark: "" })
        // eslint-disable-next-line
    }, [play])

    useEffect(() => {
        if (play.plays.filter(p => p.coord === "1a" || p.coord === "1b" || p.coord === "1c").length === 3) {
            let marks = play.plays.filter(p => p.coord === "1a" || p.coord === "1b" || p.coord === "1c").map(pp => pp.mark)
            if (marks.every(m => m === marks[0])) {
                setPlayer({ ...player, won: marks[0] })
            }
        }
        if (play.plays.filter(p => p.coord === "2a" || p.coord === "2b" || p.coord === "2c").length === 3) {
            let marks = play.plays.filter(p => p.coord === "2a" || p.coord === "2b" || p.coord === "2c").map(pp => pp.mark)
            if (marks.every(m => m === marks[0])) {
                setPlayer({ ...player, won: marks[0] })
            }
        }
        if (play.plays.filter(p => p.coord === "3a" || p.coord === "3b" || p.coord === "3c").length === 3) {
            let marks = play.plays.filter(p => p.coord === "3a" || p.coord === "3b" || p.coord === "3c").map(pp => pp.mark)
            if (marks.every(m => m === marks[0])) {
                setPlayer({ ...player, won: marks[0] })
            }
        }
        if (play.plays.filter(p => p.coord === "1a" || p.coord === "2a" || p.coord === "3a").length === 3) {
            let marks = play.plays.filter(p => p.coord === "1a" || p.coord === "2a" || p.coord === "3a").map(pp => pp.mark)
            if (marks.every(m => m === marks[0])) {
                setPlayer({ ...player, won: marks[0] })
            }
        }
        if (play.plays.filter(p => p.coord === "1b" || p.coord === "2b" || p.coord === "3b").length === 3) {
            let marks = play.plays.filter(p => p.coord === "1b" || p.coord === "2b" || p.coord === "3b").map(pp => pp.mark)
            if (marks.every(m => m === marks[0])) {
                setPlayer({ ...player, won: marks[0] })
            }
        }
        if (play.plays.filter(p => p.coord === "1c" || p.coord === "2c" || p.coord === "3c").length === 3) {
            let marks = play.plays.filter(p => p.coord === "1c" || p.coord === "2c" || p.coord === "3c").map(pp => pp.mark)
            if (marks.every(m => m === marks[0])) {
                setPlayer({ ...player, won: marks[0] })
            }
        }
        if (play.plays.filter(p => p.coord === "1a" || p.coord === "2b" || p.coord === "3c").length === 3 ||
            play.plays.filter(p => p.coord === "3a" || p.coord === "2b" || p.coord === "1c").length === 3) {

            let marks1 = play.plays.filter(p => p.coord === "1a" || p.coord === "2b" || p.coord === "3c").map(pp => pp.mark)
            let marks2 = play.plays.filter(p => p.coord === "3a" || p.coord === "2b" || p.coord === "1c").map(pp => pp.mark)

            if (marks1.every(m => m === marks1[0]) && marks1.length === 3) {

                setPlayer({ ...player, won: marks1[0] })
            }
            else if (marks2.every(m => m === marks2[0]) && marks2.length === 3) {

                setPlayer({ ...player, won: marks2[0] })
            }
        }
        if (play.plays.length === 9) {

            if (play.plays.filter(p => p.coord === "1a" || p.coord === "2b" || p.coord === "3c").length === 3 ||
                play.plays.filter(p => p.coord === "3a" || p.coord === "2b" || p.coord === "1c").length === 3) {
                let marks1 = play.plays.filter(p => p.coord === "1a" || p.coord === "2b" || p.coord === "3c").map(pp => pp.mark)
                let marks2 = play.plays.filter(p => p.coord === "3a" || p.coord === "2b" || p.coord === "1c").map(pp => pp.mark)

                if (!marks1.every(m => m === marks1[0]) && !marks2.every(m => m === marks2[0])) {
                    setPlayer({ ...player, won: "tie" })
                }
            }
        }
        // eslint-disable-next-line
    }, [play])

    useEffect(() => {
        if (player.won === "X" || player.won === "O") {
            setPlayer({ mark: "", won: false })
            Swal.fire({
                title: `Player ${player.won} won`,
                icon: "success",
                confirmButtonColor: '#353535',
                showCancelButton: true,
                cancelButtonText: "Try again",
                cancelButtonColor: '#008500',
            })
                .then((result) => {
                    if (result.isDismissed) {
                        sendPlay({ turn: "X", plays: [] })
                    }
                })
                .catch((error) => {
                    console.error(error)
                })
        }
        else if (player.won === "tie") {
            setPlayer({ mark: "", won: false })
            Swal.fire({
                title: `Tie`,
                icon: "success",
                confirmButtonColor: '#353535',
                showCancelButton: true,
                cancelButtonText: "Try again",
                cancelButtonColor: '#008500',
            })
                .then((result) => {
                    if (result.isDismissed) {
                        sendPlay({ turn: "X", plays: [] })
                    }
                })
                .then(() => {
                    if (!play.plays[0]) Swal.close()
                })
                .catch((error) => {
                    console.error(error)
                })
        }
        if (!play.plays[0]) Swal.close()
        // eslint-disable-next-line
    }, [player, play])

    function handleClick(e, coord) {
        e.preventDefault()

        if (play.plays.length === 0) {
            setPlayer({ ...player, mark: "X" })
            sendPlay({ turn: "O", plays: [...play.plays, { mark: "X", coord: coord }] })
        }

        else if (player.mark === "X" && play.plays.length % 2 === 0) {
            sendPlay({ turn: "O", plays: [...play.plays, { mark: "X", coord: coord }] })
        }
        else if (player.mark === "O" && play.plays.length % 2 !== 0) {
            sendPlay({ turn: "X", plays: [...play.plays, { mark: "O", coord: coord }] })
        }
    }

    function reset(e) {
        e.preventDefault()
        sendPlay({ turn: "X", plays: [] })
        setPlayer({ mark: "", won: false })
    }

    return (
        <div className="contBoard">
            <div className="boardNavBar">
                <div className="roomIdBoard">
                    <span>Room: <b>{roomId}</b></span>
                </div>
                <Link to={`/`} className="backToHome">
                    Home
                </Link>
            </div>
            <div className="firstRow">
                <button onClick={(e) => handleClick(e, "1a")}>
                    <Square data={play.plays.find(p => p.coord === "1a") ? play.plays.find(p => p.coord === "1a").mark : ""} />
                </button>
                <button onClick={(e) => handleClick(e, "1b")}>
                    <Square p={"tc"} data={play.plays.find(p => p.coord === "1b") ? play.plays.find(p => p.coord === "1b").mark : ""} />
                </button>
                <button onClick={(e) => handleClick(e, "1c")}>
                    <Square data={play.plays.find(p => p.coord === "1c") ? play.plays.find(p => p.coord === "1c").mark : ""} />
                </button>
            </div>
            <div className="secondRow">
                <button onClick={(e) => handleClick(e, "2a")}>
                    <Square p={"lc"} data={play.plays.find(p => p.coord === "2a") ? play.plays.find(p => p.coord === "2a").mark : ""} />
                </button>
                <button onClick={(e) => handleClick(e, "2b")}>
                    <Square p={"cc"} data={play.plays.find(p => p.coord === "2b") ? play.plays.find(p => p.coord === "2b").mark : ""} />
                </button>
                <button onClick={(e) => handleClick(e, "2c")}>
                    <Square p={"rc"} data={play.plays.find(p => p.coord === "2c") ? play.plays.find(p => p.coord === "2c").mark : ""} />
                </button>
            </div>
            <div className="thirdRow">
                <button onClick={(e) => handleClick(e, "3a")}>
                    <Square data={play.plays.find(p => p.coord === "3a") ? play.plays.find(p => p.coord === "3a").mark : ""} />
                </button>
                <button onClick={(e) => handleClick(e, "3b")}>
                    <Square p={"bc"} data={play.plays.find(p => p.coord === "3b") ? play.plays.find(p => p.coord === "3b").mark : ""} />
                </button>
                <button onClick={(e) => handleClick(e, "3c")}>
                    <Square data={play.plays.find(p => p.coord === "3c") ? play.plays.find(p => p.coord === "3c").mark : ""} />
                </button>
            </div>
            <div className="resetButtonDiv">
                <button className="resetButton" onClick={reset}>Reset</button>
            </div>
        </div>
    )
}

export default Board
