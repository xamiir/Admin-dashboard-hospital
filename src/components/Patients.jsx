import React from "react";
import { useState, useEffect } from "react";

import { FaEdit, FaSearch, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

const Petients = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState(0);
  const [id, setId] = useState("");
  const [edit, setEdit] = useState(false);
  const [last, setLast] = useState("");
  const [status, setStatus] = useState("");
  const [personal, setPersonal] = useState(
    JSON.parse(localStorage.getItem("personal")) || []
  );
  const [search, setSearch] = useState("");
  const [modes, setModes] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!edit) {
      if (!name || !email || !phone || !age || !last || !status) {
        toast.error("Please fill all the fields");
      } else {
        const newPersonal = {
          id: new Date().getTime().toString(),
          name: name,
          email: email,
          phone: phone,
          age: age,
          last: last,
          status: status,
        };
        setPersonal([...personal, newPersonal]);
        toast.success("Personal added successfully");
        setName("");
        setEmail("");
        setPhone("");
        setAge("");
        setLast("");
        setStatus("");
        setModes(false);
      }
    } else {
      const newPersonal = personal.map((person) => {
        if (person.id === id) {
          return {
            ...person,
            name: name,
            email: email,
            phone: phone,
            age: age,

            last: last,
            status: status,
          };
        }
        return person;
      });
      setPersonal(newPersonal);
      toast.success("Personal edited successfully");
      setName("");
      setEmail("");
      setPhone("");
      setAge("");
      setLast("");
      setStatus("");
      setModes(false);
      setEdit(false);
    }
  };

  const handleDelete = (id) => {
    const newPersonal = personal.filter((person) => person.id !== id);
    setPersonal(newPersonal);

    toast.success("Personal deleted successfully");
  };
  const handleEdit = (id) => {
    const newPersonal = personal.find((person) => person.id === id);
    setEdit(true);
    setName(newPersonal.name);
    setEmail(newPersonal.email);
    setPhone(newPersonal.phone);
    setAge(newPersonal.age);
    setLast(newPersonal.last);
    setStatus(newPersonal.status);
    setId(id);
    setModes(true);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleMode = () => {
    setModes(true);
    setName("");
    setEmail("");
    setPhone("");
    setAge("");
    setLast("");
    setStatus("");
    setEdit(false);
  };

  const handleModeCancel = () => {
    setModes(false);
    setName("");
    setEmail("");
    setPhone("");
    setAge("");
    setLast("");
    setStatus("");
    setEdit(false);
  };

  useEffect(() => {
    localStorage.setItem("personal", JSON.stringify(personal));
  }, [personal]);

  const datafilter = filterData(personal, search);
  return (
    <div className="w-full ">
      <div className="bg-gray-100 shadow-overflow-hidden sm:rounded-lg mt-4">
        <div className="flex flex-row justify-between"></div>
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            patients Information
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
                    Add New patient
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
                      Address
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      scope="col"
                    >
                      Phone
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      scope="col"
                    >
                      age
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      scope="col"
                    >
                      Last visited
                    </th>

                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      scope="col"
                    >
                      Status
                    </th>

                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {datafilter.map((person) => {
                    const { id, name, email, phone, age, last, status } =
                      person;
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
                          <div className="text-sm text-gray-900">{email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            {phone}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {age}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {last}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {status === "pending" ? (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              {status}
                            </span>
                          ) : (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                              {status}
                            </span>
                          )}
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
                  Last visited
                </label>
                <input
                  type="date"
                  value={last}
                  onChange={(e) => setLast(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Name"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Name"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Address
                </label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Address"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Phone
                </label>
                <input
                  type="number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Phone"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  age
                </label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="age"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  status
                </label>

                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="" disabled>
                    Select status
                  </option>
                  <option value="pending">pending</option>
                  <option value="closed">closed</option>
                </select>
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
        item.email.toLowerCase().includes(search.toLowerCase()) ||
        item.phone.toLowerCase().includes(search.toLowerCase()) ||
        item.age.toLowerCase().includes(search.toLowerCase()) ||
        item.status.toLowerCase().includes(search.toLowerCase())
      );
    });
  }
};

export default Petients;
