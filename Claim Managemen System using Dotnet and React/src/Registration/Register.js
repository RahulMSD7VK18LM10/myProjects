import React, { Component } from 'react'
import axios from 'axios';
import Login from './Login';
import Aboutus from '../Extras/Aboutus';
import Contactus from '../Extras/Contactus';
import { BrowserRouter,Routes,Route,Link } from 'react-router-dom';
import '../Component/Style.css'
export default class Register extends Component {
  constructor(props) {
    
    super(props)
  
    this.state = {
       memberId:'',
       memberName:'',
       userName:'',
       password:'',
       confirmPassword:'',
       address:'',
       state:'',
       country:'',
       email:'',
       contactNo:'',
       dob:'',
       memberIderr:'',
      memberNameerr:'',
      userNameerr:'',
      passworderr:'',
      confirmPassworderr:'',
      addresserr:'',
      stateerr:'',
      countryerr:'',
      emailerr:'',
      contactNoerr:'',
      doberr:''
    }
    this.handlechange=this.handlechange.bind(this);
    this.newmember=this.newmember.bind(this);
    this.btnsubmit=this.btnsubmit.bind(this);
    this.validate=this.validate.bind(this);
  }
  newmember()
      {
        let url='https://localhost:44302/api/Registration';
        axios.post(url,{
            memberId:this.state.memberId,
            memberName:this.state.memberName,
            userName:this.state.userName,
            password:this.state.password,
            confirmPassword:this.state.confirmPassword,
            address:this.state.address,
            state:this.state.state,
            country:this.state.country,
            email:this.state.email,
            contactNo:this.state.contactNo,
            dob:this.state.dob
        }).then(respone=>{
            window.location="/Addplan"
        }).catch(error=>{alert("Error")});
      }
btnsubmit()
{
  this.setState({
    memberIderr:'',
    memberNameerr:'',
    userNameerr:'',
    passworderr:'',
    confirmPassworderr:'',
    addresserr:'',
    stateerr:'',
    countryerr:'',
    emailerr:'',
    contactNoerr:'',
    doberr:''
  })
  if(this.validate())
  {
    this.newmember();
  }
}
validate()
{  
  if(!this.state.memberId&&!this.state.memberName&& !this.state.userName&&!this.state.password&&!this.state.confirmPassworderr&& !this.state.address&&!this.state.state&&!this.state.country&&!this.state.email&&!this.state.contactNo&&!this.state.dob)
  {
    this.setState({memberIderr:"Please enter Member Id",memberNameerr:"Please enter memberName",userNameerr:"Please enter userName ",
        passworderr:"Please enter password",confirmPassworderr:"Please enter password",
        addresserr:"Address must be provided",stateerr:"Enter state Name",countryerr:"Enter the country name",
        emailerr:"Must enter email",contactNoerr:"Enter the contactno",doberr:"Must enter DOB"})
  }
  else if(!this.state.memberName&& !this.state.userName&&!this.state.password&&!this.state.confirmPassworderr&& !this.state.address&&!this.state.state&&!this.state.country&&!this.state.email&&!this.state.contactNo&&!this.state.dob)
  {
    this.setState({memberNameerr:"Please enter memberName",userNameerr:"Please enter userName ",
        passworderr:"Please enter password",confirmPassworderr:"Please enter password",
        addresserr:"Address must be provided",stateerr:"Enter state Name",countryerr:"Enter the country name",
        emailerr:"Must enter email",contactNoerr:"Enter the contactno",doberr:"Must enter DOB"})
  }
  else if(!this.state.userName&&!this.state.password&&!this.state.confirmPassworderr&& !this.state.address&&!this.state.state&&!this.state.country&&!this.state.email&&!this.state.contactNo&&!this.state.dob)
  {
    this.setState({userNameerr:"Please enter userName ",passworderr:"Plese enter password",confirmPassworderr:"Please re-enter password",
        addresserr:"Address must be provided",stateerr:"Enter state Name",countryerr:"Enter the country name",
        emailerr:"Must enter email",contactNoerr:"Enter the contactno",doberr:"Must enter DOB"})
  }     
  else if(!this.state.password&&!this.state.confirmPassworderr&&!this.state.address&&!this.state.state&&!this.state.country&&!this.state.email&&!this.state.contactNo&&!this.state.dob)
      {
        this.setState({passworderr:"Plese enter password",confirmPassworderr:"Please re-enter password",
        addresserr:"Address must be provided",stateerr:"Enter state Name",countryerr:"Enter the country name",
        emailerr:"Must enter email",contactNoerr:"Enter the contactno",doberr:"Must enter DOB"})
      }
      else if(!this.state.confirmPassworderr&&!this.state.address&&!this.state.state&&!this.state.country&&!this.state.email&&!this.state.contactNo&&!this.state.dob)
      {
        this.setState({confirmPassworderr:"Please re-enter password",
        addresserr:"Address must be provided",stateerr:"Enter state Name",countryerr:"Enter the country name",
        emailerr:"Must enter email",contactNoerr:"Enter the contactno",doberr:"Must enter DOB"})
      }
      else if(!this.state.address&&!this.state.state&&!this.state.country&&!this.state.email&&!this.state.contactNo&&!this.state.dob)
      {
        this.setState({addresserr:"Address must be provided",stateerr:"Enter state Name",countryerr:"Enter the country name",
        emailerr:"Must enter email",contactNoerr:"Enter the contactno",doberr:"Must enter DOB"})
      }
      else if(this.state.state==null&&this.state.country==null&&this.state.email==null&&this.state.contactNo==null&&this.state.dob==null)
      {
        this.setState({stateerr:"Enter state Name",countryerr:"Enter the country name",
        emailerr:"Must enter email",contactNoerr:"Enter the contactno",doberr:"Must enter DOB"})

      }
      else if(!this.state.country&&!this.state.email&&!this.state.contactNo&&!this.state.dob)
      {
        this.setState({countryerr:"Enter the country name",emailerr:"Must enter email",contactNoerr:"Enter the contactno",doberr:"Must enter DOB"})
      }
      else if(!this.state.email&&!this.state.contactNo&&!this.state.dob==null)
      {
        this.setState({emailerr:"Must enter email",contactNoerr:"Enter the contactno",doberr:"Must enter DOB"})
      }
      else if(!this.state.contactNo&&!this.state.dob)
      {
        this.setState({contactNoerr:"Enter the contactno",doberr:"Must enter DOB"})
      }
      else if(!this.state.dob)
      {
        this.setState({doberr:"Must enter DOB"})
      }
      else if(!this.state.email.includes("@"))
      {
        this.setState({emailerr:"Invalid Email"})
      }
      else if(this.state.password!==this.state.confirmPassword)
      {
        this.setState({passworderr:"Password and confirm password",confirmPassworderr:"doesnot match"})
      }
      else{
        return true;
      }
}
handlechange(changeObject){
        this.setState(changeObject)
    }
    login()
    {
      window.location='/Login'
    }
    back()
    {
      window.location='/'
    }
  render() {
    return (
      <>
      <div align="center">
      <div className="intro">
        <h2>Add Your Details</h2>
    <table border={2} align="center">
            <tr>
                <td>
                  <label>Member ID</label></td>
                  <td><input type='text' name="memberId" 
                onChange={(e)=>this.handlechange({memberId:e.target.value})}></input></td>
                <h6 style={{color:"red"}}>{this.state.memberIderr}</h6>
            </tr>
            <tr>
                <td><label>Member Name</label></td>
                  <td><input type='text' name="memberName" 
                onChange={(e)=>this.handlechange({memberName:e.target.value})}></input></td>
                <h6 style={{color:"red"}}>{this.state.memberNameerr}</h6>
            </tr>
            <tr>
                <td><label>UserName</label></td>
                <td><input type='text' name="userName" 
                onChange={(e)=>this.handlechange({userName:e.target.value})}></input></td>
                <h6 style={{color:"red"}}>{this.state.userNameerr}</h6>
            </tr>
            <tr>
                <td><label>Password</label></td>
                  <td><input type='password' name="password" 
                onChange={(e)=>this.handlechange({password:e.target.value})}></input></td>
                <h6 style={{color:"red"}}>{this.state.passworderr}</h6>
            </tr>
            <tr>
                <td><label>Confirm Password</label></td>
                <td><input type='text' name="confirmPassword" 
                onChange={(e)=>this.handlechange({confirmPassword:e.target.value})}></input></td>
                <h6 style={{color:"red"}}>{this.state.confirmPassworderr}</h6>
            </tr>
            <tr>
                <td><label>Address</label></td>
                <td><input type='text' name="address" 
                onChange={(e)=>this.handlechange({address:e.target.value})}></input></td>
                <h6 style={{color:"red"}}>{this.state.addresserr}</h6>
            </tr>
            <tr>
                <td><label>State</label></td>
                <td><input type='text' name="state" 
                onChange={(e)=>this.handlechange({state:e.target.value})}></input></td>
                <h6 style={{color:"red"}}>{this.state.stateerr}</h6>
            </tr>
            <tr>
                <td><label>Country</label></td>
                <td><input type='text' name="country" 
                onChange={(e)=>this.handlechange({country:e.target.value})}></input></td>
                <h6 style={{color:"red"}}>{this.state.countryerr}</h6>
            </tr>
            <tr>
                <td><label>Email</label></td>
                <td><input type='text' name="email" 
                onChange={(e)=>this.handlechange({email:e.target.value})}></input></td>
                <h6 style={{color:"red"}}>{this.state.emailerr}</h6>
            </tr>
            <tr>
                <td><label>Contact No</label></td>
                <td><input type='text' name="contactNo" 
                onChange={(e)=>this.handlechange({contactNo:e.target.value})}></input></td>
                <h6 style={{color:"red"}}>{this.state.contactNoerr}</h6>
            </tr>
            <tr>
                <td><label>DOB</label></td>
                <td><input type='date' name="dob" 
                onChange={(e)=>this.handlechange({dob:e.target.value})}></input></td>
                <h6 style={{color:"red"}}>{this.state.doberr}</h6>
            </tr>
        </table>
        <button onClick={this.btnsubmit}>Proceed</button>
        <br/>
        <nav>
        <button onClick={this.back}>Back</button>
      <button onClick={this.login}>Login</button>
      </nav>
        </div>
      </div>
      </>
    )
  }
}
