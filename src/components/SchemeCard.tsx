import { Scheme } from "@/data/mockData";
import { ChevronRight, Tag } from "lucide-react";

interface SchemeCardProps {
  scheme: Scheme;
}

const categoryColors: Record<string, string> = {
  farmer: "gradient-green",
  student: "gradient-navy",
  employment: "gradient-saffron",
  general: "bg-accent",
};

const categoryLabels: Record<string, string> = {
  farmer: "🌾 Farmer",
  student: "📚 Student",
  employment: "💼 Employment",
  general: "🏥 General",
};

const SchemeCard = ({ scheme }: SchemeCardProps) => {
  return (
    <div className="bg-card rounded-xl shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden group cursor-pointer active:scale-[0.98]">
      {/* Category stripe */}
      <div className={`h-1 ${categoryColors[scheme.category]}`} />

      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-semibold text-foreground text-sm leading-tight">
            {scheme.name}
          </h3>
          <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5 group-hover:text-primary transition-colors" />
        </div>

        <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
          {scheme.description}
        </p>

        {/* Benefit */}
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-saffron-light text-primary text-xs font-semibold mb-3">
          <Tag className="w-3 h-3" />
          {scheme.benefit}
        </div>

        {/* Eligibility tags */}
        <div className="flex flex-wrap gap-1.5">
          {scheme.eligibility.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-[10px] font-medium"
            >
              {tag}
            </span>
          ))}
          {scheme.eligibility.length > 2 && (
            <span className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-[10px] font-medium">
              +{scheme.eligibility.length - 2} more
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default SchemeCard;
