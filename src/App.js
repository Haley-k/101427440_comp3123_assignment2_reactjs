import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/login";
import Signup from "./components/signup";
import EmployeeList from "./components/employees";
import AddEmployee from "./components/addEmployee";
import ViewEmployee from "./components/viewEmployee";
import EditEmployee from "./components/editEmployee";
import PrivateRoute from "./components/privateRoute";

function App() {

    // React.useEffect(() => {
    //     localStorage.removeItem("token");
    // }, []);

    const isAuthenticated = !!localStorage.getItem("token");

    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={<Navigate to={isAuthenticated ? "/employees" : "/login"} replace />}
                />

                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                <Route
                    path="/employees"
                    element={
                        <PrivateRoute>
                            <EmployeeList />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/employees/add"
                    element={
                        <PrivateRoute>
                            <AddEmployee />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/employees/:id"
                    element={
                        <PrivateRoute>
                            <ViewEmployee />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/employees/edit/:id"
                    element={
                        <PrivateRoute>
                            <EditEmployee />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;