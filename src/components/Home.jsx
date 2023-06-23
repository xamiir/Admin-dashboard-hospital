const Home = () => {
  return (
    <div className="">
      <div className="flex flex-wrap justify-center items-center">
        <div className="w-full lg:w-1/3 xl:w-1/3 p-3">
          <div className="bg-white border rounded shadow">
            <div className="border-b p-3">
              <h5 className="font-bold uppercase text-gray-600">
                Total appoinments
              </h5>
            </div>
            <div className="p-5">
              <p className="text-3xl font-bold text-center text-gray-800">
                1000
              </p>
              <p className="text-sm text-center text-gray-500">0.5% Target</p>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/3 xl:w-1/3 p-3">
          <div className="bg-white border rounded shadow">
            <div className="border-b p-3">
              <h5 className="font-bold uppercase text-gray-600">
                Total Patients
              </h5>
            </div>
            <div className="p-5">
              <p className="text-3xl font-bold text-center text-gray-800">
                1000
              </p>
              <p className="text-sm text-center text-gray-500">
                {1000 / 100} % From Last month
              </p>
            </div>
          </div>
        </div>

        <div className="w-full  lg:w-1/3 xl:w-1/3 p-3 ">
          <div className="bg-white border rounded shadow">
            <div className="border-b p-3">
              <h5 className="font-bold uppercase text-gray-600">
                Total Departments
              </h5>
            </div>
            <div className="p-5">
              <p className="text-3xl font-bold text-center text-gray-800">
                700
              </p>
              <p className="text-sm text-center text-gray-500">
                {7000 / 100} % From Last month
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap flex-col md:flex-row">
        <div className="w-full md:w-1/2 xl:w-1/3 p-3">
          <div className="bg-white border rounded shadow">
            <div className="border-b p-3">
              <h5 className="font-bold uppercase text-gray-600">Payments</h5>
            </div>
            <div className="p-5">
              <p className="text-3xl font-bold text-center text-gray-800">
                $5689
              </p>
              <p className="text-sm text-center text-gray-500">
                {5689 / 100} % From Last month
              </p>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2 xl:w-1/3 p-3">
          <div className="bg-white border rounded shadow">
            <div className="border-b p-3">
              <h5 className="font-bold uppercase text-gray-600">
                Total Doctors
              </h5>
            </div>
            <div className="p-5">
              <p className="text-3xl font-bold text-center text-gray-800">
                100
              </p>
              <p className="text-sm text-center text-gray-500">
                {100 / 100} % From Last month
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
