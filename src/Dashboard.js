import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Sidebar from "./components/Sidebar";
import Doctors from "./components/Doctors";
import Home from "./components/Home";
import Department from "./components/Department";

const Dashboard = () => {
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
        </Route>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
};

export default Dashboard;
