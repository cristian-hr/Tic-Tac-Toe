import Board from '../component/Board/Board';
import Home from "../component/Home/Home";
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path="/" component={Home}></Route>
        <Route path="/:roomId" component={Board}></Route>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
