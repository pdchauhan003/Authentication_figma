import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from './Navbar';
import fb2 from '../images/fb2.png'
import google2 from '../images/google2.webp'
import axios from 'axios';
import toast from 'react-hot-toast';
function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const[forgo,setForgo]=useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:1290/signin", { email, password });
      if (res.data.status !== "ok") {
        toast.error(res.data.message);
        setForgo(true);
        return;
      }
      localStorage.setItem("token", res.data.token);
      toast.success(res.data.message);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      toast.error("Server error");
    }
  };
  return (
    <>
    {/* <Navbar/> */}

<div style={{display:'flex',paddingLeft:'10px',marginLeft:'7px',marginRight:'7px',marginTop:'50px',justifyContent:'center',paddingRight:'10px'}}>
    <div style={{ textAlign: 'center',width: '100%',maxWidth: '420px'}}>
        <h1 style={{marginBottom:'4px',color:'blue',marginTop:'4px'}}>Sign In</h1>

          <div style={{display:'flex',justifyContent:'center',marginLeft:'20px',marginRight:'20px'}}>
            <p style={{marginTop:'0px',marginBottom:'5px',textAlign:'center',color:'gray'}}>it was popularised in 1960 with the release of Letraset sheetscontaining Lorem ipsum</p>
          </div>

          {/* button field */}
        <div style={{display:"flex",width:'100%',alignItems:'center',marginTop:'2px',marginBottom:'0px',paddingRight:'2px'}}>
                  <button style={{padding:'12px',borderRadius:'10px',width:'50%',marginRight:'10px',backgroundColor:'white',border: '1px solid lightgray',backgroundColor:'whitesmoke'}} ><img src={fb2} style={{width:'15px',height:'15px'}}/>Facebook</button>
                  <button style={{padding:'12px',borderRadius:'10px',width:'50%',backgroundColor:'white',border: '1px solid lightgray',backgroundColor:'whitesmoke'}} ><img src={google2} style={{width:'15px',height:'15px'}}/>Google</button>
          </div>

          <div style={{display:"flex",width:'100%',alignItems:'center',marginTop:'10px',}}>
                  <hr style={{width:'35%'}}/>
                  <p style={{margin:'0px 5px'}}>or</p>
                  <hr style={{width:'35%'}}/>   
                  {/* <hr style={{padding:'15px',borderRadius:'10px',textAlign:'center',alignItems:'center'}} /> */}
          </div>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required 
          style={{padding:'13px',borderRadius:'10px',width:'90%',marginTop:'10px',border:'none',backgroundColor:'whitesmoke',marginRight:'10px'}}/>
          <br />
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required 
          style={{padding:'13px',borderRadius:'10px',width:'90%',marginTop:'10px',border:'none',backgroundColor:'whitesmoke',marginRight:'10px'}}/>
          <br />
          {
              forgo ? <p style={{justifyContent:'right',textAlign:'right',paddingRight:'5px',marginTop:'0px'}}><Link to='/forgot' style={{textDecoration:'none',color:'red'}}>Forgot Password?</Link></p> :
              <p style={{justifyContent:'right',textAlign:'right',paddingRight:'5px',marginTop:'0px'}}><Link to='/forgot' style={{textDecoration:'none',color:'gray',display:'none'}}>Forgot Password?</Link></p>

          }
          {/* <p style={{justifyContent:'right',textAlign:'right',paddingRight:'5px',marginTop:'0px'}}><Link to='/forgot' style={{textDecoration:'none'}}>Forgot Password?</Link></p> */}
         
    
          <input type="submit" value="Login" style={{padding:'13px',borderRadius:'10px',width:'100%',marginTop:'10px',backgroundColor:'blue',color:'white',marginRight:'10px'}} /><br />
        </form>
        <p style={{marginTop:'8px',paddingLeft:'8px',justifyContent:'left','textAlign':'left'}}>Don't have Account? <Link to="/signup">Signup</Link></p>
      </div>
    </div> 

    </>
  );
}

export default Signin;
