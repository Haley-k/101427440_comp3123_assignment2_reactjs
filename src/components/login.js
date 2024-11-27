import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import "../styles.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post("/api/v1/user/login", { email, password });
            localStorage.setItem("token", response.data.token);
            alert("Login successful!");
            navigate("/employees");
        } catch (error) {
            alert("Login failed!");
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
            <p style={{textAlign:"center"}}>
                Don't have an account?{" "}
                <button type="button" onClick={() => navigate("/signup")}>
                    Register
                </button>
            </p>
        </div>
    );
};

export default Login;
