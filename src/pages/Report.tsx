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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { BarChart3, TrendingUp, Users, BookOpen } from "lucide-react";

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

  const subjects = [
    { value: "toan", label: "Mathematics" },
    { value: "ngu_van", label: "Literature" },
    { value: "ngoai_ngu", label: "Foreign Language" },
    { value: "vat_ly", label: "Physics" },
    { value: "hoa_hoc", label: "Chemistry" },
    { value: "sinh_hoc", label: "Biology" },
    { value: "lich_su", label: "History" },
    { value: "dia_li", label: "Geography" },
    { value: "gdcd", label: "Civic Education" },
  ];

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

  const totalStudents = processedData.reduce(
    (sum, data) => sum + data.count,
    0
  );

  const chartData = {
    labels: ["<4", "4–6", "6–8", ">=8"],
    datasets: [
      {
        label: "Number of Students",
        data: processedData.map((d) => d.count),
        backgroundColor: [
          "#ef4444", // Red for <4
          "#f59e0b", // Orange for 4-6
          "#3b82f6", // Blue for 6-8
          "#10b981", // Green for >=8
        ],
        borderRadius: 4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: `${
          subjects.find((s) => s.value === subject)?.label
        } Score Distribution`,
        font: { size: 18, weight: "bold" as const }, // ✅ cast literal
        color: "#1f2937",
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const percentage = ((context.raw / totalStudents) * 100).toFixed(1);
            return `${context.raw.toLocaleString()} students (${percentage}%)`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Score Range",
          font: { size: 14, weight: "bold" as const }, // ✅ fix here
        },
        grid: {
          display: false,
        },
      },
      y: {
        title: {
          display: true,
          text: "Number of Students",
          font: { size: 14, weight: "bold" as const }, // ✅ and here
        },
        beginAtZero: true,
        grid: {
          color: "#f3f4f6",
        },
      },
    },
  };

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case "<4":
        return "destructive";
      case ">=4 and <6":
        return "secondary";
      case ">=6 and <8":
        return "default";
      case ">=8":
        return "default";
      default:
        return "outline";
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <BarChart3 className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold tracking-tight">
            Score Distribution Report
          </h1>
        </div>
        <p className="text-muted-foreground">
          Analyze student performance distribution across different subjects
        </p>
      </div>

      {/* Subject Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Subject Selection
          </CardTitle>
          <CardDescription>
            Choose a subject to view its score distribution
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <label className="text-sm font-medium">Subject:</label>
            <Select value={subject} onValueChange={setSubject}>
              <SelectTrigger className="w-64">
                <SelectValue placeholder="Select a subject" />
              </SelectTrigger>
              <SelectContent>
                {subjects.map((subj) => (
                  <SelectItem key={subj.value} value={subj.value}>
                    {subj.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Error Alert */}
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Loading State */}
      {loading && (
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-64" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="h-20" />
                ))}
              </div>
              <Skeleton className="h-96 w-full" />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Results */}
      {!loading && !error && counts.length > 0 && (
        <div className="space-y-6">
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {processedData.map((data, index) => {
              const percentage =
                totalStudents > 0
                  ? ((data.count / totalStudents) * 100).toFixed(1)
                  : "0";
              return (
                <Card key={data.label} className="text-center">
                  <CardContent className="p-4">
                    <div className="text-2xl font-bold text-primary mb-1">
                      {data.count.toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground mb-2">
                      {percentage}% of students
                    </div>
                    <Badge
                      variant={getGradeColor(data.label)}
                      className="text-xs"
                    >
                      Score: {data.label}
                    </Badge>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Summary Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Summary Statistics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">
                    {totalStudents.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Total Students
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">
                    {processedData[3].count.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Excellent (≥8)
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-600">
                    {processedData[0].count.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Below Average (&lt;4)
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Distribution Chart
              </CardTitle>
              <CardDescription>
                Visual representation of score distribution for{" "}
                {subjects.find((s) => s.value === subject)?.label}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96">
                <Bar data={chartData} options={chartOptions} />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* No Data State */}
      {!loading && !error && counts.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Data Available</h3>
            <p className="text-muted-foreground">
              No score data found for the selected subject.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
