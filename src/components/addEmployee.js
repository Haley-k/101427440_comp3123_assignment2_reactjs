import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import "../styles.css";

const AddEmployee = () => {
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        position: "",
        salary: "",
        date_of_joining: "",
        department: "",
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post("/api/v1/emp/employees", formData);
            alert("Employee added successfully!");
            navigate("/employees");
        } catch (error) {
            console.error("Error adding employee:", error);
        }
    };

    return (
        <div>
            <h2>Add Employee</h2>
            <form onSubmit={handleSubmit}>
                <input name="first_name" placeholder="First Name" onChange={handleChange} required />
                <input name="last_name" placeholder="Last Name" onChange={handleChange} required />
                <input name="email" placeholder="Email" onChange={handleChange} required />
                <input name="position" placeholder="Position" onChange={handleChange} required />
                <input name="salary" placeholder="Salary" type="number" onChange={handleChange} required />
                <input name="date_of_joining" placeholder="Date of Joining" type="date" onChange={handleChange} required />
                <input name="department" placeholder="Department" onChange={handleChange} required />
                <button type="submit" className="save-buttons">Save</button>
                <button onClick={() => navigate("/employees")} className="cancel-buttons">Cancel</button>
            </form>
        </div>
    );
};

export default AddEmployee;