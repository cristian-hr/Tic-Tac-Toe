import { useState } from "react";
import { useHistory } from "react-router-dom";

import "./Home.css";

function Home() {

    const [roomName, setRoomName] = useState("");
    const history = useHistory()

    const handleRoomNameChange = (event) => {
        setRoomName(event.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        history.push(`/${roomName}`)
    }

    return (
        <div className="home-container">
            <div className="homeTitle">
                <b>Tic Tac Toe</b>
            </div>
            <div className="homeInstru">
                <p>To start, create or join a room by writing the name or the number of the room</p>
            </div>
            <div className="homeInput">
                <form className="homeForm" action="" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Room"
                        value={roomName}
                        onChange={handleRoomNameChange}
                        className="text-input-field"
                        required
                    />
                    <input className="enter-room-button" type="submit" onSubmit={handleSubmit} value="Join room"/>
                </form>
            </div>
        </div>
    );
};

export default Home;
