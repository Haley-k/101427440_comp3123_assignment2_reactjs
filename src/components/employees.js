import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import "../styles.css";

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [searchCriteria, setSearchCriteria] = useState({ department: "", position: "" });
    const navigate = useNavigate();

    const fetchEmployees = async (criteria = {}) => {
        try {
            const filteredCriteria = Object.fromEntries(
                Object.entries(criteria).filter(([_, value]) => value.trim() !== "")
            );

            const params = new URLSearchParams(filteredCriteria).toString(); // Convert criteria to query string
            console.log("Search params:", params);
            const response = await api.get(`/api/v1/emp/search?${params}`);
            setEmployees(response.data);
        } catch (error) {
            if (error.response && error.response.status === 404) {
                setEmployees([]);
            } else {
                console.error("Error fetching employees:", error.response?.data || error.message);
            }
        }
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this employee?");
        if (!confirmDelete) return;

        try {
            await api.delete(`/api/v1/emp/employees?eid=${id}`);
            alert("Employee deleted successfully!");
            setEmployees(employees.filter((employee) => employee._id !== id)); // Update the state
        } catch (error) {
            console.error("Error deleting employee:", error);
            alert("Failed to delete employee.");
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        fetchEmployees(searchCriteria); // Fetch employees based on search criteria
    };

    const handleInputChange = (e) => {
        setSearchCriteria({
            ...searchCriteria,
            [e.target.name]: e.target.value,
        });
    };

    const handleReset = () => {
        setSearchCriteria({ department: "", position: "" }); // Reset search inputs
        fetchEmployees(); // Fetch all employees
    };

    const handleLogout = () => {
        localStorage.removeItem("token"); // Remove token from localStorage
        navigate("/login"); // Redirect to login page
    };

    useEffect(() => {
        fetchEmployees(); // Fetch all employees initially
    }, []);

    return (
        <div>
           <div className="top-buttons">
                <h2>Employee List</h2>
                <div>
                    <button onClick={() => navigate("/employees/add")} className="addEmp-button">
                        Add Employee
                    </button>
                    <button onClick={handleLogout} className="logOut-button">Logout</button>
                </div>
            </div>

            {/* Search Form */}
            <form onSubmit={handleSearch} className="search-form">
                <input
                    type="text"
                    name="department"
                    placeholder="Search by Department"
                    value={searchCriteria.department}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="position"
                    placeholder="Search by Position"
                    value={searchCriteria.position}
                    onChange={handleInputChange}
                />
                <button type="submit" className="save-buttons">Search</button>
                <button type="button" onClick={handleReset} className="cancel-buttons">Reset</button>
            </form>

            {/* Employee Table */}
            <table>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Position</th>
                        <th>Department</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee) => (
                        <tr key={employee._id}>
                            <td>{employee.first_name}</td>
                            <td>{employee.last_name}</td>
                            <td>{employee.email}</td>
                            <td>{employee.position}</td>
                            <td>{employee.department}</td>
                            <td>
                                <button onClick={() => navigate(`/employees/edit/${employee._id}`)}>Update</button>
                                <button onClick={() => handleDelete(employee._id)} className="delete-buttons">Delete</button>
                                <button onClick={() => navigate(`/employees/${employee._id}`)}>View</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeeList;
