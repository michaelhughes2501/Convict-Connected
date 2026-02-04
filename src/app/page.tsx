
import { getMatchRecommendations, type MatchRecommendationOutput } from "@/ai/flows/match-recommendation";
import { INMATES } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Heart, UserPlus, LayoutDashboard } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const currentUser = {
  background: "I am a former cook who spent 3 years in state for possession. Looking for a fresh start and someone who understands the struggle.",
  interests: "Cooking, fitness, writing letters.",
  preferences: "Someone empathetic, maybe with a similar background in the service industry."
};

export default async function YardDashboard() {
  const others = INMATES.map(i => ({ background: i.background, interests: i.interests }));
  
  let recommendations: MatchRecommendationOutput = [];

  try {
    // Attempt to get AI-powered recommendations
    recommendations = await getMatchRecommendations({
      userProfile: currentUser,
      otherUserProfiles: others
    });
  } catch (error) {
    // Graceful fallback to mock recommendations if API keys are missing or service is down
    recommendations = INMATES.map((inmate, idx) => ({
      userId: inmate.id,
      matchScore: 95 - (idx * 5),
      reason: "Shared facility history and community interests (Mock)."
    }));
  }

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <header className="flex flex-col gap-2">
        <h1 className="text-4xl font-headline font-bold text-foreground">Welcome back to the Yard</h1>
        <p className="text-muted-foreground text-lg">Your top cellie connections for today.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendations.slice(0, 3).map((rec, idx) => {
          const inmate = INMATES.find(i => i.id === rec.userId) || INMATES[idx];
          return (
            <Card key={inmate.id} className="overflow-hidden hover:shadow-lg transition-shadow border-2 border-transparent hover:border-primary/20">
              <div className="relative h-48 w-full">
                <Image 
                  src={inmate.imageUrl} 
                  alt={inmate.name} 
                  fill 
                  className="object-cover" 
                  data-ai-hint="inmate portrait"
                />
                <Badge className="absolute top-4 left-4 bg-primary text-white">
                  Match Score: {rec.matchScore}%
                </Badge>
              </div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl font-bold">{inmate.name}</CardTitle>
                    <CardDescription>{inmate.location}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 rounded-lg bg-muted text-sm italic">
                  "{rec.reason}"
                </div>
                <div className="flex gap-2">
                  <Button className="flex-1 gap-2" variant="default">
                    <Heart size={16} /> Fly a Kite
                  </Button>
                  <Button className="flex-1 gap-2" variant="outline">
                    <UserPlus size={16} /> Add Cellie
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <section className="mt-12 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Latest in the Yard</h2>
          <Button variant="link" asChild className="text-primary">
            <Link href="/forum">View Forum</Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="bg-secondary/5 border-dashed border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShieldCheck className="text-secondary" /> Paroled Success
              </CardTitle>
              <CardDescription>Real stories of release.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">"I met my partner on ConvictConnect 2 years ago while serving time. We're now married and running a bakery together."</p>
            </CardContent>
          </Card>
          <Card className="bg-primary/5 border-dashed border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LayoutDashboard className="text-primary" /> Visitation Ready?
              </CardTitle>
              <CardDescription>Check your eligibility.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">Build trust through kites to unlock virtual visits. Our AI warden monitors history to ensure safety first.</p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
