
import { assessVisitEligibility, type VirtualVisitEligibilityOutput } from "@/ai/flows/virtual-visit-eligibility";
import { INMATES } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Video, Calendar, ShieldAlert, CheckCircle2, Lock } from "lucide-react";
import Image from "next/image";

export default async function VisitsPage() {
  const match = INMATES[0]; // Sal
  
  let eligibility: VirtualVisitEligibilityOutput;

  try {
    // Attempt to assess eligibility with AI
    eligibility = await assessVisitEligibility({
      userProfile: "User: Former chef, petty theft charge, quiet, focused on rehabilitation.",
      matchProfile: match.background,
      communicationHistory: "Exchanged 15 kites over 2 weeks. Discussed shared interests in cooking and future goals. No red flags found."
    });
  } catch (error) {
    console.error("AI Eligibility check failed:", error);
    // Graceful fallback if GenAI fails
    eligibility = {
      isEligible: false,
      reason: "The AI Warden is currently performing a standard security sweep. Virtual visits will be reviewed once the system is fully operational."
    };
  }

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      <header className="space-y-2">
        <h1 className="text-4xl font-headline font-bold text-foreground text-center">Visitation Hall</h1>
        <p className="text-muted-foreground text-lg text-center">Face-to-face time, wherever you are.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
        <div className="md:col-span-1 space-y-6">
          <Card className="overflow-hidden">
            <div className="relative h-64 w-full">
              <Image src={match.imageUrl} alt={match.name} fill className="object-cover" />
            </div>
            <CardHeader className="p-4">
              <CardTitle>{match.name}</CardTitle>
              <CardDescription>{match.location}</CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-muted/50">
            <CardHeader className="p-4">
              <CardTitle className="text-sm">Visit Rules</CardTitle>
            </CardHeader>
            <CardContent className="text-xs space-y-2">
              <p>• 20 minutes max duration.</p>
              <p>• Standard attire required.</p>
              <p>• No forbidden items in frame.</p>
              <p>• AI warden monitors for safety.</p>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2 space-y-6">
          <Card className={`border-2 ${eligibility.isEligible ? 'border-primary' : 'border-destructive/50'}`}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  {eligibility.isEligible ? <CheckCircle2 className="text-primary" /> : <ShieldAlert className="text-destructive" />}
                  Eligibility Status
                </CardTitle>
                <Badge variant={eligibility.isEligible ? "default" : "destructive"}>
                  {eligibility.isEligible ? "Eligible" : "Pending Trust"}
                </Badge>
              </div>
              <CardDescription className="mt-2 text-base">
                {eligibility.reason}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {eligibility.isEligible ? (
                <div className="space-y-4">
                  <div className="p-4 bg-primary/5 rounded-lg border border-primary/20 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-sm">Next Slot Available</p>
                      <p className="text-xs text-muted-foreground">Friday, Oct 12 • 2:00 PM EST</p>
                    </div>
                    <Button size="sm" className="gap-2">
                      <Calendar size={14} /> Book Slot
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="p-4 bg-muted rounded-lg border border-border flex items-center gap-4">
                    <Lock className="text-muted-foreground" size={24} />
                    <div>
                      <p className="font-bold text-sm">Visits Locked</p>
                      <p className="text-xs text-muted-foreground">Keep flying kites to build trust scores. Usually requires 20+ meaningful exchanges and a valid trust score.</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button className="w-full gap-2" variant={eligibility.isEligible ? "default" : "outline"} disabled={!eligibility.isEligible}>
                <Video size={18} /> {eligibility.isEligible ? "Start Virtual Visit" : "System Verification Required"}
              </Button>
            </CardFooter>
          </Card>

          <section className="space-y-4">
            <h3 className="text-xl font-bold">Past Visits</h3>
            <div className="space-y-3">
              {[1, 2].map(i => (
                <div key={i} className="flex items-center justify-between p-4 bg-white rounded-lg border border-border">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                      <Video size={20} className="text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Visit with {match.name}</p>
                      <p className="text-[10px] text-muted-foreground">Completed • 2 weeks ago</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">Report Issue</Button>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
