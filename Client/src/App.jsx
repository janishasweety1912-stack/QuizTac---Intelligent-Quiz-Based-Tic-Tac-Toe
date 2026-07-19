import { useState } from "react";
import GameMode from "./components/GameMode";
import PlayerSetup from "./components/PlayerSetup";
import Board from "./components/Board";


function App(){

    const [mode,setMode] = useState(null);
    const [players,setPlayers] = useState(null);

    function startGame(data){
        setPlayers(data);
    }

    return (
        <>
        {
            mode===null &&
            <GameMode setMode={setMode}/>
        }
        {
            mode!==null && players===null &&
            <PlayerSetup
                mode={mode}
                startGame={startGame}
            />
        }
        {
            players!==null &&
            <Board players={players} mode={mode}/>
        }
        </>
    )
}

export default App;