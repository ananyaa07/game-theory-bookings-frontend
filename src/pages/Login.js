import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Login = ({ setUserType }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [navbarUserType, setNavbarUserType] = useState("");
	const [loginError, setLoginError] = useState("");
	const [successMessage, setSuccessMessage] = useState(""); 
	const navigate = useNavigate();

	const API_BASE = 'http://localhost:3001/api';

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoginError(""); 
		setSuccessMessage("");

		try {
			const response = await fetch(`${API_BASE}/v1/auth/login`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, password }),
			});

			if (!response.ok) {
				throw new Error("Invalid email or password");
			}

			const data = await response.json();
			const { user, token } = data;

			// Store token in local storage
			localStorage.setItem("token", token);

			// Set user type based on role
			localStorage.setItem("role", user.role);
			setNavbarUserType(user.role);

			setSuccessMessage("Logged in successfully!");
			
			setTimeout(() => {
				if (user.role === "admin") {
					navigate("/promote");
				} else {
					navigate("/bookings/create"); 
				}
			}, 2000); 
		} catch (error) {
			console.error("Login error:", error);
			setLoginError(error.message);
		}
	};

	return (
		<div>
			<Navbar userType={navbarUserType} />
			<div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
				<div className="bg-white shadow-lg rounded-lg p-6 max-w-sm w-full">
					<h2 className="text-3xl font-semibold text-center text-navyBlue mb-6">
						Login
					</h2>
					{successMessage && (
						<div className="text-green-500 text-sm text-center mb-4">
							{successMessage}
						</div>
					)}
					<form onSubmit={handleSubmit} className="space-y-4">
						<div>
							<label className="block text-gray-700 mb-2" htmlFor="email">
								Email
							</label>
							<input
								type="email"
								id="email"
								className="w-full p-2 border border-gray-300 rounded-lg"
								placeholder="Enter your email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
							/>
						</div>
						<div>
							<label className="block text-gray-700 mb-2" htmlFor="password">
								Password
							</label>
							<input
								type="password"
								id="password"
								className="w-full p-2 border border-gray-300 rounded-lg"
								placeholder="Enter your password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
							/>
						</div>
						{loginError && (
							<div className="text-red-500 text-sm">{loginError}</div>
						)}
						<div>
							<button
								type="submit"
								className="w-full bg-navyBlue text-white py-2 rounded-lg"
							>
								Login
							</button>
						</div>
					</form>
					<p className="text-center mt-4 text-gray-600">
						Not a user?{" "}
						<Link to="/signup" className="text-navyBlue font-semibold">
							Sign up here
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Login;
