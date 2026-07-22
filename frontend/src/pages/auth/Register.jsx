import { useState } from "react";
import {Link,useNavigate} from "react-router-dom";
import API from "../../api/axios.js";
import { toast } from "react-hot-toast";
import { FaUserCircle } from "react-icons/fa";
import "./Register.css";

const Register = () =>{
    const navigate = useNavigate();
    const [formData,setFormData] = useState({
        name:"",email:"", password:""
    });
    const handleChange = (e) =>{
        setFormData({
            ...formData,[e.target.name]:e.target.value
        });
    };

    const handleSubmit = async(e)=>{
        e.preventDefault();
        try{
            const res = await API.post("/auth/register",formData);
            toast.success("Registration Successful");
            navigate("/");
        }catch(error){
            console.log(error.response?.data);
            toast.error(error.response?.data?.message || "Registration Failed");
        }
    };
    return (
        <div className="register-page">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-5 col-md-7">
                        <div className="card shadow-lg login-card">
                            <div className="card-body p-5">
                                <div className="text-center mb-4">
                                    <FaUserCircle size={70} className="text-primary"/>
                                    <h2 className="mt-3"> Create Account</h2>
                                    <p className="text-muted">Join DevBoard</p>
                                </div>
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label className="form-label">Full Name</label>
                                        <input type="text" name="name" className="form-control"
                                         placeholder="Enter Name" value={formData.name} 
                                         onChange={handleChange} required/>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Email</label>
                                        <input type="email" name="email" className="form-control"
                                         placeholder="Enter Email" value={formData.email} 
                                         onChange={handleChange} required/>
                                    </div>
                                    <div className="mb-4">
                                        <label className="form-label">Password</label>
                                        <input type="password" name="password" className="form-control"
                                         placeholder="Enter Password" value={formData.password} 
                                         onChange={handleChange} required/>
                                    </div>
                                    <button className="btn btn-primary w-100">Register</button>

                                </form>
                                <p className="text-center mt-4">
                                    Already have an account?
                                    <Link to="/" className="ms-2">Login</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
