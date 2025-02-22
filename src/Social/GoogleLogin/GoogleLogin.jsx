import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import socket from "../../components/Socket";

const GoogleLogin = () => {
  const { googleLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    googleLogin()
      .then((res) => {
        const userInfo = {
          uid: res.user?.uid,
          email: res.user?.email,
          name: res.user?.displayName,
        };

        // Send user data to the server using Socket.io
        socket.emit("add_user", userInfo);
        toast.success("User logged in successfully!");

        // Navigate to home after login
        navigate("/");
      })
      .catch((error) => {
        console.error("Google Sign-In failed:", error);
        toast.error("Google Sign-In failed. Please try again.");
      });
  };

  return (
    <div>
      <button
        className="btn btn-ghost btn-outline hover:bg-blue-400"
        onClick={handleGoogleSignIn}
      >
        Sign in with Google
      </button>
    </div>
  );
};

export default GoogleLogin;
