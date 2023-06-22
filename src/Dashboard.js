import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./components/Sidebar";
import Doctors from "./components/Doctors";
import Home from "./components/Home";
import Department from "./components/Department";
import Petients from "./components/Patients";
import Appointments from "./components/Appointments";
import Payment from "./components/Payment";

const Dashboard = () => {
  // time out for toast

  const timeOut = 1000;

  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <div className="flex h-screen bg-gray-200">
              <Sidebar />
            </div>
          }
        >
          <Route path="/" element={<Home />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/departments" element={<Department />} />
          <Route path="/patients" element={<Petients />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/payments" element={<Payment />} />
        </Route>
      </Routes>
      <ToastContainer position="top-right" autoClose={timeOut} />
    </BrowserRouter>
  );
};

export default Dashboard;
