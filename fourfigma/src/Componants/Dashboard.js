import React from 'react';
import { useNavigate } from 'react-router-dom';
function Dashboard() {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };
  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Dashboard Page</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
export default Dashboard;
