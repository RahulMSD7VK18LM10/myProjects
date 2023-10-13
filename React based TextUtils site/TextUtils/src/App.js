import React, { useState } from 'react';
import './App.css';
// import About from './components/About';
import Navbar from './components/Navbar';
import TextForm from './components/TextForm';
import Alert from './components/Alert';
import About from './components/About';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

//props can be used to transfer variable from one file to another like here
function App() {
  const [mode, setMode] = useState('light'); //whther dark mode is enabled or not
  const [alert, setAlert] = useState(null);
  
  const showAlert = (message,type) =>{
    setAlert({
      msg:message,
      type:type
    })
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  }
  const toggleMode = () =>{
    if(mode === 'light'){
      setMode('dark');
      document.body.style.backgroundColor = 'grey';
      showAlert("Dark mode has been enabled","success");
    }
    else{
      setMode('light');
      document.body.style.backgroundColor = 'white';
      showAlert("Light mode has been enabled","success");
    }
  }
  return (
    <>
    <Router>
    <Navbar title="Textutils" aboutText="About TextUtils" mode={mode} toggleMode={toggleMode}/>
    {/* passing parameters */}
    <Alert alert={alert}/>
    <div className="container my-3">
        <Routes>
          <Route exact path="/about" element={<About mode={mode}/>}></Route>
          <Route exact path="/" element={<TextForm showAlert={showAlert} heading="Enter the text to analyze below" mode={mode}/>}></Route>
        </Routes>
    </div>
    </Router>
    </>
  );
}

export default App;
