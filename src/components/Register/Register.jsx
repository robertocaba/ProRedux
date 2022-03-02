import React, { useState,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {register,reset} from '../../features/auth/authSlice'
import { notification } from "antd";
import { useNavigate } from "react-router-dom";

import "antd/dist/antd.css";
const Register = () => {
    const [formData, setFormData] = useState({ name: "",email: "",password: "",password2: "", });
    const { name, email, password, password2 } = formData;
    const dispatch = useDispatch()
    const navigate = useNavigate();
        const { isError, isSuccess, message } = useSelector( (state) => state.auth )
    useEffect(() => {
      if (isError) {
        notification.error({ message: "Error",description: message.msg });
      }
      if (isSuccess) {
          notification.success({  message: "Success",  description:message?.message});
          setTimeout(() => {
            navigate("/login");
        }, 1000);
        }
        dispatch(reset())
    }, [isError, isSuccess, message,  navigate,dispatch]);
  
    const onChange = (e)=>{
        setFormData((prevState)=> ({
            ...prevState,
            [e.target.name]:e.target.value,
        }))
    }
    const onSubmit = (e) => {
        e.preventDefault();
        if (password !== password2) {
          return notification.error({
            message: "Error",
            description: "Passwords do not match",
          });
        } else {
            dispatch(register(formData));
        }
      };
    
  return (
    <form onSubmit={onSubmit}>
        <input type="text" name="name" value={name} onChange={onChange} required/>
        <input type="email" name="email" value={email} onChange={onChange} required/>
        <input type="password" name="password" value={password} onChange={onChange} required/>
        <input type="password" name="password2" value={password2} onChange={onChange} required/>
        <button type="submit">Register</button>
    </form>
  )
}
export default Register