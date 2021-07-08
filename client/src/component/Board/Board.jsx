import { useState, useEffect } from "react"
import Square from '../Square/Square';
import usePlays from "../../services/usePlays"
import "./Board.css"

function Board(props) {

    const { roomId } = props.match.params;
    const { play, sendPlay } = usePlays(roomId);
    
    const [playerMark , setPlayerMark] = useState("")

    useEffect(()=> {
        if (play.plays.length === 1 && playerMark === "") setPlayerMark("O")
        if (play.plays.length === 0 && playerMark !== "") setPlayerMark("")
    },[play]) 

    useEffect(() => {
        if (play.plays.filter(p => p.coord === "1a" || p.coord === "1b" || p.coord === "1c").length === 3) {
            let marks = play.plays.filter(p => p.coord === "1a" || p.coord === "1b" || p.coord === "1c").map(pp => pp.mark)
            if (marks.every(m => m === marks[0])) {
                alert(`Player ${marks[0]} won`)
                sendPlay({turn: "X", plays:[]})
            }
        }
        if (play.plays.filter(p => p.coord === "2a" || p.coord === "2b" || p.coord === "2c").length === 3) {
            let marks = play.plays.filter(p => p.coord === "2a" || p.coord === "2b" || p.coord === "2c").map(pp => pp.mark)
            if (marks.every(m => m === marks[0])) {
                alert(`Player ${marks[0]} won`)
                sendPlay({turn: "X", plays:[]})
            }
        }
        if (play.plays.filter(p => p.coord === "3a" || p.coord === "3b" || p.coord === "3c").length === 3) {
            let marks = play.plays.filter(p => p.coord === "3a" || p.coord === "3b" || p.coord === "3c").map(pp => pp.mark)
            if (marks.every(m => m === marks[0])) {
                alert(`Player ${marks[0]} won`)
                sendPlay({turn: "X", plays:[]})
            }
        }
        if (play.plays.filter(p => p.coord === "1a" || p.coord === "2a" || p.coord === "3a").length === 3) {
            let marks = play.plays.filter(p => p.coord === "1a" || p.coord === "2a" || p.coord === "3a").map(pp => pp.mark)
            if (marks.every(m => m === marks[0])) {
                alert(`Player ${marks[0]} won`)
                sendPlay({turn: "X", plays:[]})
            }
        }
        if (play.plays.filter(p => p.coord === "1b" || p.coord === "2b" || p.coord === "3b").length === 3) {
            let marks = play.plays.filter(p => p.coord === "1b" || p.coord === "2b" || p.coord === "3b").map(pp => pp.mark)
            if (marks.every(m => m === marks[0])) {
                alert(`Player ${marks[0]} won`)
                sendPlay({turn: "X", plays:[]})
            }
        }
        if (play.plays.filter(p => p.coord === "1c" || p.coord === "2c" || p.coord === "3c").length === 3) {
            let marks = play.plays.filter(p => p.coord === "1c" || p.coord === "2c" || p.coord === "3c").map(pp => pp.mark)
            if (marks.every(m => m === marks[0])) {
                alert(`Player ${marks[0]} won`)
                sendPlay({turn: "X", plays:[]})
            }
        }
        if (play.plays.filter(p => p.coord === "1a" || p.coord === "2b" || p.coord === "3c").length === 3 ||
            play.plays.filter(p => p.coord === "3a" || p.coord === "2b" || p.coord === "1c").length === 3) {

            let marks1 = play.plays.filter(p => p.coord === "1a" || p.coord === "2b" || p.coord === "3c").map(pp => pp.mark)
            let marks2 = play.plays.filter(p => p.coord === "3a" || p.coord === "2b" || p.coord === "1c").map(pp => pp.mark)

            if (marks1.every(m => m === marks1[0]) && marks1.length === 3) {
                
                alert(`Player ${marks1[0]} won`)
                sendPlay({turn: "X", plays:[]})
            }
            else if (marks2.every(m => m === marks2[0]) && marks2.length === 3) {
                
                alert(`Player ${marks2[0]} won`)
                sendPlay({turn: "X", plays:[]})
            }
        }
        if (play.plays.length === 9) {

            if (play.plays.filter(p => p.coord === "1a" || p.coord === "2b" || p.coord === "3c").length === 3 ||
                play.plays.filter(p => p.coord === "3a" || p.coord === "2b" || p.coord === "1c").length === 3) {
                let marks1 = play.plays.filter(p => p.coord === "1a" || p.coord === "2b" || p.coord === "3c").map(pp => pp.mark)
                let marks2 = play.plays.filter(p => p.coord === "3a" || p.coord === "2b" || p.coord === "1c").map(pp => pp.mark)

                if (!marks1.every(m => m === marks1[0]) && !marks2.every(m => m === marks2[0])) {
                    alert(`Draw`)
                    sendPlay({turn: "X", plays:[]})
                }
            }
        }
    // eslint-disable-next-line
    }, [play])

    function handleClick(e, coord) {
        e.preventDefault()

        if (play.plays.length === 0) {
            console.log("holaaaa")
            setPlayerMark("X")
            sendPlay({turn: "O", plays:[...play.plays,{ mark: "X", coord: coord }]})
        }

        // if (play.plays.find(p => p.coord === coord)) {
        //     alert("Select other square")
        // }

        else if (playerMark === "X" && play.plays.length%2 === 0) {
            sendPlay({turn: "O", plays:[...play.plays,{ mark: "X", coord: coord }]})
        }
        else if (playerMark === "O" && play.plays.length%2 !== 0){
            sendPlay({turn: "X", plays:[...play.plays,{ mark: "O", coord: coord }]})
        }
    }

    function reset(e) {
        e.preventDefault()
        sendPlay({turn: "X", plays:[]})
        setPlayerMark("")
    }

    return (
        <div className="contBoard">
            <div className="resetButtonDiv">
                <button className="resetButton" onClick={reset}>Reset</button>
            </div>
            <div className="firstRow">
                <button onClick={(e) => handleClick(e, "1a")}>
                    <Square data={play.plays.find(p => p.coord === "1a") ? play.plays.find(p => p.coord === "1a").mark : ""} />
                </button>
                <button onClick={(e) => handleClick(e, "1b")}>
                    <Square data={play.plays.find(p => p.coord === "1b") ? play.plays.find(p => p.coord === "1b").mark : ""} />
                </button>
                <button onClick={(e) => handleClick(e, "1c")}>
                    <Square data={play.plays.find(p => p.coord === "1c") ? play.plays.find(p => p.coord === "1c").mark : ""} />
                </button>
            </div>
            <div className="secondRow">
                <button onClick={(e) => handleClick(e, "2a")}>
                    <Square data={play.plays.find(p => p.coord === "2a") ? play.plays.find(p => p.coord === "2a").mark : ""} />
                </button>
                <button onClick={(e) => handleClick(e, "2b")}>
                    <Square data={play.plays.find(p => p.coord === "2b") ? play.plays.find(p => p.coord === "2b").mark : ""} />
                </button>
                <button onClick={(e) => handleClick(e, "2c")}>
                    <Square data={play.plays.find(p => p.coord === "2c") ? play.plays.find(p => p.coord === "2c").mark : ""} />
                </button>
            </div>
            <div className="thirdRow">
                <button onClick={(e) => handleClick(e, "3a")}>
                    <Square data={play.plays.find(p => p.coord === "3a") ? play.plays.find(p => p.coord === "3a").mark : ""} />
                </button>
                <button onClick={(e) => handleClick(e, "3b")}>
                    <Square data={play.plays.find(p => p.coord === "3b") ? play.plays.find(p => p.coord === "3b").mark : ""} />
                </button>
                <button onClick={(e) => handleClick(e, "3c")}>
                    <Square data={play.plays.find(p => p.coord === "3c") ? play.plays.find(p => p.coord === "3c").mark : ""} />
                </button>
            </div>
        </div>
    )
}

export default Board
