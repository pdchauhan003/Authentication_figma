import React ,{useState,useEffect} from 'react';
import wallpaper from './images/wallpaper.jpg'
import './Componants/componant_css.css';
function WelcomePage(){
    return(
        <>
            <div style={{height:'100vh',width:'100%',backgroundColor:'black'}}>
            <div style={{height: '100vh',width: '100%',backgroundColor: 'black',display: 'flex',justifyContent: 'center',alignItems: 'center'}}>
                 <img src={wallpaper} style={{ width: '40vw', height: '40vw', maxWidth:'300px', maxHeight:'300px', minWidth: '150px',minHeight: '150px',borderRadius: '50%',objectFit: 'cover'}}/>
            </div>
            </div>
        </>
    )
}
export default WelcomePage;