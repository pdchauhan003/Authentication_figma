import React,{useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Cookie } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
function OtpPage(){
    const[otp,setOtp]=useState('      ');
    const navigate=useNavigate();
    const emails=localStorage.getItem('tempEmail');
    // useEffect(()=>{
    //     if(email){
    //         axios.post("http://localhost:1290/resendotp",{email});
    //     }
    // },[email])
    const handleVarify=async(e)=>{
        e.preventDefault();
       try{
            const res=await axios.post("http://localhost:1290/varifyotp",{
            otp,
            email:emails
        })
        if(res.data.status=='ok'){
            toast.success('otp vaArified')
            localStorage.setItem('resetEmail',emails)
            navigate('/passchange');
        }
        else if(res.data.status=='wrong'){
            toast.error('invalid otpp')
        }
        else{
            toast.error('email not found');
        }
       }
       catch(error){
        toast.error('error in varify otp...')
       }
    }

    const handleClickBack=()=>{
        navigate('/forgot')
    }

    const handleResend=async()=>{
        try{
            
            var res=await axios.post("http://localhost:1290/resendotp",{
                email:emails
            });
            if(res.data.status=='ok'){
                alert('resend otp in mailll')
            }
        }
        catch(error){
        }
    }
    return(
        <>
              <div style={{marginBottom:'0px'}}>
                <button style={{marginLeft:'5px',marginTop:'40px',border:'none',backgroundColor:'white',paddingBottom:'0px'}} onClick={handleClickBack}> <ArrowLeft></ArrowLeft> </button>
                  <div style={{display:'flex',paddingLeft:'10px',marginLeft:'7px',marginRight:'7px',marginTop:'50px',justifyContent:'center',paddingRight:'10px'}}>
                    <div style={{ textAlign: 'center',width: '100%',maxWidth: '420px', }}>
                        <h1 style={{marginBottom:'4px',color:'blue',marginTop:'4px'}}>Enter OTP</h1>
                        <div style={{display:'flex',justifyContent:'center',marginLeft:'20px',marginRight:'20px'}}>
                          <p style={{marginTop:'0px',marginBottom:'5px',textAlign:'center',color:'gray'}}>Enter the otp code we just sent you on your registered Email</p>
                        </div>
                          <form onSubmit={handleVarify}>
                            <div style={{ display: "flex", justifyContent: "center", gap: "12px", marginTop: "20px" }}>
                                {[0,1,2,3,4,5].map((i) => (
                                    <input
                                    key={i}
                                    maxLength={1}
                                    onChange={(e) => {
                                        const value = e.target.value.replace(/\D/g, "");
                                        let newOtp = otp.split("");

                                        newOtp[i] = value;
                                        setOtp(newOtp.join(""));

                                        // Move to next box automatically
                                        if (value && i < 5) {
                                        document.getElementById(`otp-${i+1}`).focus();
                                        }
                                    }}
                                    id={`otp-${i}`}
                                    style={{
                                        width: "30px",
                                        height: "50px",
                                        borderRadius: "10px",
                                        border: "1px solid lightgray",
                                        textAlign: "center",
                                        fontSize: "10px",
                                        backgroundColor: "#f3f6fb"
                                    }}
                                    />
                                ))}
                                </div>
                                <br/>
                              <br/>
                              <input type='submit' value='Confirm Otp' style={{padding:'13px',borderRadius:'10px',width:'100%',marginTop:'0px',backgroundColor:'blue',color:'white',marginRight:'10px'}} />
                          </form>
                          <p style={{marginTop:'8px',paddingLeft:'8px',justifyContent:'left','textAlign':'left'}}>Did'n get otp? <button onClick={handleResend} style={{backgroundColor:'white',border:'none',color:'blue',paddingLeft:'0px'}}>resend otp</button></p>
                          
                        </div>
                    </div>
                 </div>
            </>
    )
}
export default OtpPage;