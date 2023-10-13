import React, { Component } from 'react'
import axios from 'axios';

export default class Editprofile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      memberName:'',
      userName:'',
      address:'',
      state:'',
      country:'',
      email:'',
      contactNo:'',
      dob:'',
      //validation
      memberNameerr:'',
      userNameerr:'',
      addresserr:'',
      stateerr:'',
      countryerr:'',
      emailerr:'',
      contactNoerr:'',
      doberr:''
    }
    this.editprofile=this.editprofile.bind(this);
    this.handleChange=this.handleChange.bind(this);
    this.btnsubmit=this.btnsubmit.bind(this);
    this.validate=this.validate.bind(this);
  }
editprofile()
{
        let memberId=sessionStorage.getItem('id');
        let url="https://localhost:44302/api/Registration?id=" + memberId;
        axios.put(url,{
            memberName:this.state.memberName,
            userName:this.state.userName,
            address:this.state.address,
            state:this.state.state,
            country:this.state.country,
            email:this.state.email,
            contactNo:this.state.contactNo,
            dob:this.state.dob
        }).then(response=>{
            console.log(response.data)
            alert("Profile Updated");
            window.location='/Viewprofile'
        }).catch(error=>{
            alert(error);
        });
}
    //validation
btnsubmit()
    {
      this.setState({
        memberNameerr:'',
        userNameerr:'',
        addresserr:'',
        stateerr:'',
        countryerr:'',
        emailerr:'',
        contactNoerr:'',
        doberr:''
      })
      if(this.validate())
      {
        this.editprofile();
      }
    }
validate()
{  
      if(!this.state.memberName&& !this.state.userName&& !this.state.address&&!this.state.state&&!this.state.country&&!this.state.email&&!this.state.contactNo&&!this.state.dob)
      {
        this.setState({memberNameerr:"Please enter memberName",userNameerr:"Please enter userName ",
        addresserr:"Address must be provided",stateerr:"Enter state Name",countryerr:"Enter the country name",
        emailerr:"Must enter email",contactNoerr:"Enter the contactno",doberr:"Must enter DOB"})
      }
      else if(!this.state.userName&&!this.state.address&&!this.state.state&&!this.state.country&&!this.state.email&&!this.state.contactNo&&!this.state.dob)
      {
        this.setState({userNameerr:"Please enter userName ",
        addresserr:"Address must be provided",stateerr:"Enter state Name",countryerr:"Enter the country name",
        emailerr:"Must enter email",contactNoerr:"Enter the contactno",doberr:"Must enter DOB"})
      }
      else if(!this.state.address&&!this.state.state&&!this.state.country&&!this.state.email&&!this.state.contactNo&&!this.state.dob)
      {
        this.setState({addresserr:"Address must be provided",stateerr:"Enter state Name",countryerr:"Enter the country name",
        emailerr:"Must enter email",contactNoerr:"Enter the contactno",doberr:"Must enter DOB"})
      }
      else if(!this.state.state&&!this.state.country&&!this.state.email&&!this.state.contactNo&&!this.state.dob)
      {
        this.setState({stateerr:"Enter state Name",countryerr:"Enter the country name",
        emailerr:"Must enter email",contactNoerr:"Enter the contactno",doberr:"Must enter DOB"})

      }
      else if(!this.state.country&&!this.state.email&&!this.state.contactNo&&!this.state.dob)
      {
        this.setState({countryerr:"Enter the country name",emailerr:"Must enter email",contactNoerr:"Enter the contactno",doberr:"Must enter DOB"})
      }
      else if(!this.state.email&&!this.state.contactNo&&!this.state.dob)
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
      else{
        return true;
      }
}
logoutp()
{
  sessionStorage.removeItem("id");
            window.location='/';
}
back()
{
  window.location='/Viewprofile'
}
handleChange(object)
{
  this.setState(object);
}
render() {
    if(sessionStorage.getItem('id')==null)
    {
        window.location="/";
    }
    else{
        this.state.memberId=sessionStorage.getItem('id');
    }
    return (
      <div>
        <div className='intro'>
        <h2>Welcome {this.state.memberId} enter your details</h2>
        <table border={12} align="center">
            <tr>
            <td>
                <label>memberName</label></td>
                <td><input type="text" name="memberName" onChange={(e)=>this.handleChange({memberName:e.target.value})}></input>
            </td>
            <h6 style={{color:"red"}}>{this.state.memberNameerr}</h6>
            </tr>
            <tr>
            <td>
                <label>userName</label></td>
                <td><input type="text" name="userName" onChange={(e)=>this.handleChange({userName:e.target.value})}></input>
            </td>
            <h6 style={{color:"red"}}>{this.state.userNameerr}</h6>
            </tr>
            <tr>
            <td>
                <label>address</label></td>
                <td><input type="text" name="address" onChange={(e)=>this.handleChange({address:e.target.value})}></input>
            </td>
            <h6 style={{color:"red"}}>{this.state.addresserr}</h6>
            </tr>
            <tr>
            <td>
                <label>state</label></td>
                <td><input type="text" name="state" onChange={(e)=>this.handleChange({state:e.target.value})}></input>
            </td>
            <h6 style={{color:"red"}}>{this.state.stateerr}</h6>
            </tr>
            <tr>
            <td>
                <label>country</label></td>
                <td><input type="text" name="country" onChange={(e)=>this.handleChange({country:e.target.value})}></input>
            </td>
            <h6 style={{color:"red"}}>{this.state.countryerr}</h6>
            </tr>
            <tr>
            <td>
                <label>email</label></td>
                <td><input type="text" name="email" onChange={(e)=>this.handleChange({email:e.target.value})}></input>
            </td>
            <h6 style={{color:"red"}}>{this.state.emailerr}</h6>
            </tr>
            <tr>
            <td>
                <label>contactNo</label></td>
                <td><input type="text" name="contactNo" onChange={(e)=>this.handleChange({contactNo:e.target.value})}></input>
            </td>
            <h6 style={{color:"red"}}>{this.state.contactNoerr}</h6>
            </tr>
            <tr>
            <td>
                <label>dob</label></td>
                <td><input type="date" name="dob" onChange={(e)=>this.handleChange({dob:e.target.value})}></input>
            </td>
            <h6 style={{color:"red"}}>{this.state.doberr}</h6>
            </tr>
        </table>
        <button onClick={this.btnsubmit}>submit</button>
        <br></br>
                <button onClick={this.back}>Back</button>
                <button onClick={this.logoutp}>Logout</button>
        </div>
      </div>
    )
  }
}
