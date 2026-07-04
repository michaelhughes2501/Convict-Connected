import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Briefcase,
  ExternalLink,
  Home,
  HeartPulse,
  GraduationCap,
  Scale,
  Wallet,
  UtensilsCrossed,
} from "lucide-react";

const resources = [
  {
    id: "fair-chance-jobs",
    title: "Fair Chance Job Board",
    desc: "Companies committed to hiring returning citizens.",
    icon: Briefcase,
    category: "Jobs",
    link: "https://example.com/jobs",
  },
  {
    id: "reentry-housing",
    title: "Reentry Housing Directory",
    desc: "Transitional and long-term housing programs.",
    icon: Home,
    category: "Housing",
    link: "https://example.com/housing",
  },
  {
    id: "mental-health",
    title: "Mental Health & Counseling",
    desc: "Free and sliding-scale therapy and peer support.",
    icon: HeartPulse,
    category: "Health",
    link: "https://example.com/mental-health",
  },
  {
    id: "education",
    title: "Education & Vocational Training",
    desc: "GED, certification, and college programs.",
    icon: GraduationCap,
    category: "Education",
    link: "https://example.com/education",
  },
  {
    id: "legal-aid",
    title: "Legal Aid & Expungement",
    desc: "Record clearing and reentry legal help.",
    icon: Scale,
    category: "Legal",
    link: "https://example.com/legal",
  },
  {
    id: "financial-services",
    title: "Financial Services",
    desc: "Bank accounts and credit building for returning citizens.",
    icon: Wallet,
    category: "Finance",
    link: "https://example.com/finance",
  },
  {
    id: "food-security",
    title: "Food & Basic Needs",
    desc: "SNAP, food banks, and clothing assistance.",
    icon: UtensilsCrossed,
    category: "Basics",
    link: "https://example.com/food",
  },
];

interface ResourceCardProps {
  resource: typeof resources[0];
}

function ResourceCard({ resource }: ResourceCardProps) {
  const Icon = resource.icon;
  return (
    <Card
      className="group hover:bg-primary/5 transition-colors border-2 hover:border-primary/20"
      role="region"
      aria-label={resource.title}
    >
      <CardHeader className="flex flex-row items-center gap-4">
        <div className="w-14 h-14 rounded-xl bg-white shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
          <Icon className="text-primary" size={28} aria-hidden="true" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <CardTitle>{resource.title}</CardTitle>
            <Badge variant="secondary" className="text-[10px]">
              {resource.category}
            </Badge>
          </div>
          <CardDescription className="mt-1">{resource.desc}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex justify-end">
        <Button asChild variant="ghost" className="gap-2 text-primary">
          <a
            href={resource.link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Learn more about ${resource.title}`}
          >
            Learn More <ExternalLink size={14} aria-hidden="true" />
          </a>
        </Button>
      </CardContent>
    </Card>
  );
}

export default function ReleasePage() {
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-12">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">Release Planning</h1>
        <p className="text-muted-foreground">
          Resources to help you plan for release and successful reentry.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {resources.map((resource) => (
          <ResourceCard key={resource.id} resource={resource} />
        ))}
      </div>
    </div>
  );
}
