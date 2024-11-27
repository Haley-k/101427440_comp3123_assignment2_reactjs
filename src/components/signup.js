import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import "../styles.css";

const Signup = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post("/api/v1/user/signup", { username, email, password });
            alert("Signup successful!");
            console.log(response.data);

            setUsername("");
            setEmail("");
            setPassword("");

            navigate("/login");
        } catch (error) {
            alert("Signup failed!");
            console.error(error.response ? error.response.data : error.message);
        }
    };

    return (
        <div>
            <h2>Signup</h2>
            <form onSubmit={handleSignup}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
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
                <button type="submit" className="save-buttons">Sign Up</button>
                <button type="button" onClick={() => navigate("/login")} className="cancel-buttons">Go Back</button>
            </form>
        </div>
    );
};

export default Signup;