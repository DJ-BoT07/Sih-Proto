import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { format } from 'date-fns';
import { motion } from 'framer-motion';

export function GlobeDialog({ setSelectedArea }) {
  const router = useRouter();
  const [date, setDate] = useState(new Date());
  const [localSelectedArea, setLocalSelectedArea] = useState(null);
  const [selectedSubArea, setSelectedSubArea] = useState(null);

  const subAreas = {
    "BSES Rajdhani Power Limited": [
      "Vasant Kunj", "Saket", "Vasant Vihar", "Dwarka",
      "Janakpuri", "Punjabi Bagh", "Hauz Khas", "Rajouri Garden"
    ],
    "BSES Yamuna Power Limited": [
      "Mayur Vihar", "Laxmi Nagar", "Gandhi Nagar", "Preet Vihar",
      "Shahdara", "Chandni Chowk", "Yamuna Vihar", "Krishna Nagar"
    ],
    "Tata Power Delhi Distribution Limited": [
      "Rohini", "Pitampura", "Shalimar Bagh", "Model Town",
      "Ashok Vihar", "Civil Lines", "Narela", "Jahangirpuri"
    ],
    "New Delhi Municipal Council": [
      "Connaught Place", "Chanakyapuri", "India Gate", "Lutyens' Delhi",
      "President's Estate", "Parliament House area"
    ],
  };

  const handleAreaChange = (value) => {
    setLocalSelectedArea(value);
    setSelectedArea(value);
    setSelectedSubArea(null);
  };

  const handleSubAreaChange = (value) => {
    setSelectedSubArea(value);
  };

  const handleSubmit = () => {
    if (localSelectedArea && selectedSubArea && date) {
      const formattedDate = format(date, 'yyyy-MM-dd');
      router.push(`/chart?area=${encodeURIComponent(localSelectedArea)}&subArea=${encodeURIComponent(selectedSubArea)}&date=${formattedDate}`);
    } else {
      alert("Please select an area, sub-area, and date before submitting.");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-bold rounded-full shadow-lg hover:scale-105 transition-all duration-300">
          Explore Forecast
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-w-[90vw]">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl font-bold text-center">Select Area and Date</DialogTitle>
        </DialogHeader>
        <motion.div 
          className="grid gap-4 sm:gap-6 py-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid grid-cols-4 items-center gap-2 sm:gap-4">
            <label htmlFor="area" className="text-right text-sm sm:text-base">
              Area
            </label>
            <Select onValueChange={handleAreaChange}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select an area" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(subAreas).map((area) => (
                  <SelectItem key={area} value={area}>{area}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {localSelectedArea && (
            <motion.div 
              className="grid grid-cols-4 items-center gap-2 sm:gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <label htmlFor="subarea" className="text-right text-sm sm:text-base">
                Sub-Area
              </label>
              <Select onValueChange={handleSubAreaChange}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a sub-area" />
                </SelectTrigger>
                <SelectContent>
                  {subAreas[localSelectedArea].map((subArea) => (
                    <SelectItem key={subArea} value={subArea}>{subArea}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </motion.div>
          )}
          <div className="grid grid-cols-4 items-center gap-2 sm:gap-4">
            <label htmlFor="date" className="text-right text-sm sm:text-base">
              Date
            </label>
            <div className="col-span-3">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md max-w-full"
                disabled={(date) => date < new Date() || date > new Date(new Date().setFullYear(new Date().getFullYear() + 1))}
              />
            </div>
          </div>
        </motion.div>
        <Button 
          type="submit" 
          onClick={handleSubmit}
          className="w-full font-bold py-2 px-4 rounded-full transition-colors duration-300"
        >
          Generate Forecast
        </Button>
      </DialogContent>
    </Dialog>
  );
}