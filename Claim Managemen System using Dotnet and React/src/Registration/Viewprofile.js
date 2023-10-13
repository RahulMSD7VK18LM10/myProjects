import React, { Component } from 'react'
import axios from 'axios';

export default class Viewprofile extends Component {
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
      dob:''
    }
    this.handleChange=this.handleChange.bind(this);
    this.viewprofile=this.viewprofile.bind(this);
  }
viewprofile()
{
  let memberId=sessionStorage.getItem('id');
        let url="https://localhost:44302/api/Registration/"+memberId;
        axios.get(url).then(response=>{
            this.setState({
              memberName:response.data.memberName,
              userName:response.data.userName,
              address:response.data.address,
              state:response.data.state,
              country:response.data.country,
              email:response.data.email,
              contactNo:response.data.contactNo,
              dob:response.data.dob
            });
            console.log(response.data);
        }).catch(error=>{
            alert(error);
        })
}
handleChange(object){
  this.setState(object);
}
editprofile()
{
  window.location="/Editprofile"
}
logoutp()
{
  sessionStorage.removeItem("id");
            window.location='/';
}
back()
{
  window.location='/Displayplan'
}
componentDidMount()
{
    this.viewprofile();
}
  render() {
    const {memberName}=this.state;
    const {userName}=this.state;
    const {address}=this.state;
    const {state}=this.state;
    const {country}=this.state;
    const {email}=this.state;
    const {contactNo}=this.state;
    const {dob}=this.state;
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
        <h2>Welcome {this.state.memberId} Profile</h2>
        <nav>
                <button onClick={this.back}>Back</button>
                <button onClick={this.editprofile}>Edit Profile</button>
                <button onClick={this.logoutp}>Logout</button>
            </nav>
          <br/>
        <table border={6} align="center" cellPadding={20}>
            <tr>
              <th>Member Name</th>
              <td>{memberName}</td>
            </tr>
            <tr>
              <th>User Name</th>
              <td>{userName}</td>
            </tr>
            <tr>
              <th>Address</th>
              <td>{address}</td>
            </tr>
            <tr>
              <th>State</th>
              <td>{state}</td>
            </tr>
            <tr>
              <th>Country</th>
              <td>{country}</td>
            </tr>
            <tr>
              <th>Email</th>
              <td>{email}</td>
            </tr>
            <tr>
              <th>Contact No</th>
              <td>{contactNo}</td>
            </tr>
            <tr>
              <th>Date of Birth</th>
              <td>{dob}</td>
            </tr>
            </table>
        </div>
      </div>
    )
  }
}
