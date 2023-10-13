import React, { Component } from 'react'
import axios from 'axios';

export default class Addplan extends Component {
    constructor(props) {
        super(props)

        this.state = {
           planName:'',
           insuredAmt:'',
           planStart:'',
           planEnd:'',
           memberId:'',

           planNameerror:'',
           insuredAmterror:'',
           planStarterror:'',
           planEnderror:'',
           memberIderror:''
        }
        this.BtnSubmit=this.BtnSubmit.bind(this);
        this.addplan=this.addplan.bind(this);
        this.handleChange=this.handleChange.bind(this);
        this.Validate=this.Validate.bind(this);
      }
      addplan()
      {
          let url="https://localhost:44302/api/Plans";
          axios.post(url,{
              planName:this.state.planName,
              insuredAmt:this.state.insuredAmt,
              planStart:this.state.planStart,
              planEnd:this.state.planEnd,
              memberId:this.state.memberId
          }).then(response=>{
              alert("Plan details added");
              alert("Registration done")
              window.location="/Login"
  
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
           planEnderror:'',
           memberIderror:''
          })
          if(this.Validate())
          {
            this.addplan();
          }
    }
    Validate()
    {
        if(!this.state.planName && !this.state.insuredAmt&&!this.state.memberId&&!this.state.planStart&&!this.state.planEnd)
        {
            this.setState({memberIderror:'Member ID Required',
                        planNameerror:'Plan Name Required ',
                        planStarterror:' choose start date',
                         planEnderror:' choose end date',
                        insuredAmterror:'required plan amount'})
        }
        else if(!this.state.insuredAmt&&!this.state.memberId&&!this.state.planStart&&!this.state.planEnd)
        {
            this.setState({memberIderror:'Member ID Required',
            planStarterror:' choose start date',
             planEnderror:' choose end date',
             memberIderror:'enter member Id',
            insuredAmterror:'required plan amount'})
        }
        else if(!this.state.memberId&&!this.state.planStart&&!this.state.planEnd)
        {
            this.setState({memberIderror:'Member ID Required',
            planStarterror:' choose start date',
             planEnderror:' choose end date',
             memberIderror:'enter member Id'})
        }
        else if(!this.state.memberId&&!this.state.planEnd)
        {
            this.setState({
             planEnderror:' choose end date',
             memberIderror:'enter member Id'})
        }
        else if(!this.state.memberId)
        {
            this.setState({
             memberIderror:'enter member Id'})
        }
        else if(this.state.planEnd<this.state.planStart)
        {
            this.setState({
                planStarterror:'Plan end date can not be ',
                planEnderror:'earlier than plan start date'
            })
        }
        else
        {
            return true;
        }
    }
      handleChange(object)
      {
          this.setState(object);
      }
  render() {
    return (
      <div>
        <div className='intro1'>
        <h2> Add you Plan Details</h2>
        <table border={12} align="center">
        <tr>
        <td>
            <label>Plan Name</label></td>
            <td><select name="planName" onChange={(e)=>this.handleChange({planName:e.target.value})}>
                <option value={this.planName}></option>
                <option value={this.planName}>Silver</option>
                <option value={this.planName}>Gold</option>
                <option value={this.planName}>Diamond</option>
                <option value={this.planName}>Platinum</option>
            </select>
        </td>
        <h6 style={{color:"red"}}>{this.state.planNameerror}</h6>
        </tr>
        <tr>
        <td>
            <label>Insured Amount</label></td>
            <td><select name="insuredAmt" onChange={(e)=>this.handleChange({insuredAmt:e.target.value})}>
            <option value={this.planName}></option>
                <option value={this.planName}>400000</option>
                <option value={this.planName}>600000</option>
                <option value={this.planName}>800000</option>
                <option value={this.planName}>1000000</option>
            </select>
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
        <tr>
        <td>
            <label>Member ID</label></td>
            <td><input type="text" name="memberId" onChange={(e)=>this.handleChange({memberId:e.target.value})}></input>
        </td>
        <h6 style={{color:"red"}}>{this.state.memberIderror}</h6>
        </tr>
    </table>
    <button onClick={this.BtnSubmit} >Add Plan</button>
    </div>
      </div>
    )
  }
}
