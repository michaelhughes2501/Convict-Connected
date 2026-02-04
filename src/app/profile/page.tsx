
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Camera, MapPin, Tag, Heart, Settings, ShieldCheck } from "lucide-react";
import Image from "next/image";

export default function ProfilePage() {
  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      <header className="relative mb-20">
        <div className="h-48 w-full bg-gradient-to-r from-primary/30 to-secondary/30 rounded-2xl"></div>
        <div className="absolute -bottom-16 left-8 flex items-end gap-6">
          <div className="relative w-32 h-32 rounded-full border-4 border-background bg-muted overflow-hidden">
            <Image src="https://picsum.photos/seed/myuser/400/400" alt="My Profile" fill className="object-cover" />
            <button className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 flex items-center justify-center text-white transition-opacity">
              <Camera size={24} />
            </button>
          </div>
          <div className="pb-4 space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold">Cody Bennett</h1>
              <Badge variant="secondary" className="gap-1"><ShieldCheck size={12} /> Verified Yard Rank</Badge>
            </div>
            <p className="text-muted-foreground flex items-center gap-1">
              <MapPin size={16} /> State Correctional Facility • Block D
            </p>
          </div>
        </div>
        <div className="absolute -bottom-12 right-0">
          <Button variant="outline" className="gap-2">
            <Settings size={18} /> Edit Profile
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold">My Rap Sheet (Background)</h2>
            <Card>
              <CardContent className="pt-6">
                <p className="text-muted-foreground leading-relaxed italic">
                  "Served 4 years for non-violent offenses. Learned a lot about patience and community. I'm a self-taught electrician now and looking for someone who values growth as much as I do. I believe in second chances."
                </p>
              </CardContent>
            </Card>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Interests</h2>
            <div className="flex flex-wrap gap-2">
              {["Weightlifting", "Electrical Work", "Science Fiction", "Dogs", "Jazz", "Meditating"].map(tag => (
                <Badge key={tag} className="px-4 py-1 bg-primary/10 text-primary border-primary/20">{tag}</Badge>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Looking For</h2>
            <Card className="bg-accent/5 border-accent/20">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                    <Heart className="text-accent" />
                  </div>
                  <span className="font-semibold">Genuine Connection</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Someone who can handle the long distance, fly kites regularly, and is ready for the transition phase. I value honesty above everything.
                </p>
              </CardContent>
            </Card>
          </section>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Vital Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="flex justify-between border-b pb-2">
                <span className="text-muted-foreground">Release Window</span>
                <span className="font-medium">Early 2026</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-muted-foreground">Crime Type</span>
                <span className="font-medium">Theft</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-muted-foreground">Trust Score</span>
                <Badge className="bg-green-500 hover:bg-green-600">High</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Kites Sent</span>
                <span className="font-medium">142</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-primary text-primary-foreground">
            <CardHeader>
              <CardTitle className="text-lg">Support the Yard</CardTitle>
              <CardDescription className="text-primary-foreground/70">Contribute to the forum moderation.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-white text-primary hover:bg-white/90">Join Moderation Team</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
