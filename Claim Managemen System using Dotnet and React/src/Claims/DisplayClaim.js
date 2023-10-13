import React, { Component } from 'react'
import axios from 'axios';

export default class DisplayClaim extends Component {
    constructor(props) {
        super(props)
      
        this.state = {
            Claims:[],
        }
        this.displayclaims=this.displayclaims.bind(this);
      }
      displayclaims()
      {
        let memberId=sessionStorage.getItem('id');
          let url='https://localhost:44302/api/Claim/'+memberId;
          axios.get(url).then(response=>{
            this.setState({Claims:response.data})
              console.log(response.data)
          }).catch(error=>{
              console.warn(error);
              alert(error);
          })
      }
      componentDidMount()
      {
          this.displayclaims();
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
        const {Claims}=this.state;
    if(sessionStorage.getItem('id')==null)
    {
        window.location="/";
    }
    else{
        this.state.memberId=sessionStorage.getItem('id');
    }
    return (
      <div>
        <div className='intro1'>
        <h2>Welcome {this.state.memberId} CLaims</h2>
        <table border={2} align="center">
            <tr>
                <th>Claim Id</th>
                <th>Claim Amount</th>
                <th>Claim Date</th>
                <th>Hospital Name</th>
                <th>Bill Issue Date</th>
            </tr>
            {
              Claims.map(a=>
            <tr>
                    <td>{a.claimId}</td>
                    <td>{a.claimAmount}</td>
                    <td>{a.claimDate}</td>
                    <td>{a.hospitalName}</td>
                    <td>{a.billIssueDate}</td>
            </tr>
            )}
        </table>
        <br/>
        <button onClick={this.back}>Back</button>
        <button onClick={this.logoutp}>Logout</button>
      </div>
      </div>
    )
  }
}