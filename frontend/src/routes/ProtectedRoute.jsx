import {Navigate,Outlet}from'react-router-dom';
import{useAuth}from'../context/AuthContext';
import Loader from'../components/Loader';
export default function ProtectedRoute(){
    const{user,loading}=useAuth();
    return loading?<Loader full/>:user?<Outlet/>:<Navigate to="/login" replace/>}
