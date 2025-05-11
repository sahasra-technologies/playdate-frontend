import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("access");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div>
        <h1>Dashboard</h1>
        <button onClick={() => {
        Cookies.remove("access");
        Cookies.remove("refresh");
        navigate("/");
      }}>
        Logout
      </button>
    </div>
  );
};
export default Dashboard;
