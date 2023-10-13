import logo from './logo.svg';
// import './App.css';
import './Component/Style.css';
import Home from './Component/Home';
import Register from './Registration/Register';
import Login from './Registration/Login'
import Contactus from './Extras/Contactus';
import Aboutus from './Extras/Aboutus';
import { BrowserRouter,Routes,Route,Link } from 'react-router-dom';
import Addplan from './Plans/Addplan';
import Submitclaim from './Claims/Submitclaim';
import DisplayClaim from './Claims/DisplayClaim';
import Displayplan from './Plans/Displayplan';
import Viewprofile from './Registration/Viewprofile';
import Updateplan from './Plans/Updateplan';
import Editprofile from './Registration/Editprofile';
import ForgotPassword from './Registration/ForgotPassword';
import ChangePassword from './Registration/ChangePassword';
import { BsFacebook, BsInstagram, BsTwitter} from "react-icons/bs";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <header className="header">
            <h1>Claim Management Portal</h1>
            <nav className="nav-items">
              <Link to='/Home' className='a'>Home</Link>
              <Link to="/Register" className='a'>Register</Link>
              <Link to="/Login" className='a'>Login</Link>
              <Link to="/Aboutus" className='a'>About Us</Link>
              <Link to="/Contactus" className='a'>Contact Us</Link>
            </nav>
      </header>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/Home' element={<Home/>}></Route>
        <Route  path='/Register'  element={<Register/>}/>
        <Route  path='/Login'  element={<Login/>}/>
        <Route  path='/Submitclaim'  element={<Submitclaim/>}/>
        <Route  path='/Addplan'  element={<Addplan/>}/>
        <Route  path='/DisplayClaim'  element={<DisplayClaim/>}/>
        <Route path='/Aboutus' element={<Aboutus/>}></Route>
        <Route path='/Contactus' element={<Contactus/>}></Route>
        <Route path='/Displayplan' element={<Displayplan/>}></Route>
        <Route path='/Updateplan' element={<Updateplan/>}></Route>
        <Route path='/Viewprofile' element={<Viewprofile/>}></Route>
        <Route path='/Editprofile' element={<Editprofile/>}></Route>
        <Route path='/Submitclaim' element={<Submitclaim/>}></Route>
        <Route path='/ForgotPassword' element={<ForgotPassword/>}></Route>
        <Route path='/ChangePassword' element={<ChangePassword/>}></Route>
      </Routes> 
      </BrowserRouter>
      <footer className="footer">
            <div className="copy">&copy; DOTNET + REACT BATCH2 TEAM4</div>
              <div className="links">
                <span>Social Links</span>
                <nav>
                <a href="https://www.facebook.com/"><BsFacebook/></a>
                <a href="https://twitter.com/"><BsTwitter/></a>
                <a href="https://www.instagram.com/"><BsInstagram/></a>
                </nav>
              </div>
          </footer>
    </div>
  );
}

export default App;
