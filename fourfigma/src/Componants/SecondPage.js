import React from 'react';
import wallpaper from '../images/wallpaper.jpg'
import { useNavigate,Link } from 'react-router-dom';
import './componant_css.css';
function SecondPage(){
    const navigate=useNavigate();
    const handleClickEmail=()=>{
        navigate('/Signin')
    }
    return(
    <>
    <div style={{display:'flex',paddingLeft:'10px',marginLeft:'7px',marginRight:'7px',marginTop:'50px',justifyContent:'center',paddingRight:'10px'}}>
        <div style={{width: '100%',maxWidth: '420px'}}>
            <div style={{margin:'0px',marginRight:'15px'}}>
                <div style={{marginLeft:'7px',marginRight:'15px',}}>
                    <div style={{marginTop:'10px'}}>
                        <img src={wallpaper} style={{borderRadius:'50%',height:'100px',width:'100px'}}/>
                        <br/>
                        <div style={{marginTop:'3px',marginBottom:'10px'}}>
                            <p style={{paddingLeft:'10px',color:'black',marginTop:'0px',marginBottom:'0px'}}>welcome to</p>
                            <h1 style={{paddingLeft:'10px',color:'black',marginTop:'0px',marginBottom:'0px'}}>Linear</h1>
                            <p style={{paddingLeft:'10px',color:'black',marginTop:'0px',paddingTop:'0px ',fontSize:'15px'}}>A place where you can track all yout <p style={{display:'clock',marginTop:'0px',paddingTop:'0px'}}>expness and income</p></p>
                        </div>
                        <div style={{marginTop:'3px',marginBottom:'10px',paddingRight:'40px'}}>
                            <p style={{paddingLeft:'10px',color:'black',marginTop:'0px'}}>Let's get started</p>
                            <button style={{paddingLeft:'10px',color:'black',marginTop:'0px',width:'100%',marginLeft:'25px',marginRight:'20px',borderRadius:'10px',height:'50px',textDecoration:'none',backgroundColor:'white'}}><a href="google.com" style={{textDecoration:'none',fontWeight:'bold'}}>Google</a></button>
                            <button style={{paddingLeft:'10px',color:'black',marginTop:'0px',width:'100%',marginLeft:'25px',marginRight:'20px',marginTop:'6px',borderRadius:'10px',height:'50px',backgroundColor:'white'}} onClick={handleClickEmail}><span style={{fontWeight:'bold'}}>continue with email</span></button>
                            {/* <p style={{color:'black',marginTop:'0px',marginLeft:'25px',paddingTop:'3px ',justifyContent:'center',justifyItems:'center',textAlign:'center',fontSize:'10px'}}>already have an account? <Link to='/Signin'>Signin</Link></p> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
    )
}
export default SecondPage;