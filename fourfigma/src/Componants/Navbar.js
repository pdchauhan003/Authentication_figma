import React from 'react';
import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
function Navbar(){
    const navigate=useNavigate();
    const handleSigninClick=(e)=>{
        e.preventDefault()
        navigate('/Signin')
    }
    const handleSignupCLick=(e)=>{
        e.preventDefault()
        navigate('/Signup')
    }
    return(
        <>
            <div style={{display:"flex",width:'100%',alignItems:'center'}}>
                <div style={{padding:'15px',borderRadius:'10px',textAlign:'center',alignItems:'center',width:'50%',borderBlockEnd:'2px solid black'}} onClick={handleSigninClick}>Login</div>
                <div style={{padding:'15px',borderRadius:'10px',textAlign:'center',alignItems:'center',width:'50%',borderBlockEnd:'2px solid black'}} onClick={handleSignupCLick}>Signup</div>
            </div>
        </>
    )
}
export default Navbar;