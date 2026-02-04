
"use client";

import { useState } from "react";
import { INMATES } from "@/lib/mock-data";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MapPin, Tag, Filter } from "lucide-react";
import Image from "next/image";

export default function ShakedownPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [crimeFilter, setCrimeFilter] = useState("all");

  const filteredInmates = INMATES.filter(inmate => {
    const matchesSearch = inmate.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          inmate.background.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCrime = crimeFilter === "all" || inmate.crimeType === crimeFilter;
    return matchesSearch && matchesCrime;
  });

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <header className="space-y-2">
        <h1 className="text-4xl font-headline font-bold text-foreground">The Shakedown</h1>
        <p className="text-muted-foreground text-lg">Roll call for every facility. Find your match.</p>
      </header>

      <div className="flex flex-col md:flex-row gap-4 items-end">
        <div className="flex-1 space-y-2">
          <label className="text-sm font-medium">Search the block</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <Input 
              placeholder="Name, background, or interests..." 
              className="pl-10 h-12"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="w-full md:w-64 space-y-2">
          <label className="text-sm font-medium">Crime Category</label>
          <Select onValueChange={setCrimeFilter}>
            <SelectTrigger className="h-12">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="White Collar">White Collar</SelectItem>
              <SelectItem value="Theft">Theft</SelectItem>
              <SelectItem value="Cybercrime">Cybercrime</SelectItem>
              <SelectItem value="Burglary">Burglary</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button variant="secondary" className="h-12 px-6 gap-2">
          <Filter size={18} /> Apply Filters
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredInmates.map((inmate) => (
          <Card key={inmate.id} className="group overflow-hidden">
            <div className="relative h-64 w-full">
              <Image 
                src={inmate.imageUrl} 
                alt={inmate.name} 
                fill 
                className="object-cover transition-transform group-hover:scale-105"
                data-ai-hint="inmate photo"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <Button className="w-full bg-white text-black hover:bg-white/90">Fly a Kite</Button>
              </div>
            </div>
            <CardHeader className="p-4 pb-0">
              <CardTitle className="text-lg">{inmate.name}</CardTitle>
              <CardDescription className="flex items-center gap-1">
                <MapPin size={14} /> {inmate.location}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-2">
              <Badge variant="outline" className="flex w-fit items-center gap-1 mb-2">
                <Tag size={12} /> {inmate.crimeType}
              </Badge>
              <p className="text-sm line-clamp-2 text-muted-foreground">{inmate.background}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
