import React, { Component } from 'react'
import '../Component/Style.css';
import Register from '../Registration/Register';
import Login from '../Registration/Login'
import Contactus from '../Extras/Contactus';
import Aboutus from '../Extras/Aboutus';
import { Link } from 'react-router-dom';

export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }

  }
  reg()
  {
    window.location='/Register';
  }
  log()
  {
    window.location='/Login'
  }
  render() {
    return (
        <>
    <div>
                <div className="intro1">
                  <h1><i>Claim Management Portal</i></h1>
                  <p>A platform where all your claims get setteled.</p><br/>
                  <button onClick={this.reg}>New User</button>
                  <button onClick={this.log}>Already Registered</button>
                </div>
                <div className="achievements">
                  <div className="work">
                    <i className="fas fa-atom"></i>
                    <p className="work-heading">Aim & Motive</p>
                    <p className="work-text">Our company aims to give the best service in the field of medical insurance, 
                      vehical insurance, life term insuranse.Our motive is that our customer is everything for us and, 
                      that our customer feels more comfortable.</p>
                  </div>
                  <div className="work">
                    <i class="fas fa-ethernet"></i>
                    <p className="work-heading">Networks</p>
                    <p className="work-text">Our company has covered a huge nymber of hospitals in all the major cities of India 
                    like Mumbai, Delhi, Chennai, Banglore, Hyderabad and many more and we also has tie ups with some hospitals in rural areas as well.</p>
                  </div>
                </div>
    </div>
    </>
    )
  }
}
