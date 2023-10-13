import React, { useRef,Component } from 'react'
import axios from 'axios';
import emailjs from 'emailjs-com';
import '../Component/Style.css'
import { BrowserRouter,Routes,Route,Link } from 'react-router-dom';

export default class Login extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      userName:'',
      password:'',
      memberId:'',
      usernameerr:'',
      passworderr:''
    }
    
    this.submit=this.submit.bind(this);
    this.handlechange=this.handlechange.bind(this);
    this.BtnSubmit=this.BtnSubmit.bind(this);
    this.forgot=this.forgot.bind(this)
  }
  submit()
  {
      let userName=this.state.userName;
      let password=this.state.password;
      let memberId=this.state.memberId;
      let url="https://localhost:44302/api/Registration/"+userName+","+password;
      axios.post(url,{
        userName:this.state.userName,
        password:this.state.password
      }).then(response=>{
          if(response.data.memberId!=null)
          {
              alert("Login successfull")
              sessionStorage.setItem("id",response.data.memberId);
              window.location="/Displayplan"
          }
          else{
              alert("id/pass is wrong");
          }
      }).catch(error=>{
          alert(error);
      });
  }
  BtnSubmit()
    {
      this.setState({
        usernameerr:'',
        passworderr:''
      })
      if(this.Validate())
      {
        this.submit();
      }
    }
    Validate()
    {
      if(!this.state.userName && this.state.password.length<5)
      {
        this.setState({usernameerr:"InvalidUserName",passworderr:"Password lenght should be more than 5 character"})
      }
      else if(!this.state.userName.includes(""))
      {
        this.setState({usernameerr:"InvalidUserName"})
      }
      else if(this.state.password.length<5)
      {
        this.setState({passworderr:"Password lenght should be more than 5 character"})
      }
      else{
        return true;
      }
    }
  handlechange(object)
  {
      this.setState(object);
  }
  reg()
  {
    window.location='/Register'
  }
  back()
  {
    window.location='/'
  }
  forgot()
  {
    window.location='/ForgotPassword'
  }
  change()
  {
    window.location='/ChangePassword'
  }
render() {
  return (
    <div align="center">
      <div className="intro1">
        <h2>User Login</h2>
            <table border={6}>
        <tr>
          <td><label>User Name</label></td>
          <td><input type="text" name='userName' onChange={(e)=>this.handlechange({userName:e.target.value})}></input></td>
          <h6 style={{color:"red"}}>{this.state.usernameerr}</h6>
        </tr>
        <tr>
        <td><label>Password</label></td>
        <td><input type="password" name="password" onChange={(e)=>this.handlechange({password:e.target.value})}></input></td>
        <h6 style={{color:"red"}}>{this.state.passworderr}</h6>
        </tr>
      </table>
      <button onClick={this.BtnSubmit}>LogIn</button>
      <nav> 
      <button onClick={this.forgot}>Forgot Password</button>
      <button onClick={this.change}>Change Password</button>
      </nav>
      <br/>
      <nav>
        <button onClick={this.back}>Back</button>
      <button onClick={this.reg}>Register</button>
      </nav>
            </div>
      </div>
    )
  }
}
