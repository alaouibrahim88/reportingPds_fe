import React from "react";
import { Cog, Truck, DollarSign, ShieldCheck, Settings, Users, Target, Lightbulb, Leaf, Shield, Wrench } from "lucide-react";

interface IconComponentProps {
  iconName: string;
  className?: string;
}

export function IconComponent({ iconName, className = "h-6 w-6" }: IconComponentProps) {
  switch (iconName) {
    case "Cog":
      return <Cog className={className} />;
    case "Truck":
      return <Truck className={className} />;
    case "DollarSign":
      return <DollarSign className={className} />;
    case "ShieldCheck":
      return <ShieldCheck className={className} />;
    case "Settings":
      return <Settings className={className} />;
    case "Users":
      return <Users className={className} />;
    case "Target":
      return <Target className={className} />;
    case "Lightbulb":
      return <Lightbulb className={className} />;
    case "Leaf":
      return <Leaf className={className} />;
    case "Shield":
      return <Shield className={className} />;
    case "Wrench":
      return <Wrench className={className} />;
    default:
      return <Cog className={className} />;
  }
}

// Backward compatibility function
export function getIconComponent(iconName: string) {
  return <IconComponent iconName={iconName} />;
}
