import { useState, useEffect } from "react";

import { FaEdit, FaSearch, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

const Department = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [edit, setEdit] = useState(false);
  const [idex, setIndex] = useState(0);
  const [search, setSearch] = useState("");
  const [Department, setDepartment] = useState(
    JSON.parse(localStorage.getItem("Department")) || []
  );

  const HandelSubmit = (e) => {
    e.preventDefault();
    if (!edit) {
      if (!name || !image) {
        toast.error("Please fill all the fields");
      } else {
        const newData = { name, image };
        setDepartment([...Department, newData]);
        setName("");

        setImage("");
        setOpen(false);
        toast.success("Departments  added successfully");
      }
    } else {
      const newData = { name, image };
      const updatedData = Department.map((item, index) => {
        if (index === idex) {
          return newData;
        }
        return item;
      });
      setDepartment(updatedData);
      setName("");

      setImage("");
      setOpen(false);
      setEdit(false);
      toast.success("Departments updated successfully");
    }
  };

  const handleDelete = (index) => {
    const newData = Department.filter((idex, i) => i !== index);
    setDepartment(newData);
    toast.success(" Departments  deleted successfully");
  };

  const handleEdit = (index) => {
    setEdit(true);
    setIndex(index);
    setName(Department[index].name);

    setImage(Department[index].image);
    setOpen(true);
  };
  useEffect(() => {
    localStorage.setItem("Department", JSON.stringify(Department));
  }, [Department]);

  const Handelopen = () => {
    setOpen(true);
  };
  const Handelclose = () => {
    setOpen(false);
  };
  const datafilter = filterData(Department, search);
  return (
    <div className="flex justify-center bg-gray-100 h-full mt-2">
      <div className="flex flex-col w-full bg-white shadow-lg rounded-md">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-2xl font-medium text-gray-800">
            Departments Page
          </h2>

          <button
            className="flex items-center justify-center px-4 py-2 text-sm text-white bg-green-500 rounded-md"
            onClick={Handelopen}
          >
            <span>AddNew Department</span>
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
                      <div class="flex items-center justify-center w-full h-56 bg-gray-100 rounded-t-lg dark:bg-gray-700">
                        <img
                          src={item.image}
                          alt="avatar"
                          class="w-full h-full overflow-hidden object-cover rounded-t-lg"
                        />
                      </div>

                      <div class="px-5 pb-5">
                        <div className="flex justify-between">
                          <h1 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                            {item.name}
                          </h1>
                        </div>

                        <div class="flex justify-between mt-2">
                          <span class="text-sm font-medium text-gray-600 dark:text-gray-200">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Minima error cupiditate quis illum beatae
                            itaque ipsum accusamus ad tempora repellendus
                            commodi suscipit dignissimos libero ipsam, cum
                            dolore quaerat, tempore voluptatem?
                          </span>
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

  function filterData(Department, search) {
    if (!search) {
      return Department;
    }
    return Department.filter((item) => {
      return item.name.toLowerCase().includes(search.toLowerCase());
    });
  }
};

export default Department;
