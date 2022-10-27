import { Routes, Route } from "react-router-dom";
import Header from './Components/Header/Header';
import NavBar from './Components/NavBar/NavBar';
import Home from './Components/Home/Home';
import Search from './Components/Search/Search';
import NotFound from './Components/NotFound/NotFound';
import './App.scss';

const App = (): JSX.Element => {
  return (
    <>
      <Header />
      <div className='wrapper'>
        <NavBar />
        <div className='wrapper-content'>
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="address" element={<Search />} />
              <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </> 
  );
};

export default App;
