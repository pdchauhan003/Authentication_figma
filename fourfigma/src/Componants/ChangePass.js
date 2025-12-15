import React ,{useState}from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Cookie } from 'lucide-react';
import toast from 'react-hot-toast';
function ChangePass(){
    const[password,setPassword]=useState('');
    const[confirmPass,setConfirmPass]=useState('');
    const navigate=useNavigate();
    const email=localStorage.getItem('resetEmail');
    const handleChange=async(e)=>{
        e.preventDefault();
        if (password !== confirmPass) {
            return toast.error("Password and Confirm Password do not match!");
        }
        const res=await axios.post('http://localhost:1290/passchange',{
            email,password,
        });
        if (res.data.status === "ok") {
            toast.success("Password changed successfully");
            localStorage.removeItem("tempEmail");
            localStorage.removeItem("resetEmail");
            navigate("/signin");
        } 
        if(res.data.status === "error"){
            toast.error(res.data.error)
        }
        else {
            toast.error("Error changing password");
        }
    }
    const handleClickBack=()=>{
        navigate('/varifyotp')
    }
    return(
        <>
            <div>
                <button style={{marginLeft:'5px',marginTop:'40px',border:'none',backgroundColor:'white'}} onClick={handleClickBack}> <ArrowLeft></ArrowLeft> </button>
                <div style={{display:'flex',paddingLeft:'10px',marginLeft:'7px',marginRight:'7px',marginTop:'50px',justifyContent:'center',paddingRight:'10px'}}>
                    <div style={{ textAlign: 'center',width: '100%',maxWidth: '420px'}}>
                        <h1 style={{marginBottom:'4px',color:'blue',marginTop:'4px'}}>Change Password</h1>
                        <div style={{display:'flex',justifyContent:'center',marginLeft:'20px',marginRight:'20px'}}>
                            <p style={{marginTop:'0px',marginBottom:'5px',textAlign:'center',color:'gray'}}>it was popularised in 1960 with the release of Letraset sheetscontaining Lorem ipsum</p>
                        </div>
                        <form onSubmit={handleChange}>
                            <input type="password" placeholder="New Password" onChange={(e) => setPassword(e.target.value)} required
                            style={{padding:'13px',borderRadius:'10px',width:'90%',marginTop:'10px',border:'none',backgroundColor:'whitesmoke',marginRight:'10px'}} />
                            <br />
                            <input type="password" placeholder="Confirm Password" onChange={(e) => setConfirmPass(e.target.value)} required
                            style={{padding:'13px',borderRadius:'10px',width:'90%',marginTop:'10px',border:'none',backgroundColor:'whitesmoke',marginRight:'10px'}}/>
                            <br />
                            <button type="submit" style={{padding:'13px',borderRadius:'10px',width:'100%',marginTop:'10px',backgroundColor:'blue',color:'white',marginRight:'10px'}} >Update Password</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ChangePass