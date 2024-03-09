import React from 'react';
import { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import api from '../services/api';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';


const SignupForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword:'',
    });

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const { username, email, password, confirmPassword } = formData;

    const handleOnChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error("Passwords Do Not Match")
            return
        }
        try {
            const response = await api.post('/signup', formData);
            console.log(response);
            // dispatch(setToken(response.data.token));
            localStorage.setItem('token', response.data.token);
            toast.success("Signup Successful");
            toast.success("Mail sent");
            setFormData({
                username: '',
                email: '',
                password: '',
                confirmPassword:'',
            })

            navigate("/posts");
        } catch (error) {
            console.error('Error signing up:', error);
            toast.error("Signup Failed");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex bg-green-100  p-10 w-3/4 rounded-lg mx-auto flex-col gap-y-4 ">
        <div className="flex gap-x-4">
          <label>
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] font-semibold text-black">
              Username <sup className="text-pink-400 text-sm">*</sup>
            </p>
            <input
              required
              type="text"
              name="username"
              value={username}
              onChange={handleOnChange}
              placeholder="Enter user name"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full border border-slate-700 rounded-[0.5rem]  p-[12px]"
            />
          </label>
        </div>
        <label className="w-full">
          <p className="mb-1 text-[0.875rem] font-semibold leading-[1.375rem] ">
            Email Address <sup className="text-pink-400 text-sm">*</sup>
          </p>
          <input
            required
            type="text"
            name="email"
            value={email}
            onChange={handleOnChange}
            placeholder="Enter email address"
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            className="w-full border border-slate-700 rounded-[0.5rem] p-[12px] text-richblack-5"
          />
        </label>
        <div className="flex gap-x-4">
          <label className="relative">
            <p className="mb-1 text-[0.875rem] font-semibold leading-[1.375rem] ">
              Create Password <sup className="text-pink-400 text-sm">*</sup>
            </p>
            <input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={handleOnChange}
              placeholder="Enter Password"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full border border-slate-700 rounded-[0.5rem]  p-[12px] pr-10 "
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] z-[10] cursor-pointer"
            >
              {showPassword ? (
                 <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </label>
          <label className="relative">
            <p className="mb-1 text-[0.875rem] font-semibold leading-[1.375rem] ">
              Confirm Password <sup className="text-pink-400 text-sm">*</sup>
            </p>
            <input
              required
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleOnChange}
              placeholder="Confirm Password"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full border border-slate-700 rounded-[0.5rem] p-[12px] pr-10"
            />
            <span
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] z-[10] cursor-pointer"
            >
              {showConfirmPassword ? (
               <AiOutlineEye fontSize={24} fill="#AFB2BF" />
               ) : (
                 <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </label>
        </div>
        <button
          type="submit"
          className="mt-6 rounded-[8px] text-black w-3/4 bg-green-400 py-[8px] px-[12px] font-medium"
        >
          Create Account
        </button>
      </form>
    );
};

export default SignupForm;
