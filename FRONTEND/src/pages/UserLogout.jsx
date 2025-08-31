import axios from 'axios';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const UserLogout = () => {

    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then((respone) => {
        if(respone.status === 200) {
            localStorage.removeItem("token");
            navigate("/user-login");
            toast.success("User logout successfully");
        }
    })

  return (
    <>
        <h1>user UserLogout</h1>
    </>
  )
}

export default UserLogout;
