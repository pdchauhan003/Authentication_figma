
import React, { useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import fb2 from '../images/facebook.webp'
import google2 from '../images/google2.webp'
import toast, { Toaster } from 'react-hot-toast';
function Signup() {
  const [fdata, setFdata]=useState({ 
    name:'',
    number:'',
    email:'', 
    password:''
});
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:1290/signup", fdata);
      if (res.data.status == "ok") {
        toast.success(res.data.message);
        navigate("/signin");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      
      toast.error("Error submitting data");
    }
  };
  return (
    <>
    {/* <Navbar/> */}
    <div style={{display:'flex',paddingLeft:'10px',marginLeft:'7px',marginRight:'7px',marginTop:'50px',justifyContent:'center',paddingRight:'10px'}}>
      
      <div style={{ textAlign: 'center',width: '100%',maxWidth: '420px', }}>

        <h1 style={{marginBottom:'4px',color:'blue',marginTop:'4px'}}>Sign Up</h1>

        <div style={{display:'flex',justifyContent:'center',marginLeft:'20px',marginRight:'20px'}}>
          <p style={{marginTop:'0px',marginBottom:'5px',textAlign:'center',color:'gray'}}>it was popularised in 1960 with the release of Letraset sheetscontaining Lorem ipsum</p>
        </div>

        {/* button field */}
       <div style={{display:"flex",width:'100%',alignItems:'center',marginTop:'2px',marginBottom:'0px'}}>
                <button style={{padding:'12px',borderRadius:'10px',width:'50%',marginRight:'10px',backgroundColor:'white',border: '1px solid lightgray',backgroundColor:'whitesmoke'}} ><img src={fb2} style={{width:'15px',height:'15px'}}/>Facebook</button>
                <button style={{padding:'12px',borderRadius:'10px',width:'50%',backgroundColor:'white',border: '1px solid lightgray',backgroundColor:'whitesmoke'}} ><img src={google2} style={{width:'15px',height:'15px'}}/>Google</button>
        </div>

        <div style={{display:"flex",width:'100%',alignItems:'center',marginTop:'10px',}}>
                  <hr style={{width:'35%'}}/>
                  <p style={{margin:'0px 5px'}}>or</p>
                  <hr style={{width:'35%'}}/>   
                  {/* <hr style={{padding:'15px',borderRadius:'10px',textAlign:'center',alignItems:'center'}} /> */}
          </div>
        
        <form onSubmit={handleSubmit} style={{marginTop:'0px'}}>
          <input type="text" placeholder="Name" required onChange={(e)=>setFdata({ ...fdata, name:e.target.value })}
           style={{padding:'13px',borderRadius:'10px',width:'90%',marginTop:'10px',border:'none',backgroundColor:'whitesmoke',marginRight:'10px'}}/>
           <br />

          <input type="number" placeholder="Number" required onChange={(e)=>setFdata({ ...fdata, number:e.target.value })} 
            style={{padding:'13px',borderRadius:'10px',width:'90%',marginTop:'10px',border:'none',backgroundColor:'whitesmoke',marginRight:'10px'}}/>
          <br />

          <input type="email" placeholder="Email" required onChange={(e)=>setFdata({ ...fdata, email:e.target.value })} 
          style={{padding:'13px',borderRadius:'10px',width:'90%',marginTop:'10px',border:'none',backgroundColor:'whitesmoke',marginRight:'10px'}}/>
          <br />

          <input type="password" placeholder="Password" required onChange={(e)=>setFdata({ ...fdata, password:e.target.value })}
          style={{padding:'13px',borderRadius:'10px',width:'90%',marginTop:'10px',border:'none',backgroundColor:'whitesmoke',marginRight:'10px'}} />
          <br />

          <div style={{justifyContent:'left',marginLeft:'10px',marginRight:'20px',textAlign:'left'}}>
            <input type='checkbox' name='checkbox' style={{marginLeft:'0px'}}/><span style={{textAlign:'left',paddingLeft:'0px'}}>i am agree to Terms of service and privet policy</span>
          </div>
          <input type="submit" value="Create Account" style={{padding:'13px',borderRadius:'10px',width:'100%',marginTop:'10px',backgroundColor:'blue',color:'white',marginRight:'10px'}}/>
        </form>
        <p style={{marginTop:'8px',paddingLeft:'8px',justifyContent:'left','textAlign':'left'}}>Do you have an Account? <Link to='/Signin'>Signin</Link></p>
      </div>
    </div>
    </>
  );
}
export default Signup;
