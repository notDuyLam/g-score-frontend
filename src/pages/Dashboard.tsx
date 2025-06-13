import { useState } from "react";
import axios from "axios";

interface SearchResult {
  sbd: string;
  toan: number;
  ngu_van: number;
  ngoai_ngu: number;
  vat_li: number;
  hoa_hoc: number;
  sinh_hoc: number;
  lich_su: number;
  dia_li: number;
  gdcd: number;
  ma_ngoai_ngu: string;
}

export default function Dashboard() {
  const [group, setGroup] = useState("");
  const [result, setResult] = useState<SearchResult[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!group.trim()) return;

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await axios.get<SearchResult[]>(
        `http://localhost:3000/api/group/${group}`
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
      <div className="registration-number p-8 m-4 bg-white border border-gray-300 shadow-lg rounded-lg">
        <div className="text-lg font-bold py-2">
          See Top 10 Student by Group
        </div>
        <label htmlFor="group-select">Group:</label>
        <br />
        <select
          className="p-2 my-1 w-1/4 border border-gray-400 rounded"
          id="group-select"
          value={group}
          onChange={(e) => setGroup(e.target.value)}
        >
          <option value="">Select group</option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
        </select>
        <button
          onClick={handleSubmit}
          className="bg-black text-white hover:bg-gray-800 py-2 px-4 mx-2 rounded"
        >
          Submit
        </button>
      </div>
      {loading && <p className="text-gray-600">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {result && result.length > 0 && (
        <div className="overflow-x-auto mt-6">
          <table className="min-w-full bg-white border">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2">Registration Number</th>
                <th className="border px-4 py-2">Math</th>
                <th className="border px-4 py-2">Physics</th>
                <th className="border px-4 py-2">Chemistry</th>
                <th className="border px-4 py-2">Sum of Group A Grade</th>
              </tr>
            </thead>
            <tbody>
              {result.map((student) => {
                const sum = student.toan + student.vat_li + student.hoa_hoc;

                return (
                  <tr key={student.sbd}>
                    <td className="border px-4 py-2">{student.sbd}</td>
                    <td className="border px-4 py-2">{student.toan}</td>
                    <td className="border px-4 py-2">{student.vat_li}</td>
                    <td className="border px-4 py-2">{student.hoa_hoc}</td>

                    <td className="border px-4 py-2">{sum}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
