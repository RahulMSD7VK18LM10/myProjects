import React, { Component } from 'react'
import axios from 'axios';

export default class Submitclaim extends Component {
    constructor(props) {
    
        super(props)
      
        this.state = {
           claimDate:'',
           claimAmount:'',
           billIssueDate:'',
           hospitalName:'',
           memberId:'',
           claimDateerr:'',
           claimAmounterr:'',
           billIssueDateerr:'',
           hospitalNameerr:'',
           memberIderr:''
        }
        this.handlechange=this.handlechange.bind(this);
        this.submitclaim=this.submitclaim.bind(this);
        this.BtnSubmit=this.BtnSubmit.bind(this);
      }
      submitclaim()
      {
        let url='https://localhost:44302/api/Claim';
        axios.post(url,{
          claimDate:this.state.claimDate,
          claimAmount:this.state.claimAmount,
          billIssueDate:this.state.billIssueDate,
          hospitalName:this.state.hospitalName,
          memberId:this.state.memberId
        }).then(respone=>{alert("Claim Submission done")
        window.location="/DisplayClaim"
        }).catch(error=>{alert("Error")});
      }
handlechange(changeObject){
        this.setState(changeObject)
    }
    BtnSubmit()
    {
        this.setState({
          claimDateerr:'',
          claimAmounterr:'',
          billIssueDateerr:'',
          hospitalNameerr:'',
          memberIderr:''
          })
          if(this.Validate())
          {
            this.submitclaim();
          }
    }
    Validate()
    {
      if(!this.state.claimAmount && !this.state.hospitalName&&!this.state.billIssueDate && !this.state.claimDate &&!this.state.memberId)
      {
        this.setState({
          claimAmounterr:"Invalid Claim Amount",
          hospitalNameerr:"Please Fill Hospital Name",
          claimDateerr:"Enter the claim issue date",
          billIssueDateerr:"Enter the bill issue date",
          memberIderr:"Invalid Member ID"
        })
      }
      else if(!this.state.hospitalName&&!this.state.billIssueDate && !this.state.claimDate &&!this.state.memberId)
      {
        this.setState({
          hospitalNameerr:"Please Fill Hospital Name",
          claimDateerr:"Enter the claim issue date",
          billIssueDateerr:"Enter the bill issue date",
          memberIderr:"Invalid Member ID"
        })
      }
      else if(!this.state.billIssueDate && !this.state.claimDate &&!this.state.memberId)
      {
        this.setState({
          claimDateerr:"Enter the claim issue date",
          billIssueDateerr:"Enter the bill issue date",
          memberIderr:"Invalid Member ID"
        })
    }
    else if(!this.state.claimDate &&!this.state.memberId)
      {
        this.setState({
          claimDateerr:"Enter the claim issue date",
          memberIderr:"Invalid Member ID"
        })
      }
      else if(!this.state.memberId)
      {
        this.setState({
          memberIderr:"Invalid Member ID"
        })
      }
      else if(this.state.claimDate<this.state.billIssueDate)
      {
        this.setState({
          claimDateerr:"Claim Date Cannot be before bill issue date"
        })
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
  window.location='/Displayplan'
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
        <h2>Welcome {this.state.memberId} Submit Your Claim</h2>
        <table border={2} align="center">
            <tr>
                <td><label>Bill Issue Date</label></td>
                <td><input type='date' name="billIssueDate" 
                onChange={(e)=>this.handlechange({billIssueDate:e.target.value})}></input></td>
                <h6 style={{color:"red"}}>{this.state.billIssueDateerr}</h6>
            </tr>
            <tr>
                <td>
                  <label>Claim Date</label></td>
                  <td><input type='date' name="claimDate" 
                onChange={(e)=>this.handlechange({claimDate:e.target.value})}></input></td>
                <h6 style={{color:"red"}}>{this.state.claimDateerr}</h6>
            </tr>
            <tr>
                <td><label>Claim Amount</label></td>
                <td><input type='text' name="claimAmount" 
                onChange={(e)=>this.handlechange({claimAmount:e.target.value})}></input></td>
                <h6 style={{color:"red"}}>{this.state.claimAmounterr}</h6>
            </tr>
            <tr>
                <td><label>Hospital Name</label></td>
                <td><input type='text' name="hospitalName" 
                onChange={(e)=>this.handlechange({hospitalName:e.target.value})}></input></td>
                <h6 style={{color:"red"}}>{this.state.hospitalNameerr}</h6>
            </tr>
            <tr>
                <td><label>Member Id</label></td>
                <td><input type='text' name="memberId" 
                onChange={(e)=>this.handlechange({memberId:e.target.value})}></input></td>
                <h6 style={{color:"red"}}>{this.state.memberIderr}</h6>
            </tr>
        </table>
        <button onClick={this.BtnSubmit}>Submit Claim</button>
        <br/>
        <br/>
        <button onClick={this.back}>Back</button>
        <button onClick={this.logoutp}>Logout</button>
        <br/>
        <br/>
        </div>
      </div>
    )
  }
}
