import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import AddUpdate from './pages/AddUpdate';
import Home from './pages/Home';
import About from './pages/About';
import Search from './pages/Search';
import Sidebar from './pages/Sidebar';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import View from './pages/View';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Sidebar />
        <Navbar />
        <ToastContainer position='top-center' />
        <Routes>
          {/* <Route exact path='/' element={<Authentication />} /> */}
          <Route exact path='/professor' element={<Home />} />
          <Route path='/add' element={<AddUpdate />} />
          <Route path='/update/:id' element={<AddUpdate />} />
          <Route path='/aluno/:id' element={<View />} />
          <Route path='/about' element={<About />} />
          <Route path='/search' element={<Search />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
