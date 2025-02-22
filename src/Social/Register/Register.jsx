/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import socket from "../../components/Socket";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import GoogleLogin from "../GoogleLogin/GoogleLogin";

const Register = () => {
  const { createUser, user } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (user && userData) {
      const { password, ...safeUserData } = userData; // Exclude password before sending
      const newUser = { ...safeUserData, uid: user.uid };

      socket.emit("add_user", newUser);
      toast.success("User registered successfully!");
    }
  }, [user, userData]);

  const onSubmit = async (data) => {
    try {
      console.log("User Data:", data);
      await createUser(data.email, data.password);
      setUserData(data); // Store user data but include password temporarily
      navigate("/home");
    } catch (error) {
      console.error("Registration failed:", error);
      toast.error(error.message || "Registration failed!");
    }
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Register now!</h1>
          <p className="py-6">
            Join our platform and explore amazing opportunities. Sign up now!
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
            {/* Name Input */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="Your Name"
                className="input input-bordered"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>

            {/* Email Input */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Your Email"
                className="input input-bordered"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid email format",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            {/* Password Input */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Your Password"
                className="input input-bordered"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Register Button */}
            <div className="form-control flex gap-4 mt-6">
              <button className="btn btn-primary" type="submit">
                Register
              </button>
              <GoogleLogin></GoogleLogin>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
