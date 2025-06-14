import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { Search, GraduationCap, Calculator } from "lucide-react";

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

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const subjectLabels: Record<string, string> = {
    toan: "Mathematics",
    ngu_van: "Literature",
    ngoai_ngu: "Foreign Language",
    vat_li: "Physics",
    hoa_hoc: "Chemistry",
    sinh_hoc: "Biology",
    lich_su: "History",
    dia_li: "Geography",
    gdcd: "Civic Education",
    ma_ngoai_ngu: "Language ID",
  };

  const getScoreBadge = (score: number) => {
    if (score >= 8) return <Badge className="bg-green-500">{score}</Badge>;
    if (score >= 6.5) return <Badge variant="secondary">{score}</Badge>;
    if (score >= 5) return <Badge variant="outline">{score}</Badge>;
    return <Badge variant="destructive">{score}</Badge>;
  };

  const calculateTotalScore = (result: SearchResult) => {
    const scores = [
      result.toan,
      result.ngu_van,
      result.ngoai_ngu,
      result.vat_li,
      result.hoa_hoc,
      result.sinh_hoc,
      result.lich_su,
      result.dia_li,
      result.gdcd,
    ].filter((score) => typeof score === "number" && score > 0);

    return scores.length > 0
      ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(2)
      : "N/A";
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <GraduationCap className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold tracking-tight">
            Student Score Lookup
          </h1>
        </div>
        <p className="text-muted-foreground">
          Enter a registration number to view detailed exam scores
        </p>
      </div>

      {/* Search Input Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Student Search
          </CardTitle>
          <CardDescription>
            Enter the student's registration number to retrieve their exam
            results
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="registration-number">Registration Number</Label>
            <div className="flex gap-3">
              <Input
                id="registration-number"
                type="text"
                placeholder="Enter registration number (e.g., 01000001)"
                value={regNumber}
                onChange={(e) => setRegNumber(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1"
              />
              <Button
                onClick={handleSubmit}
                disabled={loading || !regNumber.trim()}
                className="min-w-[100px]"
              >
                {loading ? "Searching..." : "Search"}
              </Button>
            </div>
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
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-48" />
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

      {/* Result Section */}
      {result && !loading && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              Detailed Score Report
            </CardTitle>
            <CardDescription>
              Registration Number:{" "}
              <span className="font-mono font-semibold">{result.sbd}</span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Summary Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-muted/50 rounded-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">
                    {calculateTotalScore(result)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Average Score
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">
                    {
                      Object.entries(result).filter(
                        ([key, value]) =>
                          key !== "sbd" &&
                          key !== "ma_ngoai_ngu" &&
                          typeof value === "number" &&
                          value > 0
                      ).length
                    }
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Subjects Taken
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">
                    {result.ma_ngoai_ngu}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Language Code
                  </div>
                </div>
              </div>

              {/* Scores Table */}
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Subject</TableHead>
                    <TableHead className="text-right">Score</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Object.entries(result).map(([key, value]) =>
                    key !== "sbd" && key !== "ma_ngoai_ngu" ? (
                      <TableRow key={key}>
                        <TableCell className="font-medium">
                          {subjectLabels[key] || key}
                        </TableCell>
                        <TableCell className="text-right">
                          {typeof value === "number" && value > 0 ? (
                            getScoreBadge(value)
                          ) : (
                            <Badge variant="outline">N/A</Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    ) : null
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* No Results State */}
      {!result && !loading && !error && (
        <Card>
          <CardContent className="p-8 text-center">
            <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Ready to Search</h3>
            <p className="text-muted-foreground">
              Enter a registration number above to view student scores
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
