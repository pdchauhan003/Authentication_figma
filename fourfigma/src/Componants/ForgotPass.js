import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {ArrowLeft} from 'lucide-react';
import toast from 'react-hot-toast';
function ForgotPass() {
    const [email, setEmail]=useState('');
    // const[showOtp,setShowOtp]=useState(false);
    // const[otp,setOtp]=useState('');
    // const[send,setSend]=useState(false);
    // const[sub,setSub]=useState(false);

    const navigate = useNavigate();
    const handleSend = async (e) => {
        e.preventDefault();
        try {
          const res = await axios.post("https://authentication-figma.onrender.com/forgot", {email});
          if (res.data.status == "ok") {
            toast.success(res.data.message)
            localStorage.setItem('tempEmail',email);
            navigate('/varifyotp');
        }
        else{
          toast.error('email not found')
        }
    } catch (error) {
      console.log(error);
      toast.error("Error updating password");
    }
  }
    const handleClickBack=()=>{
        navigate('/signin')
    }

    return (
      <>
      <div style={{marginBottom:'0px'}}>
        <button style={{marginLeft:'5px',marginTop:'40px',border:'none',backgroundColor:'white',paddingBottom:'0px'}} onClick={handleClickBack}> <ArrowLeft></ArrowLeft> </button>
          <div style={{display:'flex',paddingLeft:'10px',marginLeft:'7px',marginRight:'7px',marginTop:'50px',justifyContent:'center',paddingRight:'10px'}}>
            <div style={{ textAlign: 'center',width: '100%',maxWidth: '420px', }}>
                <h1 style={{marginBottom:'4px',color:'blue',marginTop:'4px'}}>Forgot Password</h1>
                <div style={{display:'flex',justifyContent:'center',marginLeft:'20px',marginRight:'20px'}}>
                  <p style={{marginTop:'0px',marginBottom:'5px',textAlign:'center',color:'gray'}}>it was popularised in 1960 with the release of Letraset sheetscontaining Lorem ipsum</p>
                </div>
                  <form onSubmit={handleSend}>
                      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required 
                      style={{padding:'15px',borderRadius:'10px',width:'90%',marginTop:'10px',border:'none',backgroundColor:'whitesmoke',marginRight:'10px'}}/>
                      <br />
                        <input type="submit" value="Send Mail" style={{padding:'15px',borderRadius:'10px',width:'100%',marginTop:'20px',backgroundColor:'blue',color:'white',cursor:'pointer',fontSize:'16px'}} />
                  </form>
            </div>
          </div>
      </div>
        </>
  );
}
export default ForgotPass;
