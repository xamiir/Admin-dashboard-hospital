//import { Fragment, useState } from "react";
import { Fragment } from "react";
import { Link, Outlet } from "react-router-dom";
import {
  FaHome,
  FaCalendarCheck,
  FaUserMd,
  FaWarehouse,
  FaAmbulance,
  FaCcMastercard,
} from "react-icons/fa";
// import departments icon fa icon
export default function Sidebar() {
  return (
    <Fragment>
      <div className="flex flex-col flex-shrink-0  bg-gray-800 colored text-white dark-mode:text-gray-200 dark-mode:bg-gray-800 w-[250px] h-screen ">
        <div
          className="bg-gray-900 text-white block px-3 py-2 rounded-md  font-medium text-2xl"
          aria-current="page"
        >
          <div className="flex items-center justify-center">
            <img
              className="h-8 w-8 rounded-full object-cover"
              src="https://media.gettyimages.com/id/1312706413/photo/modern-hospital-building.jpg?s=612x612&w=gi&k=20&c=1-EC4Mxf--5u4ItDIzrIOrduXlbKRnbx9xWWtiifrDo="
              alt="profile"
            />
            <span className="ml-3 text-xl font-bold">HOSPITAL SYSTEM</span>
          </div>
        </div>
        <div className="flex flex-col justify-between flex-1 h-0 overflow-y-auto">
          <ul className="flex flex-col py-4 space-y-1">
            <li className="px-5">
              <Link
                to="/"
                className="flex items-center px-2 py-2 text-sm font-medium leading-snug text-white rounded-md dark-mode:text-gray-200 hover:bg-gray-700 dark-mode:hover:bg-white"
              >
                <FaHome className="w-5 h-5" />
                <span className="ml-2">Home</span>
              </Link>
            </li>

            <li className="px-5">
              <Link
                to="/appointments"
                className="flex items-center px-2 py-2 text-sm font-medium leading-snug text-white rounded-md dark-mode:text-gray-200 hover:bg-gray-700 dark-mode:hover:bg-white"
              >
                <FaCalendarCheck className="w-5 h-5" />
                <span className="ml-2">Appointments </span>
              </Link>
            </li>
            <li className="px-5">
              <Link
                to="/doctors"
                className="flex items-center px-2 py-2 text-sm font-medium leading-snug text-white rounded-md dark-mode:text-gray-200 hover:bg-gray-700 dark-mode:hover:bg-white"
              >
                <FaUserMd className="w-5 h-5" />
                <span className="ml-2">Doctors </span>
              </Link>
            </li>

            <li className="px-5">
              <Link
                to="/departments"
                className="flex items-center px-2 py-2 text-sm font-medium leading-snug text-white rounded-md dark-mode:text-gray-200 hover:bg-gray-700 dark-mode:hover:bg-white"
              >
                <FaWarehouse className="w-5 h-5" />
                <span className="ml-2">Departments </span>
              </Link>
            </li>
            <li className="px-5">
              <Link
                to="/patients"
                className="flex items-center px-2 py-2 text-sm font-medium leading-snug text-white rounded-md dark-mode:text-gray-200 hover:bg-gray-700 dark-mode:hover:bg-white"
              >
                <FaAmbulance className="w-5 h-5" />
                <span className="ml-2">Patients </span>
              </Link>
            </li>
            <li className="px-5">
              <Link
                to="/payments"
                className="flex items-center px-2 py-2 text-sm font-medium leading-snug text-white rounded-md dark-mode:text-gray-200 hover:bg-gray-700 dark-mode:hover:bg-white"
              >
                <FaCcMastercard className="w-5 h-5" />
                <span className="ml-2">Payments</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col overflow-x-hidden flex-1">
        <div className="flex flex-col w-full h-full overflow-hidden border-t">
          <main className="flex flex-col overflow-x-hidden flex-1">
            <div className="flex flex-col flex-1  overflow-x-hidden mx-10">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </Fragment>
  );
}
