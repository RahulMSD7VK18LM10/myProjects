import React, { Component } from 'react'

export default class Aboutus extends Component {
  back()
    {
      window.location='/'
    }
  render() {
    return (
      <div>
        <div className='intro'>
          <h1>About Us</h1>
          <h2>Thank You for Visiting</h2>
          <h3>We are a Dotnet+React Batch2 Team 4.<br></br>
<b> A Development</b> team delivering splendid business IT Solutions and related services to customers across the globe.<br/>
<b>Our development</b> services are led by our dedicated and passionate team to provide best industry practices combined with 
technology expertise and business domain knowledge to drive digital transformation.<br/><b>Our proficiency</b> in understanding 
business challenges and professional competence allows us to create a better experience for our customers.<br/>
<b>We have</b> emerged and marked our presence in different continents by providing Bespoke software development services 
to all major Industry Domains.<br/><b>We have</b> successfully served for more than 1800 success stories ranging from Enterprise 
level to Start-ups, who have grown alongside the success of the team.<br/><b>We are</b> a team of 4 aspiring developers <i>"Rahul Chandel"</i>,
<i> "Devin Raina"</i>, <i> "Kesana Venkata Sathish"</i>, <i> "Abhijit Anandrao Mane"</i>, <i> "Vinod Kumar Timmapuram"</i>.
 </h3>
 <button onClick={this.back}>Back</button>
        </div>
      </div>
    )
  }
}
