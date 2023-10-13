import React, {useState} from 'react'
import emailjs from 'emailjs-com';
import axios from 'axios';

const ForgotPassword = () => {

  const [password,setPassword] = useState('');
  const [error,setError] = useState();
  const [success,setSuccess] = useState(false);
  const passwordRecovery = () =>{
    axios.get('https://localhost:44302/api/Registration/Forgotpassword?email='+email)
    .then(res=>setPassword(res.data)).catch(res=>console.log(res));
  }

  const [email,setEmail]=useState('');

  const back = (e)=>{
    window.location="/Login"
  }

  
  const sendEmail = (e)=>{
    e.preventDefault();
    passwordRecovery();
    if(password !==''){
    console.log('hi')
    emailjs.send('service_qzanclh','template_fvsvuce',{
      Subject: "Password Recovery",
      from_name: 'CMS Team-4',
      to_name: "User",
      message: password+" is your password",
      reply_to: email,
  },'6B8P39Z_HSQ07IQGn').then(result=>{
    console.log(result.text)},error=>{console.log(error.text)})
    setError('Mail send successfully');
    setSuccess(true);
  }
  else{
  setError('You dont have account please register')
  }
 }


  return (
    <div className="intro1">
							<h1 >Reset password</h1>
							<p>
								Enter your email to reset your password.
							</p>
                  <table>
                    <tr>
                      <td><label>Email</label></td>
                      <td><input type="email" name="email" placeholder="Enter your email" required={true} onChange={(e)=>setEmail(e.target.value)}/></td>
                      {success ? <h6 style={{color:'green'}}>{error}</h6>:<h6 style={{color:'red'}}>{error}</h6>}
                    </tr>
                  </table>
                  <button onClick={sendEmail}>Click Here</button>
                  <br/>
      <nav>
        <button onClick={back}>Back</button>
      </nav>
		</div>
  )
}

export default ForgotPassword