import { Scheme } from "@/data/mockData";
import { ChevronRight, Tag, ExternalLink, X, Info, CheckCircle2 } from "lucide-react";
import { useApp } from "@/contexts/AppContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface SchemeCardProps {
  scheme: Scheme;
}

const categoryColors: Record<string, string> = {
  farmer: "gradient-green",
  student: "gradient-navy",
  employment: "gradient-saffron",
  general: "bg-accent",
};

const SchemeCard = ({ scheme }: SchemeCardProps) => {
  const { language } = useApp();
  const isHi = language === "hi";

  const categoryLabels: Record<string, string> = {
    farmer: isHi ? "🌾 किसान" : "🌾 Farmer",
    student: isHi ? "📚 छात्र" : "📚 Student",
    employment: isHi ? "💼 रोजगार" : "💼 Employment",
    general: isHi ? "🏥 सामान्य" : "🏥 General",
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="bg-card rounded-xl shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden group cursor-pointer active:scale-[0.98]">
          {/* Thumbnail */}
          <div className="relative h-32 w-full overflow-hidden">
            <img
              src={scheme.image}
              alt={isHi && scheme.nameHi ? scheme.nameHi : scheme.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
            <div className={`absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold text-white ${categoryColors[scheme.category]}`}>
              {categoryLabels[scheme.category]}
            </div>
          </div>

          <div className="p-4">
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="font-semibold text-foreground text-sm leading-tight">
                {isHi && scheme.nameHi ? scheme.nameHi : scheme.name}
              </h3>
              <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5 group-hover:text-primary transition-colors" />
            </div>

            <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
              {isHi && scheme.descriptionHi ? scheme.descriptionHi : scheme.description}
            </p>

            {/* Benefit */}
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-saffron-light text-primary text-xs font-semibold mb-3">
              <Tag className="w-3 h-3" />
              {isHi && scheme.benefitHi ? scheme.benefitHi : scheme.benefit}
            </div>

            {/* Eligibility tags */}
            <div className="flex flex-wrap gap-1.5">
              {(isHi && scheme.eligibilityHi ? scheme.eligibilityHi : scheme.eligibility).slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-[10px] font-medium"
                >
                  {tag}
                </span>
              ))}
              {scheme.eligibility.length > 2 && (
                <span className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-[10px] font-medium">
                  +{scheme.eligibility.length - 2} {isHi ? "और" : "more"}
                </span>
              )}
            </div>
          </div>
        </div>
      </DialogTrigger>
      
      <DialogContent className="max-w-md w-[95%] rounded-2xl p-0 overflow-hidden border-none max-h-[90vh] overflow-y-auto scrollbar-none">
        <div className="relative h-48 w-full">
          <img
            src={scheme.image}
            alt={isHi && scheme.nameHi ? scheme.nameHi : scheme.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
            <h2 className="text-xl font-bold text-white leading-tight">
              {isHi && scheme.nameHi ? scheme.nameHi : scheme.name}
            </h2>
          </div>
          <DialogClose className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/40 transition-colors">
            <X className="w-5 h-5" />
          </DialogClose>
        </div>

        <div className="p-6 space-y-6">
          <section>
            <h3 className="text-sm font-bold text-foreground mb-2 flex items-center gap-2">
              <Info className="w-4 h-4 text-primary" />
              {isHi ? "योजना के बारे में" : "About Scheme"}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {isHi && scheme.descriptionHi ? scheme.descriptionHi : scheme.description}
            </p>
          </section>

          <section className="bg-primary/5 p-4 rounded-xl border border-primary/10">
            <h3 className="text-xs font-bold text-primary uppercase tracking-wider mb-2">
              {isHi ? "मुख्य लाभ" : "Key Benefit"}
            </h3>
            <p className="text-lg font-bold text-primary">
              {isHi && scheme.benefitHi ? scheme.benefitHi : scheme.benefit}
            </p>
          </section>

          <section>
            <h3 className="text-sm font-bold text-foreground mb-3">
              {isHi ? "आवेदन कैसे करें?" : "How to Apply?"}
            </h3>
            <div className="space-y-3">
              {(isHi && scheme.howToApplyHi ? scheme.howToApplyHi : scheme.howToApply).map((step, idx) => (
                <div key={idx} className="flex gap-3">
                  <div className="w-5 h-5 rounded-full bg-secondary/20 text-secondary text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <p className="text-sm text-muted-foreground">{step}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="flex gap-3 pt-2">
            <Button 
              className="flex-1 rounded-xl h-12 font-bold text-sm"
              onClick={() => window.open(scheme.applicationUrl, "_blank")}
            >
              {isHi ? "अभी आवेदन करें" : "Apply Now"}
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
            <DialogClose asChild>
              <Button variant="outline" className="flex-1 rounded-xl h-12 font-bold text-sm border-border">
                {isHi ? "बंद करें" : "Close"}
              </Button>
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

};

export default SchemeCard;
