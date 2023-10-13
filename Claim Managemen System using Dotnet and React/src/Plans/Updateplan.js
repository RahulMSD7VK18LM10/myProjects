import React, { Component } from 'react'
import axios from 'axios';

export default class Updateplan extends Component {
  constructor(props) {
    super(props)
    this.state = {
       planName:'',
       insuredAmt:'',
       planStart:'',
       planEnd:'',

       planNameerror:'',
       insuredAmterror:'',
       planStarterror:'',
       planEnderror:''
    }
      this.BtnSubmit=this.BtnSubmit.bind(this);
        this.UpdatePlan=this.UpdatePlan.bind(this);
        this.handleChange=this.handleChange.bind(this);
  }
  UpdatePlan()
      {
        let memberId=sessionStorage.getItem('id');
        let url="https://localhost:44302/api/Plans?id=" + memberId;
          axios.put(url,{
              planName:this.state.planName,
              insuredAmt:this.state.insuredAmt,
              planStart:this.state.planStart,
              planEnd:this.state.planEnd,
          }).then(response=>{
              alert("Plan Updated New Premium is "+response.data);
              window.location="/Displayplan"
          }).catch(error=>{
              alert(error);
          });
      }
BtnSubmit()
{
          this.setState({
              planNameerror:'',
             insuredAmterror:'',
             planStarterror:'',
             planEnderror:''
            })
            if(this.Validate())
            {
              this.UpdatePlan();
            }

}
Validate()
{
  if(!this.state.planName && !this.state.insuredAmt&&!this.state.planStart&&!this.state.planEnd)
        {
            this.setState({planNameerror:'Plan Name Required',
                        planStarterror:' choose start date',
                         planEnderror:' choose end date',
                        insuredAmterror:'required plan amount'})
        }
        else if(!this.state.planName &&!this.state.planStart&&!this.state.planEnd)
        {
            this.setState({planNameerror:'Plan Name Required',
            planStarterror:' choose start date',
             planEnderror:' choose end date',})
        }
        else if(!this.state.planStart&&!this.state.planEnd)
        {
            this.setState({
            planStarterror:' choose start date',
             planEnderror:' choose end date'})
        }
        else if(!this.state.planEnd)
        {
            this.setState({
             planEnderror:' choose end date'})
        }
        else
        {
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
        <h2>Welcome {this.state.memberId} to update plan</h2>
        <table border={12} align="center">
        <tr>
        <td>
            <label>Plan Name</label></td>
            <td><input type="text" name="planName" onChange={(e)=>this.handleChange({planName:e.target.value})}></input>
        </td>
        <h6 style={{color:"red"}}>{this.state.planNameerror}</h6>
        </tr>
        <tr>
        <td>
            <label>Insured Amount</label></td>
            <td><input type='text' name="insuredAmt" onChange={(e)=>this.handleChange({insuredAmt:e.target.value})}></input>
        </td>
        <h6 style={{color:"red"}}>{this.state.insuredAmterror}</h6>
        </tr>
        <tr>
        <td>
            <label>Plan Start Date</label></td>
            <td><input type='date' name="planStart" onChange={(e)=>this.handleChange({planStart:e.target.value})}></input>
        </td>
        <h6 style={{color:"red"}}>{this.state.planStarterror}</h6>
        </tr>
        <tr>
        <td>
            <label>Plan End Date</label></td>
            <td><input type='date' name="planEnd" onChange={(e)=>this.handleChange({planEnd:e.target.value})}></input>
        </td>
        <h6 style={{color:"red"}}>{this.state.planEnderror}</h6>
        </tr>
    </table>
    <button onClick={this.BtnSubmit} >UpdatePlan</button>
    <br/>
    <br/>
    <button onClick={this.back}>Back</button>
                <button onClick={this.logoutp}>Logout</button>
                <br/>
                <br/>
                <br/>
        </div>
      </div>
    )
  }
  }
