import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const check = async () => {
      const token = localStorage.getItem("token");
      if (!token) { setAllowed(false); setLoading(false); return; }
      try {
        const res = await axios.get("https://authentication-figma.onrender.com/dashboard", {headers:{ Authorization: localStorage.getItem("token") }});
        if (res.data.status === "ok"){
           setAllowed(true);
      }
      }
      catch (error) {
        setAllowed(false);
      }
      finally {
        setLoading(false);
      }
    };
    check();
  }, []);
  if (loading) {
    return <div style={{textAlign:'center'}}>Checking........</div>;
  }
  if (!allowed) return <Navigate to="/signin" replace />;
  return children;
}
export default ProtectedRoute;
