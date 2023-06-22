import React from "react";
import { useState, useEffect } from "react";

import { FaEdit, FaSearch, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

const Payment = () => {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [Doctor, setDoctor] = useState("");
  const [charge, setCharge] = useState("");
  const [discount, setDiscount] = useState("");
  const [id, setId] = useState("");
  const [edit, setEdit] = useState(false);
  const [Payment, setPayment] = useState(
    JSON.parse(localStorage.getItem(" Payment")) || []
  );
  const [search, setSearch] = useState("");
  const [modes, setModes] = useState(false);
  // context api value get personal
  //const { personal } = useContext(PersonalContext);
  const [personal] = useState(
    JSON.parse(localStorage.getItem("personal")) || []
  );
  const [data] = useState(JSON.parse(localStorage.getItem("data")) || []);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!edit) {
      if (!name || !date || !Doctor || !charge || !discount) {
        toast.error("Please fill all the fields");
      } else {
        const newPersonal = {
          id: new Date().getTime().toString(),
          name: name,
          date: date,
          Doctor: Doctor,
          charge: charge,
          discount: discount,
        };
        setPayment([...Payment, newPersonal]);
        toast.success(" Payment added successfully");
        setName("");
        setDate("");
        setDoctor("");
        setCharge("");
        setDiscount("");
        setModes(false);
      }
    } else {
      const newPersonal = Payment.map((person) => {
        if (person.id === id) {
          return {
            ...person,
            name: name,
            date: date,
            Doctor: Doctor,
            charge: charge,
            discount: discount,
          };
        }
        return person;
      });
      setPayment(newPersonal);
      toast.success(" Payment edited successfully");
      setName("");
      setDate("");
      setDoctor("");
      setCharge("");
      setDiscount("");

      setModes(false);
      setEdit(false);
    }
  };

  const handleDelete = (id) => {
    const newPersonal = Payment.filter((person) => person.id !== id);
    setPayment(newPersonal);

    toast.success("Personal deleted successfully");
  };
  const handleEdit = (id) => {
    const newPersonal = Payment.find((person) => person.id === id);
    setEdit(true);
    setName(newPersonal.name);
    setDate(newPersonal.date);
    setDoctor(newPersonal.Doctor);
    setCharge(newPersonal.charge);
    setDiscount(newPersonal.discount);

    setId(id);
    setModes(true);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleMode = () => {
    setModes(true);
    setName("");
    setDate("");
    setDoctor("");
    setCharge("");
    setDiscount("");

    setEdit(false);
  };

  const handleModeCancel = () => {
    setModes(false);
    setName("");
    setDate("");
    setDoctor("");
    setCharge("");
    setDiscount("");

    setEdit(false);
  };

  useEffect(() => {
    localStorage.setItem(" Payment", JSON.stringify(Payment));
  }, [Payment]);

  const datafilter = filterData(Payment, search);
  return (
    <div className="w-full ">
      <div className="bg-gray-100 shadow-overflow-hidden sm:rounded-lg mt-4">
        <div className="flex flex-row justify-between"></div>
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Payment Details
          </h3>
        </div>

        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="  py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="bg-white shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <div className="flex justify-between items-center ">
                <div className="flex items-center">
                  <FaSearch className="text-gray-400 mr-2 ml-2" />
                  <input
                    type="search"
                    placeholder="Search"
                    className="outline-none  border-b-2 border-gray-400 "
                    value={search}
                    onChange={handleSearch}
                  />
                </div>
                <div className="flex items-center m-2">
                  <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md"
                    onClick={handleMode}
                  >
                    Add Payment
                  </button>
                </div>
              </div>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr className=" ">
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      scope="col"
                    >
                      Name
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      scope="col"
                    >
                      Date
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      scope="col"
                    >
                      Doctor
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      scope="col"
                    >
                      charge
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      scope="col"
                    >
                      discount
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      scope="col"
                    >
                      Total
                    </th>

                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {datafilter.map((person) => {
                    const { id, name, date, Doctor, charge, discount } = person;
                    return (
                      <tr key={id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {name}
                              </div>
                              <div className="text-sm text-gray-500"></div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{date}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            {Doctor}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          ${charge}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          ${discount}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          ${charge - discount}
                        </td>

                        <div className="flex flex-row">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <button
                              className="text-green-500 hover:text-green-700  font-bold py-2 px-4 rounded-full"
                              onClick={() => {
                                handleEdit(id);
                              }}
                            >
                              <FaEdit />
                            </button>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <button
                              type="submit"
                              className="text-red-600 hover:text-red-700  font-bold py-2 px-4 rounded-full"
                              onClick={() => handleDelete(id)}
                            >
                              <FaTrash />
                            </button>
                          </td>
                        </div>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {modes && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg w-1/2">
            <div className="flex justify-end">
              <button onClick={handleModeCancel} className="text-3xl">
                &times;
              </button>
            </div>
            <form onSubmit={handleSubmit} className="px-8 py-6">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  name patient
                </label>
                <select
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="" disabled>
                    Select Patient
                  </option>

                  {personal.map((person) => {
                    const { id, name } = person;
                    return (
                      <option key={id} value={name}>
                        {name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  date
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Name"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Doctor
                </label>
                <select
                  value={Doctor}
                  onChange={(e) => setDoctor(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="" disabled>
                    Select Doctor
                  </option>
                  {data.map((item) => {
                    return (
                      <option key={item.name} value={item.id}>
                        {item.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  charge
                </label>
                <input
                  type="number"
                  value={charge}
                  onChange={(e) => setCharge(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="charge"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  discount
                </label>
                <input
                  type="number"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="discount"
                />
              </div>

              <div className="flex items-center justify-between">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  {edit ? "Update" : "Save"}
                </button>
                <button
                  onClick={handleModeCancel}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );

  function filterData(data, search) {
    if (!search) {
      return data;
    }
    return data.filter((item) => {
      return (
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.date.toLowerCase().includes(search.toLowerCase()) ||
        item.Doctor.toLowerCase().includes(search.toLowerCase())
      );
    });
  }
};

export default Payment;
