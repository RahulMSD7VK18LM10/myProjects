import React, { Component } from 'react'
import axios from 'axios';

export default class ChangePassword extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      userName:'',
      password:'',
      npassword:'',
      usernameerr:'',
      passworderr:'',
      npassworderr:''
    }
    this.submit=this.submit.bind(this);
    this.handlechange=this.handlechange.bind(this);
    this.BtnSubmit=this.BtnSubmit.bind(this);
  }
  submit()
  {
      let userName=this.state.userName;
      let password=this.state.password;
      let npassword=this.state.npassword;
      let url="https://localhost:44302/api/Registration?uname="+userName+"&password="+password+"&npassword="+npassword;
      axios.patch(url,{
        userName:this.state.userName,
        password:this.state.password,
        npassword:this.state.npassword
      }).then(response=>{
          if(response.data!=null)
          {
            if(response.data!=npassword)
            {
              alert("Password Changed Successfully")
              window.location="/Login"
            }
            else
            {
              alert("New Password and Current Password cannot be Same")
              this.setState({
                password:'',
                npassword:''
              })
            }
          }
          else{
              alert("id or password is wrong");
          }
      }).catch(error=>{
          alert(error);
      });
  }
  BtnSubmit()
  {
    this.setState({
      usernameerr:'',
      passworderr:'',
      npassworderr:''
    })
    if(this.Validate())
    {
      this.submit();
    }
  }
Validate()
  {
    if(!this.state.userName && !this.state.password.length && !this.state.npassword)
    {
      this.setState({usernameerr:"Please Enter UserName",
      passworderr:"Password cannot be empty",
      npassworderr:"New Password cannot be empty"})
    }
    else if(!this.state.password.length && !this.state.npassword)
    {
      this.setState({passworderr:"Password cannot be empty",
      npassworderr:"New Password cannot be empty"})
    }
    else if(!this.state.npassword)
    {
      this.setState({npassworderr:"New Password cannot be empty"})
    }
    // else if(this.state.password===this.state.npassword)
    // {
    //   this.setState({
    //     passworderr:"Current Password and New Password",
    //     npassworderr:"Cannot be Same!Please Try Something New"
    //   })
    // }
    else{
      return true;
    }
  }
handlechange(object)
  {
      this.setState(object);
  }
back()
  {
    window.location='/Login'
  }
  render() {
    return (
      <div align="center">
      <div className="intro1">
        <h2>Password Change</h2>
            <table border={6}>
        <tr>
          <td><label>User Name</label></td>
          <td><input type="text" name='userName' onChange={(e)=>this.handlechange({userName:e.target.value})}></input></td>
          <h6 style={{color:"red"}}>{this.state.usernameerr}</h6>
        </tr>
        <tr>
        <td><label>Current Password</label></td>
        <td><input type="password" name="password" onChange={(e)=>this.handlechange({password:e.target.value})}></input></td>
        <h6 style={{color:"red"}}>{this.state.passworderr}</h6>
        </tr>
        <tr>
        <td><label>New Password</label></td>
        <td><input type="password" name="npassword" onChange={(e)=>this.handlechange({npassword:e.target.value})}></input></td>
        <h6 style={{color:"red"}}>{this.state.npassworderr}</h6>
        </tr>
      </table>
      <button onClick={this.BtnSubmit}>LogIn</button>
      <nav> 
      </nav>
      <br/>
      <nav>
        <button onClick={this.back}>Back</button>
      </nav>
            </div>
      </div>
    )
  }
}
