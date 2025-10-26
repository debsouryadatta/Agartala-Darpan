"use client";

import { useState, useEffect } from "react";
import { Upload, Download, Trash2, Calendar as CalendarIcon, FileText, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import { format } from "date-fns";

interface PdfRecord {
  id: string;
  date: string;
  pdfUrl: string;
  fileId: string;
  fileName: string;
  fileSize: number | null;
  uploadedBy: string;
  views: number;
  createdAt: string;
  updatedAt: string;
}

export default function PdfManagement() {
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [papers, setPapers] = useState<PdfRecord[]>([]);

  // Fetch papers from database on mount
  useEffect(() => {
    fetchPapers();
  }, []);

  const fetchPapers = async () => {
    try {
      const response = await fetch("/api/papers?all=true");
      if (response.ok) {
        const data = await response.json();
        setPapers(data);
      }
    } catch (error) {
      console.error("Error fetching papers:", error);
      toast.error("Failed to load e-papers");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type === "application/pdf") {
        setSelectedFile(file);
      } else {
        toast.error("Please select a PDF file");
      }
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile || !selectedDate) {
      toast.error("Please select both a file and date");
      return;
    }

    setUploading(true);

    try {
      // Step 1: Upload to ImageKit
      const uploadFormData = new FormData();
      uploadFormData.append("file", selectedFile);
      uploadFormData.append("date", format(selectedDate, "yyyy-MM-dd"));

      const uploadResponse = await fetch("/api/upload-epaper", {
        method: "POST",
        body: uploadFormData,
      });

      if (!uploadResponse.ok) {
        const error = await uploadResponse.json();
        throw new Error(error.error || "Upload failed");
      }

      const uploadData = await uploadResponse.json();

      // Step 2: Save to database
      const saveResponse = await fetch("/api/papers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(uploadData),
      });

      if (!saveResponse.ok) {
        throw new Error("Failed to save to database");
      }

      const { paper } = await saveResponse.json();

      // Step 3: Update UI
      setPapers([paper, ...papers]);
      setSelectedFile(null);
      setSelectedDate(undefined);
      toast.success("E-Paper published successfully!", {
        description: `${selectedFile.name} for ${format(selectedDate, "PPP")}`,
      });
    } catch (error) {
      console.error("Upload error:", error);
      toast.error(error instanceof Error ? error.message : "Failed to upload e-paper");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/papers?id=${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete");
      }

      setPapers(papers.filter((paper) => paper.id !== id));
      toast.success("E-Paper deleted successfully");
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete e-paper");
    }
  };

  const handleDownload = (pdfUrl: string, filename: string) => {
    window.open(pdfUrl, "_blank");
    toast.info(`Downloading ${filename}...`);
  };

  return (
    <div className="space-y-6">
      {/* Upload Form */}
      <Card className="p-6 bg-white shadow-lg border-taupe">
        <h3 className="font-inter text-xl font-semibold text-burgundy mb-4 flex items-center gap-2">
          <Upload className="w-5 h-5" />
          Upload New E-Paper
        </h3>

        <form onSubmit={handleUpload} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            {/* File Upload */}
            <div className="space-y-2">
              <Label htmlFor="pdf-file" className="font-inter text-charcoal">
                Select PDF File <span className="text-destructive">*</span>
              </Label>
              <Input
                id="pdf-file"
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                className="border-taupe focus:border-burgundy focus:ring-burgundy cursor-pointer"
              />
              {selectedFile && (
                <p className="text-sm text-charcoal/60 font-inter">
                  Selected: {selectedFile.name}
                </p>
              )}
            </div>

            {/* Date Picker */}
            <div className="space-y-2">
              <Label htmlFor="pdf-date" className="font-inter text-charcoal">
                Publication Date <span className="text-destructive">*</span>
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal border-taupe hover:border-burgundy"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    initialFocus
                    className="rounded-md border border-burgundy"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={uploading || !selectedFile || !selectedDate}
            className="bg-burgundy hover:bg-burgundy/90 text-white px-6 py-5 font-inter transition-all duration-300"
          >
            {uploading ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Publishing...</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Upload className="w-4 h-4" />
                <span>Publish E-Paper</span>
              </div>
            )}
          </Button>
        </form>
      </Card>

      {/* Papers Table */}
      <Card className="p-6 bg-white shadow-lg border-taupe">
        <h3 className="font-inter text-xl font-semibold text-burgundy mb-4 flex items-center gap-2">
          <FileText className="w-5 h-5" />
          Published E-Papers
        </h3>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-taupe">
                <TableHead className="font-inter text-charcoal">Date</TableHead>
                <TableHead className="font-inter text-charcoal">Filename</TableHead>
                <TableHead className="font-inter text-charcoal">Views</TableHead>
                <TableHead className="font-inter text-charcoal">Uploaded At</TableHead>
                <TableHead className="font-inter text-charcoal text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-12">
                    <div className="flex items-center justify-center gap-2">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-burgundy"></div>
                      <span className="font-inter text-charcoal/60">Loading...</span>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                papers.map((paper) => (
                  <TableRow key={paper.id} className="border-taupe">
                    <TableCell className="font-inter">
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="w-4 h-4 text-burgundy" />
                        {new Date(paper.date).toLocaleDateString("en-IN")}
                      </div>
                    </TableCell>
                    <TableCell className="font-inter font-medium">
                      {paper.fileName}
                    </TableCell>
                    <TableCell className="font-inter">
                      <div className="flex items-center gap-2">
                        <Eye className="w-4 h-4 text-burgundy" />
                        <span className="font-semibold text-burgundy">
                          {paper.views.toLocaleString()}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="font-inter text-charcoal/70">
                      {new Date(paper.createdAt).toLocaleString("en-IN")}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleDownload(paper.pdfUrl, paper.fileName)}
                          className="border-burgundy text-burgundy hover:bg-burgundy hover:text-white transition-all duration-300"
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleDelete(paper.id)}
                          className="border-destructive text-destructive hover:bg-destructive hover:text-white transition-all duration-300"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>

          {papers.length === 0 && (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-charcoal/30 mx-auto mb-3" />
              <p className="font-inter text-charcoal/60">
                No e-papers published yet
              </p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}