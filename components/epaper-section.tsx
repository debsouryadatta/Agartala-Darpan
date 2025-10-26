"use client";

import { useState, useEffect } from "react";
import { Download, Calendar as CalendarIcon, ChevronLeft, ChevronRight, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import PdfViewer from "./pdf-viewer";
import { toast } from "sonner";
import { format } from "date-fns";

interface Epaper {
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

export default function EpaperSection() {
  const [currentPaper, setCurrentPaper] = useState<Epaper | null>(null);
  const [availableDates, setAvailableDates] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  // Fetch available dates and initial paper
  useEffect(() => {
    fetchAvailableDates();
    fetchInitialPaper();
  }, []);

  const fetchAvailableDates = async () => {
    try {
      const response = await fetch("/api/papers?dates=true");
      if (response.ok) {
        const data = await response.json();
        setAvailableDates(data.dates);
      }
    } catch (error) {
      console.error("Error fetching available dates:", error);
    }
  };

  const fetchInitialPaper = async () => {
    try {
      const response = await fetch("/api/papers");
      if (response.ok) {
        const data = await response.json();
        setCurrentPaper(data);
        setSelectedDate(new Date(data.date));
        // Track view for initial paper
        trackView(data.id);
      }
    } catch (error) {
      console.error("Error fetching initial paper:", error);
      toast.error("Failed to load e-paper");
    } finally {
      setLoading(false);
    }
  };

  const trackView = async (paperId: string) => {
    try {
      const response = await fetch("/api/papers/views", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ paperId }),
      });

      if (response.ok) {
        const data = await response.json();
        // Update the current paper's view count
        setCurrentPaper(prev => prev ? { ...prev, views: data.views } : null);
      }
    } catch (error) {
      console.error("Error tracking view:", error);
      // Don't show error to user as this is a background operation
    }
  };

  const fetchPaperByDate = async (date: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/papers?date=${date}`);
      if (response.ok) {
        const data = await response.json();
        setCurrentPaper(data);
        // Track view for the newly loaded paper
        trackView(data.id);
      } else {
        toast.error("No e-paper available for this date");
      }
    } catch (error) {
      console.error("Error fetching paper:", error);
      toast.error("Failed to load e-paper");
    } finally {
      setLoading(false);
    }
  };

  // Handle date selection from calendar
  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;

    const formattedDate = format(date, "yyyy-MM-dd");
    
    if (availableDates.includes(formattedDate)) {
      setSelectedDate(date);
      fetchPaperByDate(formattedDate);
      toast.success(`Showing e-paper for ${format(date, "PPP")}`);
    } else {
      toast.error("No e-paper available for this date");
    }
  };

  const handleDownload = () => {
    if (currentPaper) {
      window.open(currentPaper.pdfUrl, "_blank");
      toast.info(`Downloading ${currentPaper.fileName}...`);
    }
  };

  const handlePrevious = () => {
    if (!currentPaper) return;
    
    const currentDateIndex = availableDates.indexOf(currentPaper.date);
    if (currentDateIndex < availableDates.length - 1) {
      const previousDate = availableDates[currentDateIndex + 1];
      fetchPaperByDate(previousDate);
      setSelectedDate(new Date(previousDate));
    }
  };

  const handleNext = () => {
    if (!currentPaper) return;
    
    const currentDateIndex = availableDates.indexOf(currentPaper.date);
    if (currentDateIndex > 0) {
      const nextDate = availableDates[currentDateIndex - 1];
      fetchPaperByDate(nextDate);
      setSelectedDate(new Date(nextDate));
    }
  };

  const getCurrentIndex = () => {
    if (!currentPaper) return 0;
    return availableDates.indexOf(currentPaper.date);
  };

  return (
    <section id="epaper" className="w-full bg-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        {loading ? (
          <Card className="p-6 shadow-xl border-taupe">
            <div className="flex items-center justify-center h-[600px]">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-burgundy mx-auto mb-4"></div>
                <p className="bengali-text text-charcoal">লোড হচ্ছে...</p>
              </div>
            </div>
          </Card>
        ) : !currentPaper ? (
          <Card className="p-6 shadow-xl border-taupe">
            <div className="flex items-center justify-center h-[400px]">
              <div className="text-center">
                <CalendarIcon className="w-16 h-16 text-charcoal/30 mx-auto mb-4" />
                <p className="bengali-text text-xl text-charcoal/70 mb-2">
                  কোনো ই-পেপার পাওয়া যায়নি
                </p>
                <p className="font-inter text-sm text-charcoal/50">
                  No e-papers published yet
                </p>
              </div>
            </div>
          </Card>
        ) : (
          <Card className="p-3 sm:p-6 shadow-xl border-taupe">
            {/* Date and Views Header */}
            <div className="mb-4 sm:mb-6 flex flex-row items-center justify-between gap-3 pb-4 border-b border-taupe">
              <div className="text-left">
                <p className="font-inter text-xs sm:text-sm text-charcoal/60">
                  {new Date(currentPaper.date).toLocaleDateString("en-IN", {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
              
              {/* Views Counter - Compact & Beautiful */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white rounded-full border border-burgundy/30 shadow-sm hover:shadow-md transition-shadow flex-shrink-0">
                <Eye className="w-3.5 h-3.5 text-burgundy" />
                <span className="font-inter text-xs text-charcoal/70 whitespace-nowrap">
                  {currentPaper.views.toLocaleString()} <span className="text-charcoal/50">views</span>
                </span>
              </div>
            </div>

            <PdfViewer pdfUrl={currentPaper.pdfUrl} />

            <div className="flex flex-col items-center justify-center gap-4 mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-taupe">
              <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                <Button
                  onClick={handleDownload}
                  className="w-full sm:w-auto bg-burgundy hover:bg-burgundy/90 text-white px-6 py-3 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 font-inter"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download This Paper
                </Button>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full sm:w-auto border-burgundy text-burgundy hover:bg-burgundy hover:text-white transition-all duration-300 px-6 py-3 font-inter"
                    >
                      <CalendarIcon className="w-5 h-5 mr-2" />
                      Select Date
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="center">
                    <Calendar
                      mode="single"
                      selected={selectedDate || new Date(currentPaper.date)}
                      onSelect={handleDateSelect}
                      disabled={(date) => {
                        const dateStr = format(date, "yyyy-MM-dd");
                        return !availableDates.includes(dateStr);
                      }}
                      initialFocus
                      className="rounded-md border border-burgundy"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {availableDates.length > 1 && (
                <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <Button
                      variant="outline"
                      size="icon"
                      disabled={getCurrentIndex() >= availableDates.length - 1}
                      className="border-burgundy text-burgundy hover:bg-burgundy hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
                      onClick={handlePrevious}
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </Button>

                    <div className="flex items-center gap-2 px-3 sm:px-4 py-2 border border-taupe rounded-lg flex-1 sm:flex-initial justify-center">
                      <CalendarIcon className="w-4 h-4 text-burgundy flex-shrink-0" />
                      <span className="font-inter text-xs sm:text-sm text-charcoal truncate">
                        {new Date(currentPaper.date).toLocaleDateString("bn-IN")}
                      </span>
                    </div>

                    <Button
                      variant="outline"
                      size="icon"
                      disabled={getCurrentIndex() <= 0}
                      className="border-burgundy text-burgundy hover:bg-burgundy hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
                      onClick={handleNext}
                    >
                      <ChevronRight className="w-5 h-5" />
                    </Button>
                  </div>

                  <p className="font-inter text-xs text-charcoal/50">
                    Paper {getCurrentIndex() + 1} of {availableDates.length}
                  </p>
                </div>
              )}
            </div>
          </Card>
        )}
      </div>
    </section>
  );
}
