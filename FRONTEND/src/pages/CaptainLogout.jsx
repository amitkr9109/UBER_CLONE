import axios from 'axios';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const CaptainLogout = () => {

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  axios.get(`${import.meta.env.VITE_BASE_URL}/captains/logout`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(response => {
    if(response.status === 200) {
      localStorage.removeItem("token");
      navigate("/captain-login");
      toast.success("Captain logout successfully");
    }
  })

  return (
    <>
      <h1>Captain logout</h1>
    </>
  )
}

export default CaptainLogout;
