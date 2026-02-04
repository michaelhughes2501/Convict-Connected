
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Home, Briefcase, GraduationCap, Scale, ExternalLink, HeartHandshake } from "lucide-react";

const resources = [
  {
    title: "Fair Chance Job Board",
    desc: "Companies committed to hiring former offenders.",
    icon: Briefcase,
    category: "Jobs"
  },
  {
    title: "Second Chance Housing",
    desc: "Transitional living and halfway houses in your area.",
    icon: Home,
    category: "Housing"
  },
  {
    title: "Legal Re-entry Support",
    desc: "Pro-bono legal services for expungement and rights.",
    icon: Scale,
    category: "Legal"
  },
  {
    title: "Skill Up Certification",
    desc: "Free online courses for high-demand trades.",
    icon: GraduationCap,
    category: "Education"
  }
];

export default function ReleasePage() {
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-12">
      <header className="text-center space-y-4 max-w-2xl mx-auto">
        <h1 className="text-4xl font-headline font-bold text-foreground">Beyond the Fence</h1>
        <p className="text-muted-foreground text-lg">Your blueprint for a successful transition. We're here for your first day, and every day after.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {resources.map((res) => (
          <Card key={res.title} className="group hover:bg-primary/5 transition-colors cursor-pointer border-2 hover:border-primary/20">
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-white shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                <res.icon className="text-primary" size={28} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <CardTitle>{res.title}</CardTitle>
                  <Badge variant="secondary" className="text-[10px]">{res.category}</Badge>
                </div>
                <CardDescription className="mt-1">{res.desc}</CardDescription>
              </div>
            </header>
            <CardContent className="flex justify-end">
              <Button variant="ghost" className="gap-2 text-primary">
                Learn More <ExternalLink size={14} />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <section className="bg-secondary/10 rounded-2xl p-8 flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1 space-y-4">
          <Badge className="bg-secondary text-secondary-foreground">Mentorship Program</Badge>
          <h2 className="text-3xl font-bold">Find Your Yard Buddy on the Outside</h2>
          <p className="text-muted-foreground">Connect with individuals who have successfully transitioned. Get a mentor who understands your specific facility and journey.</p>
          <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground gap-2">
            <HeartHandshake size={18} /> Apply for Mentorship
          </Button>
        </div>
        <div className="w-full md:w-1/3 aspect-video bg-muted rounded-xl flex items-center justify-center text-muted-foreground italic border-2 border-dashed">
          Success Story Video Placeholder
        </div>
      </section>

      <footer className="text-center text-xs text-muted-foreground mt-8">
        All resources are vetted for inclusivity. ConvictConnect does not guarantee placement.
      </footer>
    </div>
  );
}
