import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { cn } from "@/lib/utils";

interface Props {
  title: string;
  value: number;
  className?: string;
}

export default function StatsCard({
  title,
  value,
  className,
}: Props) {
  return (
    <Card className={cn("shadow-sm", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <p className="text-3xl font-bold tracking-tight">
          {value}
        </p>
      </CardContent>
    </Card>
  );
}