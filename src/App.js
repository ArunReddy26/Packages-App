
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FavouritePage from './Favourite';
import AddFavourite from './Pages/AddFavourite';


function App() {
  return (
    <div className="App">

      <Router>
        <Routes>
          <Route path="/" element={<FavouritePage/>}/>
          <Route path="/add-favorite" element={<AddFavourite />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
