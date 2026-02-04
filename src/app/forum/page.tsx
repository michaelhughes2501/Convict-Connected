
"use client";

import { FORUM_POSTS } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { MessageSquare, ThumbsUp, Flag, Plus, Search } from "lucide-react";

export default function ForumPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-headline font-bold text-foreground">The Yard Talk</h1>
          <p className="text-muted-foreground">Community wisdom and moderated support.</p>
        </div>
        <Button className="gap-2">
          <Plus size={18} /> Start a Topic
        </Button>
      </header>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
        <Input placeholder="Search forum topics..." className="pl-10 h-12" />
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {["All Topics", "Release Advice", "Legal Aid", "Food", "Hobby", "Mental Health"].map(tag => (
          <Badge key={tag} variant="secondary" className="px-4 py-1.5 cursor-pointer hover:bg-secondary/80">
            {tag}
          </Badge>
        ))}
      </div>

      <div className="space-y-6">
        {FORUM_POSTS.map((post) => (
          <Card key={post.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2 mb-2">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback>{post.author[0]}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-semibold">{post.author}</span>
                  <span className="text-xs text-muted-foreground">• 3 hours ago</span>
                </div>
                <Badge variant="outline" className="text-[10px] uppercase tracking-wider">{post.category}</Badge>
              </div>
              <CardTitle className="text-xl">{post.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">{post.content}</p>
            </CardContent>
            <CardFooter className="border-t pt-4 flex justify-between items-center">
              <div className="flex gap-4">
                <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors">
                  <ThumbsUp size={16} /> {post.likes}
                </button>
                <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors">
                  <MessageSquare size={16} /> 12 Comments
                </button>
              </div>
              <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-destructive transition-colors">
                <Flag size={14} /> Report
              </button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="bg-muted p-4 rounded-lg flex items-center justify-center gap-2 text-xs text-muted-foreground">
        <Flag size={14} /> This forum is strictly moderated. Please follow the Community Codes.
      </div>
    </div>
  );
}
