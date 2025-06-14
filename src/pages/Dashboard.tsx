import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Trophy, Calculator, Users, GraduationCap } from "lucide-react";
import { API_BASE_URL } from "@/config/api";

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
  const [result, setResult] = useState<SearchResult[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const group = "A"; // Fixed to Group A only

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await axios.get<SearchResult[]>(
        `${API_BASE_URL}/api/group/${group}`
      );
      setResult(res.data);
    } catch (err) {
      console.error(err);
      setError("No result found or server error.");
    } finally {
      setLoading(false);
    }
  };

  const getScoreBadge = (score: number) => {
    if (score >= 8) return <Badge className="bg-green-500">{score}</Badge>;
    if (score >= 6.5) return <Badge variant="secondary">{score}</Badge>;
    if (score >= 5) return <Badge variant="outline">{score}</Badge>;
    return <Badge variant="destructive">{score}</Badge>;
  };

  const getSumBadge = (sum: number) => {
    if (sum >= 24) return <Badge className="bg-green-500">{sum}</Badge>;
    if (sum >= 20) return <Badge variant="secondary">{sum}</Badge>;
    if (sum >= 15) return <Badge variant="outline">{sum}</Badge>;
    return <Badge variant="destructive">{sum}</Badge>;
  };

  const getRankIcon = (index: number) => {
    if (index === 0) return <Trophy className="h-4 w-4 text-yellow-500" />;
    if (index === 1) return <Trophy className="h-4 w-4 text-gray-400" />;
    if (index === 2) return <Trophy className="h-4 w-4 text-amber-600" />;
    return (
      <span className="text-sm font-bold text-muted-foreground">
        #{index + 1}
      </span>
    );
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <GraduationCap className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold tracking-tight">
            Group A Top Students
          </h1>
        </div>
        <p className="text-muted-foreground">
          View the top 10 students in Group A (Math, Physics, Chemistry)
        </p>
      </div>

      {/* Search Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Top 10 Students - Group A
          </CardTitle>
          <CardDescription>
            Display the highest-performing students in Group A subjects
            (Mathematics, Physics, Chemistry)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-2">
              <Calculator className="h-5 w-5 text-primary" />
              <span className="font-medium">Selected Group:</span>
              <Badge variant="default" className="text-sm">
                Group A (Math + Physics + Chemistry)
              </Badge>
            </div>
          </div>
          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full md:w-auto"
          >
            {loading ? "Loading..." : "Load Top 10 Students"}
          </Button>
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
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Results Table */}
      {result && result.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5" />
              Top 10 Students Ranking
            </CardTitle>
            <CardDescription>
              Students ranked by their combined Group A scores (Math + Physics +
              Chemistry)
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4 bg-muted/50 rounded-lg">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {result.length}
                </div>
                <div className="text-sm text-muted-foreground">
                  Students Listed
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {Math.max(
                    ...result.map((s) => s.toan + s.vat_li + s.hoa_hoc)
                  )}
                </div>
                <div className="text-sm text-muted-foreground">
                  Highest Total Score
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {(
                    result.reduce(
                      (sum, s) => sum + s.toan + s.vat_li + s.hoa_hoc,
                      0
                    ) / result.length
                  ).toFixed(1)}
                </div>
                <div className="text-sm text-muted-foreground">
                  Average Total Score
                </div>
              </div>
            </div>

            {/* Table */}
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16">Rank</TableHead>
                  <TableHead>Registration Number</TableHead>
                  <TableHead className="text-center">Math</TableHead>
                  <TableHead className="text-center">Physics</TableHead>
                  <TableHead className="text-center">Chemistry</TableHead>
                  <TableHead className="text-center">Total Score</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {result.map((student, index) => {
                  const sum = student.toan + student.vat_li + student.hoa_hoc;
                  return (
                    <TableRow key={student.sbd} className="hover:bg-muted/50">
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          {getRankIcon(index)}
                        </div>
                      </TableCell>
                      <TableCell className="font-mono font-medium">
                        {student.sbd}
                      </TableCell>
                      <TableCell className="text-center">
                        {getScoreBadge(student.toan)}
                      </TableCell>
                      <TableCell className="text-center">
                        {getScoreBadge(student.vat_li)}
                      </TableCell>
                      <TableCell className="text-center">
                        {getScoreBadge(student.hoa_hoc)}
                      </TableCell>
                      <TableCell className="text-center">
                        {getSumBadge(sum)}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* No Data State */}
      {!result && !loading && !error && (
        <Card>
          <CardContent className="p-8 text-center">
            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Ready to Load Data</h3>
            <p className="text-muted-foreground">
              Click the button above to load the top 10 students in Group A
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
