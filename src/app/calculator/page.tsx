"use client";

import { useState } from "react";
import { calculateSentence, type SentenceCalculatorOutput } from "@/ai/flows/sentence-calculator";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Gavel, Scale, Info, AlertTriangle, Loader2 } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

export default function SentenceCalculatorPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SentenceCalculatorOutput | null>(null);
  const [formData, setFormData] = useState({
    crimeDescription: "",
    jurisdiction: "",
    circumstances: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await calculateSentence(formData);
      setResult(response);
    } catch (error) {
      console.error("Calculation failed:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      <header className="space-y-2 text-center">
        <h1 className="text-4xl font-headline font-bold text-foreground">Sentencing Simulator</h1>
        <p className="text-muted-foreground text-lg">Understand potential outcomes based on historical community data.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gavel className="text-primary" /> Case Details
              </CardTitle>
              <CardDescription>Enter the specifics of the situation.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="crime">Crime Category/Description</Label>
                  <Input 
                    id="crime"
                    placeholder="e.g., Grand Theft Auto, 2nd Degree"
                    value={formData.crimeDescription}
                    onChange={(e) => setFormData({...formData, crimeDescription: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="jurisdiction">Jurisdiction (State or Federal)</Label>
                  <Input 
                    id="jurisdiction"
                    placeholder="e.g., California, Federal"
                    value={formData.jurisdiction}
                    onChange={(e) => setFormData({...formData, jurisdiction: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="circumstances">Mitigating/Aggravating Factors</Label>
                  <Textarea 
                    id="circumstances"
                    placeholder="e.g., First-time offender, no weapons involved..."
                    value={formData.circumstances}
                    onChange={(e) => setFormData({...formData, circumstances: e.target.value})}
                    className="min-h-[100px]"
                  />
                </div>
                <Button type="submit" className="w-full gap-2" disabled={loading}>
                  {loading ? <Loader2 className="animate-spin" size={18} /> : <Scale size={18} />}
                  Calculate Estimate
                </Button>
              </form>
            </CardContent>
          </Card>

          <Alert variant="destructive" className="bg-destructive/5 text-destructive border-destructive/20">
            <AlertTriangle size={18} className="mt-1" />
            <AlertTitle>Strict Disclaimer</AlertTitle>
            <AlertDescription className="text-xs">
              This tool is for educational purposes only. AI estimates are based on general patterns and do not reflect specific legal advice, court rulings, or attorney opinions. Always consult a qualified lawyer.
            </AlertDescription>
          </Alert>
        </section>

        <section className="space-y-6">
          {result ? (
            <Card className="border-primary/20 shadow-lg animate-in fade-in slide-in-from-bottom-4">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-2xl font-bold">Estimated Outcome</CardTitle>
                  <Badge className="bg-primary">{result.estimatedSentenceRange}</Badge>
                </div>
                <CardDescription>Based on provided case parameters.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 bg-muted rounded-lg space-y-2">
                  <div className="flex items-center gap-2 font-semibold text-sm">
                    <Info size={14} className="text-primary" /> Parole Eligibility
                  </div>
                  <p className="text-sm text-muted-foreground">{result.likelyParoleEligibility}</p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">Common Influencing Factors:</h4>
                  <ul className="grid grid-cols-1 gap-2">
                    {result.commonFactors.map((factor, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                        {factor}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">AI Logic:</h4>
                  <p className="text-sm text-muted-foreground italic">
                    {result.legalContext}
                  </p>
                </div>
              </CardContent>
              <CardFooter className="bg-muted/30 border-t pt-4">
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest text-center w-full">
                  Community Simulation Alpha v1.0
                </p>
              </CardFooter>
            </Card>
          ) : (
            <div className="h-full flex items-center justify-center border-2 border-dashed rounded-xl p-12 text-center text-muted-foreground">
              <div className="space-y-4">
                <Scale size={48} className="mx-auto opacity-20" />
                <p>Fill out the case details to generate an educational sentencing estimate.</p>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
