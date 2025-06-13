export default function Score() {
  return (
    <div className="p-6 m-4 bg-white border border-gray-300 shadow-lg  rounded-lg">
      <div className="registration-number p-2">
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
      <div className="detail-score p-2">
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
    </div>
  );
}
