export default function Score() {
  return (
    <>
      <div className="registration-number p-8 m-4 bg-white border border-gray-300 shadow-lg  rounded-lg">
        <div className="text-lg font-bold py-2">User Registration</div>
        <label htmlFor="registration-number">Registration Number:</label>
        <br></br>
        <input
          className="p-2 my-1 w-1/4 border-1 rounded"
          id="registration-number"
          type="text"
          placeholder="Enter registration number"
        />
        <button className="bg-black text-white hover:cursor-pointer py-2 px-4 mx-2 rounded">
          Submit
        </button>
      </div>
      <div className="p-8 m-4 bg-white border border-gray-300 shadow-lg  rounded-lg">
        <div className="text-lg font-bold py-2">Detailed Score</div>
        <div className="">Detailed view of search score here</div>
      </div>
    </>
  );
}
