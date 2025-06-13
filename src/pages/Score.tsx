import { useState } from "react";
import axios from "axios";

interface SearchResult {
  sbd: string;
  toan: number;
  ngu_van: number;
  ngoai_ngu: number;
  vat_ly: number;
  hoa_hoc: number;
  sinh_hoc: number;
  lich_su: number;
  dia_li: number;
  gdcd: number;
  ma_ngoai_ngu: string;
}

export default function Score() {
  const [regNumber, setRegNumber] = useState("");
  const [result, setResult] = useState<SearchResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!regNumber.trim()) return;

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await axios.get<SearchResult>(
        `http://localhost:3000/api/${regNumber}`
      );
      setResult(res.data);
    } catch (err) {
      console.error(err);
      setError("No result found or server error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Search Input Section */}
      <div className="registration-number p-8 m-4 bg-white border border-gray-300 shadow-lg rounded-lg">
        <div className="text-lg font-bold py-2">User Registration</div>
        <label htmlFor="registration-number">Registration Number:</label>
        <br />
        <input
          className="p-2 my-1 w-1/4 border border-gray-400 rounded"
          id="registration-number"
          type="text"
          placeholder="Enter registration number"
          value={regNumber}
          onChange={(e) => setRegNumber(e.target.value)}
        />
        <button
          onClick={handleSubmit}
          className="bg-black text-white hover:bg-gray-800 py-2 px-4 mx-2 rounded"
        >
          Submit
        </button>
      </div>

      {/* Result Section */}
      <div className="p-8 m-4 bg-white border border-gray-300 shadow-lg rounded-lg">
        <div className="text-lg font-bold py-2">Detailed Score</div>

        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {result && (
          <table className="table-auto w-full border mt-4">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2">Subject</th>
                <th className="border px-4 py-2">Score</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(result).map(([key, value]) =>
                key !== "sbd" ? (
                  <tr key={key}>
                    <td className="border px-4 py-2 capitalize">
                      {key.replace(/_/g, " ")}
                    </td>
                    <td className="border px-4 py-2">{value}</td>
                  </tr>
                ) : null
              )}
              <tr></tr>
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
