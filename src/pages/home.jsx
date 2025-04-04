import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import SideBar from "../components/sidebar";
import MdWrapper from "../components/mdwrapper";
import { ToastContainer } from "react-toastify";
import { Navigate } from "react-router-dom";


const HomePage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const location = useLocation();
  
    console.log("HomePage rendering with state:", { isLoading, isAuthenticated });
  
    useEffect(() => {
      const checkAuth = async () => {
        console.log("Checking authentication status...");
        try {
          const response = await fetch('http://localhost:3000/status', {
            credentials: 'include',
            cache: 'no-store'
          });
          
          console.log("Auth response:", response.status);
          
          if (response.ok) {
            const data = await response.json();
            console.log("Auth data:", data);
            
            if (data.loggedIn && data.user) {
              setIsAuthenticated(true);
            } else {
              setIsAuthenticated(false);
            }
          } else {
            setIsAuthenticated(false);
          }
        } catch (error) {
          console.error("Auth check error:", error);
          setIsAuthenticated(false);
        } finally {
          setIsLoading(false);
        }
      };
      
      checkAuth();
    }, []);
  
    // Simple conditional rendering. This solved the issue. Don't know why? 
    if (isLoading) {
      return <div className="p-10">Loading...</div>;
    }
    
    if (!isAuthenticated) {
      console.log("Not authenticated, redirecting to login");
      return <Navigate to="/login" state={{ from: location }} />;
    }
  
    return (
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 h-screen overflow-hidden">
          <SideBar />
          <div className="col-span-2 md:col-span-3 lg:col-span-4 overflow-auto">
            <MdWrapper />
            <ToastContainer />
          </div>
        </div>
      );
      
      
      
  };


  export default HomePage;
  