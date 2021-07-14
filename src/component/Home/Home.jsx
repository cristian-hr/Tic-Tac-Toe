import { useState } from "react";
import { Link } from "react-router-dom";

import "./Home.css";

function Home() {

    const [roomName, setRoomName] = useState("");

    const handleRoomNameChange = (event) => {
        setRoomName(event.target.value);
    };

    return (
        <div className="home-container">
            <div className="homeTitle">
                <b>Tic Tac Toe</b>
            </div>
            <div className="homeInstru">
                <p>To start, create or join a room by writing the name or the number of the room</p>
            </div>
            <div className="homeInput">
                <input
                    type="text"
                    placeholder="Room"
                    value={roomName}
                    onChange={handleRoomNameChange}
                    className="text-input-field"
                    required
                />
                <Link to={`/${roomName}`} className="enter-room-button">
                    Join room
                </Link>
            </div>

        </div>
    );
};

export default Home;
