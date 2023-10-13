import React, { Component } from 'react'
import axios from 'axios';
import { format } from 'date-fns';

export default class Displayplan extends Component {
    constructor(props) {
        super(props)
        this.state = {
           planId:'',
           insuredAmt:'',
           planName:'',
           planStart:'',
           planEnd:'',
           prem:''
        }
        this.displayplans=this.displayplans.bind(this);
        this.logoutp=this.logoutp.bind(this);
        this.updateplan=this.updateplan.bind(this);
        this.viewprofile=this.viewprofile.bind(this);
        this.submitclaim=this.submitclaim.bind(this);
        this.displayclaim=this.displayclaim.bind(this);
      }
      displayplans()
      {
            let memberId=sessionStorage.getItem('id');
          let url="https://localhost:44302/api/Plans/"+memberId;
          axios.get(url).then(resp=>{
              this.setState({
                planId:resp.data.planId,
                insuredAmt:resp.data.insuredAmt,
                planName:resp.data.planName,
                planStart:resp.data.planStart,
                planEnd:resp.data.planEnd
            });
              console.log(resp.data)
          }).catch(error=>{
              alert(error);
          })
  
      }
      viewprofile()
      {
        window.location="/ViewProfile"
      }
      updateplan()
      {
        window.location="/Updateplan"
      }
      logoutp()
      {
        {
            sessionStorage.removeItem("id");
            window.location='/';
        }
      }
      submitclaim()
      {
        window.location='/Submitclaim'
      }
      displayclaim()
      {
        window.location='/DisplayClaim'
      }
      componentDidMount()
      {
          this.displayplans();
      }

  render() {
    const {planId}=this.state;
    const {insuredAmt}=this.state;
    const {planName}=this.state;
    const {planStart}=this.state;
    const {planEnd}=this.state;
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
        <h2>Welcome {this.state.memberId} Here are your plan details</h2>
        <nav>
                <button onClick={this.viewprofile}>View Profile</button>
                <button onClick={this.updateplan}>Update Plan</button>
                <button onClick={this.submitclaim}>Submit Claim</button>
                <button onClick={this.displayclaim}>View Claims</button>
                <button onClick={this.logoutp}>Logout</button>
            </nav>
          <br/>
            <table border={20} align="center" cellPadding={30}>
              <tr>
                <th>Plan Id</th>
                <td>{planId}</td>
              </tr>
              <tr>
                <th>Plan Name</th>
                <td>{planName}</td>
              </tr>
              <tr>
                <th>Insured Amount</th>
                <td>{insuredAmt}</td>
              </tr>
              <tr>
                <th>Plan Start Date</th>
                <td>{planStart}</td>
              </tr>
              <tr>
                <th>Plan End Date</th>
                <td>{planEnd}</td>
              </tr>
            </table>
            </div>
      </div>
    )
  }
}
