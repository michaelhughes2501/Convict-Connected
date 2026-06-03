// 1. Add unique IDs to resources
const resources = [
  {
    id: "fair-chance-jobs",
    title: "Fair Chance Job Board",
    desc: "Companies committed to hiring former offenders.",
    icon: Briefcase,
    category: "Jobs",
    link: "https://example.com/jobs" // Add actual links
  },
  // ... rest of resources
];

// 2. Extract resource card to a separate component for better testability
interface ResourceCardProps {
  resource: typeof resources[0];
  onLearnMore: (id: string) => void;
}

function ResourceCard({ resource, onLearnMore }: ResourceCardProps) {
  return (
    <Card 
      as="article"
      className="group hover:bg-primary/5 transition-colors border-2 hover:border-primary/20"
      role="region"
      aria-label={resource.title}
    >
      <CardHeader className="flex flex-row items-center gap-4">
        <div className="w-14 h-14 rounded-xl bg-white shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
          <resource.icon className="text-primary" size={28} aria-hidden="true" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <CardTitle>{resource.title}</CardTitle>
            <Badge variant="secondary" className="text-[10px]">{resource.category}</Badge>
          </div>
          <CardDescription className="mt-1">{resource.desc}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex justify-end">
        <Button 
          variant="ghost" 
          className="gap-2 text-primary"
          onClick={() => onLearnMore(resource.id)}
          aria-label={`Learn more about ${resource.title}`}
        >
          Learn More <ExternalLink size={14} aria-hidden="true" />
        </Button>
      </CardContent>
    </Card>
  );
}

// 3. Update main component
export default function ReleasePage() {
  const handleLearnMore = (resourceId: string) => {
    // Handle navigation or open modal
    console.log(`Learn more about: ${resourceId}`);
  };

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-12">
      {/* ... header ... */}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {resources.map((resource) => (
          <ResourceCard 
            key={resource.id} 
            resource={resource}
            onLearnMore={handleLearnMore}
          />
        ))}
      </div>
      
      {/* ... rest of page ... */}
    </div>
  );
}
