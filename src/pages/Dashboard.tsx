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
        <label htmlFor="registration-number">Group:</label>
        <br />
        <input
          className="p-2 my-1 w-1/4 border border-gray-400 rounded"
          id="registration-number"
          type="text"
          placeholder="Enter group"
          value={group}
          onChange={(e) => setGroup(e.target.value)}
        />
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
                <th className="border px-4 py-2">Literature</th>
                <th className="border px-4 py-2">Foreign language</th>
                <th className="border px-4 py-2">Physics</th>
                <th className="border px-4 py-2">Chemistry</th>
                <th className="border px-4 py-2">Biology</th>
                <th className="border px-4 py-2">History</th>
                <th className="border px-4 py-2">Georaphy</th>
                <th className="border px-4 py-2">Civic education</th>
                <th className="border px-4 py-2">Language ID</th>
              </tr>
            </thead>
            <tbody>
              {result.map((student) => {
                const sum =
                  student.toan +
                  student.ngu_van +
                  student.ngoai_ngu +
                  student.vat_li +
                  student.hoa_hoc +
                  student.sinh_hoc +
                  student.lich_su +
                  student.dia_li +
                  student.gdcd;

                return (
                  <tr key={student.sbd}>
                    <td className="border px-4 py-2">{student.sbd}</td>
                    <td className="border px-4 py-2">{student.toan}</td>
                    <td className="border px-4 py-2">{student.ngu_van}</td>
                    <td className="border px-4 py-2">{student.ngoai_ngu}</td>
                    <td className="border px-4 py-2">{student.vat_li}</td>
                    <td className="border px-4 py-2">{student.hoa_hoc}</td>
                    <td className="border px-4 py-2">{student.sinh_hoc}</td>
                    <td className="border px-4 py-2">{student.lich_su}</td>
                    <td className="border px-4 py-2">{student.dia_li}</td>
                    <td className="border px-4 py-2">{student.gdcd}</td>
                    <td className="border px-4 py-2">{student.ma_ngoai_ngu}</td>

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
