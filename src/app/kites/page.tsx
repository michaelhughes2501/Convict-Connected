
"use client";

import { useState } from "react";
import { INMATES } from "@/lib/mock-data";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Send, Clock, MoreHorizontal } from "lucide-react";

export default function KitesPage() {
  const [selectedKite, setSelectedKite] = useState(INMATES[0]);

  return (
    <div className="flex h-screen bg-card overflow-hidden">
      {/* Sidebar List */}
      <div className="w-full md:w-80 border-r border-border flex flex-col bg-background">
        <div className="p-4 border-b border-border space-y-4">
          <h2 className="text-2xl font-bold">Kite Box</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
            <Input placeholder="Search messages..." className="pl-9" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {INMATES.map((inmate) => (
            <button
              key={inmate.id}
              onClick={() => setSelectedKite(inmate)}
              className={`w-full p-4 flex gap-3 hover:bg-muted transition-colors text-left ${selectedKite.id === inmate.id ? 'bg-muted border-r-4 border-primary' : ''}`}
            >
              <Avatar>
                <AvatarImage src={inmate.imageUrl} />
                <AvatarFallback>{inmate.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1 overflow-hidden">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-semibold truncate">{inmate.name}</span>
                  <span className="text-[10px] text-muted-foreground">2h ago</span>
                </div>
                <p className="text-xs text-muted-foreground truncate italic">"Sent you a kite about the yard schedule..."</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Kite Content */}
      <div className="flex-1 flex flex-col">
        <header className="p-4 border-b border-border flex justify-between items-center bg-background">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={selectedKite.imageUrl} />
              <AvatarFallback>{selectedKite.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-bold">{selectedKite.name}</h3>
              <p className="text-xs text-muted-foreground">Currently in {selectedKite.location}</p>
            </div>
          </div>
          <Button variant="ghost" size="icon">
            <MoreHorizontal size={20} />
          </Button>
        </header>

        <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-[#F4F2F7]">
          <div className="flex flex-col gap-1 max-w-[70%]">
            <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm text-sm">
              Hey {selectedKite.name}, saw your profile. I spent some time in Singsing too back in '19. How's the yard these days?
            </div>
            <span className="text-[10px] text-muted-foreground ml-2">Sent via Kite • 09:15 AM</span>
          </div>

          <div className="flex flex-col gap-1 items-end max-w-[70%] ml-auto">
            <div className="bg-primary text-primary-foreground p-4 rounded-2xl rounded-tr-none shadow-sm text-sm">
              Hey! The yard is okay, mostly just keeping to myself and reading. It's nice to connect with someone who knows the routine.
            </div>
            <span className="text-[10px] text-muted-foreground mr-2">Received via Kite • 10:45 AM</span>
          </div>
        </div>

        <footer className="p-4 bg-background border-t border-border">
          <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
            <Input placeholder="Write your kite..." className="flex-1" />
            <Button className="gap-2">
              <Send size={16} /> Fly Kite
            </Button>
          </form>
          <div className="flex items-center gap-2 mt-2 text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">
            <Clock size={10} /> All Kites are monitored for yard safety.
          </div>
        </footer>
      </div>
    </div>
  );
}
