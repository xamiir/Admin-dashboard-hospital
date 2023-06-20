import { useState, useEffect } from "react";

import { FaEdit, FaSearch, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

const Doctors = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [image, setImage] = useState("");
  const [edit, setEdit] = useState(false);
  const [idex, setIndex] = useState(0);
  const [search, setSearch] = useState("");
  const [data, setData] = useState(
    JSON.parse(localStorage.getItem("data")) || []
  );

  const HandelSubmit = (e) => {
    e.preventDefault();
    if (!edit) {
      if (!name || !number || !image) {
        toast.error("Please fill all the fields");
      } else {
        const newData = { name, number, image };
        setData([...data, newData]);
        setName("");
        setNumber("");
        setImage("");
        setOpen(false);
        toast.success("Doctor added successfully");
      }
    } else {
      const newData = { name, number, image };
      const updatedData = data.map((item, index) => {
        if (index === idex) {
          return newData;
        }
        return item;
      });
      setData(updatedData);
      setName("");
      setNumber("");
      setImage("");
      setOpen(false);
      setEdit(false);
      toast.success("Doctor updated successfully");
    }
  };

  const handleDelete = (index) => {
    const newData = data.filter((idex, i) => i !== index);
    setData(newData);
    toast.success("Doctor deleted successfully");
  };

  const handleEdit = (index) => {
    setEdit(true);
    setIndex(index);
    setName(data[index].name);
    setNumber(data[index].number);
    setImage(data[index].image);
    setOpen(true);
  };
  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(data));
  }, [data]);

  const Handelopen = () => {
    setOpen(true);
  };
  const Handelclose = () => {
    setOpen(false);
  };
  const datafilter = filterData(data, search);
  return (
    <div className="flex justify-center bg-gray-100 h-full mt-2">
      <div className="flex flex-col w-full bg-white shadow-lg rounded-md">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-2xl font-medium text-gray-800">Doctors Page</h2>

          <button
            className="flex items-center justify-center px-4 py-2 text-sm text-white bg-green-500 rounded-md"
            onClick={Handelopen}
          >
            <span>AddNew Doctors</span>
          </button>
        </div>
        <div className="flex justify-space items-center ml-2">
          <div className="flex items-center">
            <FaSearch className="text-gray-400 mr-2" />
          </div>
          <input
            type="search"
            className="outline-none  border-b-2 border-gray-400"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div class="flex-grow flex h-full overflow-y-auto">
          <div class="flex flex-col bg-blue-gray-50  w-full py-4">
            <div class="flex px-2 flex-row relative"></div>
            <div className="h-full overflow-hidden mt-4">
              <div className="h-full overflow-y-auto px-2">
                <div class="grid grid-cols-3 gap-4 pb-3 ">
                  {datafilter?.map((item, index) => (
                    <div
                      class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                      key={index}
                    >
                      <div class="flex items-center justify-between px-4 py-3 border-b">
                        <img
                          src={
                            item.image ||
                            "https://t4.ftcdn.net/jpg/02/60/04/09/360_F_260040900_oO6YW1sHTnKxby4GcjCvtypUCWjnQRg5.jpg"
                          }
                          alt=""
                          // image card fit to the card
                          className=" rounded-t-lg p-8 h-72"
                        />
                      </div>
                      <div class="px-5 pb-5">
                        <div className="flex justify-between">
                          <h5 class="text-sm font-semibold tracking-tight text-gray-900 dark:text-white">
                            Name:{item.name}
                          </h5>
                          <h5 class="text-sm font-semibold tracking-tight text-gray-900 dark:text-white">
                            Tell: {item.number}
                          </h5>
                        </div>

                        <div class="flex justify-between mt-2 ">
                          <span class="text-2xl font-bold text-gray-900 dark:text-white"></span>

                          <div className="flex justify-between gap-2">
                            <button
                              className="flex items-center justify-center px-4 py-2  "
                              onClick={() => handleEdit(index)}
                            >
                              <span>
                                <FaEdit className="text-green-500" />
                              </span>
                            </button>
                            <button
                              className="flex items-center justify-center px-4 py-2 text-sm
                               "
                              onClick={() => handleDelete(index)}
                            >
                              <span>
                                <FaTrash className="text-red-500" />
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {open && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg w-1/2">
            <div className="flex justify-end">
              <button onClick={Handelclose} className="text-3xl">
                &times;
              </button>
            </div>
            <form onSubmit={HandelSubmit} className="px-8 py-6">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  //  value=file

                  onChange={(e) => {
                    const file = e.target.files[0];
                    const reader = new FileReader();
                    reader.readAsDataURL(file);

                    reader.onloadend = () => {
                      setImage(reader.result);
                    };
                  }}
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
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Phone
                </label>
                <input
                  type="number"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Phone"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                />
              </div>

              <div className="flex items-center justify-between">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Save
                </button>
                <button
                  onClick={Handelclose}
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
      return item.name.toLowerCase().includes(search.toLowerCase());
    });
  }
};

export default Doctors;
