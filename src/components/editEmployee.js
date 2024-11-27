import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";
import "../styles.css";

const EditEmployee = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState(null);

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await api.get(`/api/v1/emp/employees/${id}`);
                setFormData(response.data);
            } catch (error) {
                console.error("Error fetching employee:", error);
            }
        };
        fetchEmployee();
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.put(`/api/v1/emp/employees/${id}`, formData);
            alert("Employee updated successfully!");
            navigate("/employees");
        } catch (error) {
            console.error("Error updating employee:", error);
        }
    };

    if (!formData) return <p>Loading...</p>;

    return (
        <div>
            <h2>Edit Employee</h2>
            <form onSubmit={handleSubmit}>
                <input name="first_name" value={formData.first_name} onChange={handleChange} required />
                <input name="last_name" value={formData.last_name} onChange={handleChange} required />
                <input name="email" value={formData.email} onChange={handleChange} required />
                <input name="position" value={formData.position} onChange={handleChange} required />
                <input name="salary" type="number" value={formData.salary} onChange={handleChange} required />
                <input name="date_of_joining" type="date" value={formData.date_of_joining.split("T")[0]} onChange={handleChange} required />
                <input name="department" value={formData.department} onChange={handleChange} required />
                <button type="submit" className="save-buttons">Save</button>
                <button onClick={() => navigate("/employees")} className="cancel-buttons">Cancel</button>
            </form>
        </div>
    );
};

export default EditEmployee;