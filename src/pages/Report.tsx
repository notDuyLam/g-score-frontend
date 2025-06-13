import { useEffect, useState } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface CountData {
  label: string;
  count: number;
}

export default function Report() {
  const [subject, setSubject] = useState("toan");
  const [counts, setCounts] = useState<CountData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get<{ counts: CountData[] }>(
        `http://localhost:3000/api/counts/${subject}`
      );
      setCounts(res.data.counts);
    } catch (err) {
      setError("Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [subject]);

  const processedData = [
    { grade: "2", label: "<4", count: 0 },
    { grade: "5", label: ">=4 and <6", count: 0 },
    { grade: "7", label: ">=6 and <8", count: 0 },
    { grade: "9", label: ">=8", count: 0 },
  ];

  for (let data of counts) {
    const match = processedData.find((p) => p.label === data.label);
    if (match) match.count = data.count;
  }

  const chartData = {
    labels: ["<4", "4–6", "6–8", ">=8"],
    datasets: [
      {
        label: "Number of Students",
        data: [
          0,
          processedData[0].count,
          processedData[1].count,
          processedData[2].count,
          processedData[3].count,
          0,
        ],
        backgroundColor: "#3b82f6",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: `Subject score distribution chart`,
        font: { size: 18 },
      },
      tooltip: {
        callbacks: {
          label: (context: any) =>
            `${context.dataset.label}: ${context.raw.toLocaleString()}`,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Grade",
          font: { size: 16 },
        },
      },
      y: {
        title: {
          display: true,
          text: "Number of students",
          font: { size: 16 },
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-4xl mx-auto">
      <div className="mb-4">
        <label className="font-semibold block mb-2">Choose subject:</label>
        <select
          className="p-2 border border-gray-300 rounded"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        >
          <option value="toan">Math</option>
          <option value="ngu_van">Literature</option>
          <option value="ngoai_ngu">Foreign language</option>
          <option value="vat_ly">Physics</option>
          <option value="hoa_hoc">Chemistry</option>
          <option value="sinh_hoc">Biology</option>
          <option value="lich_su">History</option>
          <option value="dia_li">Geography</option>
          <option value="gdcd">Civic education</option>
        </select>
      </div>

      {loading && <p>Loading data...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && counts.length > 0 && (
        <Bar data={chartData} options={chartOptions} />
      )}
    </div>
  );
}
