import React, { Component } from 'react'

export default class Contactus extends Component {
  back()
    {
      window.location='/'
    }
  render() {
    return (
      <div>
        <div className='intro1'>
        <h1>Contact Us</h1>
        <table border="6">
          <tr>
            <th>Mobile(Rahul)</th>
            <td>+91 9784125630</td>
          </tr>
          <tr>
            <th>Mobile(Devin)</th>
            <td>+91 9784125631</td>
          </tr>
          <tr>
            <th>Mobile(Vinod)</th>
            <td>+91 9784125632</td>
          </tr>
          <tr>
            <th>Mobile(Abhijeet)</th>
            <td>+91 9784125633</td>
          </tr>
          <tr>
            <th>Mobile(Sathish)</th>
            <td>+91 9784125634</td>
          </tr>
          <tr>
            <th>Office Chennai</th>
            <td>07422 789456</td>
          </tr>
          <tr>
            <th>Email</th>
            <td>ClaimManagementSystem@gmail.com</td>
          </tr>
          <tr>
            <th>Email</th>
            <td>ClaimManagementPortal@gmail.com</td>
          </tr>
          <tr>
            <th>Email(Rahul)</th>
            <td>Rahul@gmail.com</td>
          </tr>
          <tr>
            <th>Email(Devin)</th>
            <td>Devin@gmail.com</td>
          </tr>
          <tr>
            <th>Website</th>
            <td>WWW.CMS.com</td>
          </tr>
        </table>
        <br/>
        <button onClick={this.back}>Back</button>
        </div>
      </div>
    )
  }
}
