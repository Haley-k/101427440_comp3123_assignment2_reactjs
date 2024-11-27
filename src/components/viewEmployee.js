import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";
import "../styles.css";

const ViewEmployee = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [employee, setEmployee] = useState(null);

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await api.get(`/api/v1/emp/employees/${id}`);
                setEmployee(response.data);
            } catch (error) {
                console.error("Error fetching employee details:", error);
            }
        };
        fetchEmployee();
    }, [id]);

    if (!employee) return <p>Loading...</p>;

    return (
        <div>
            <h2>Employee Details</h2>
            <p>First Name: {employee.first_name}</p>
            <p>Last Name: {employee.last_name}</p>
            <p>Email: {employee.email}</p>
            <p>Position: {employee.position}</p>
            <p>Salary: {employee.salary}</p>
            <p>Date of Joining: {new Date(employee.date_of_joining).toLocaleDateString()}</p>
            <p>Department: {employee.department}</p>

            <button onClick={() => navigate("/employees")}>Back to Employees List</button>
        </div>
    );
};

export default ViewEmployee;