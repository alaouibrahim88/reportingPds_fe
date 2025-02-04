interface TooltipProps {
  active?: boolean;
  payload?: any[];
}

export function ChartTooltip({ active, payload }: TooltipProps) {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-background border rounded-lg shadow-lg p-3">
        <p className="font-medium">{data.name}</p>
        <p className="text-sm  text-[hsl(var(--primary))]">
          Revenue: ${data.revenue?.toLocaleString() ?? 0}
        </p>
        <p className="text-sm text-[#8B5CF6]">
          Damage: ${Math.abs(data.damageCost).toLocaleString()}
        </p>
        {/* <p className="text-sm text-muted-foreground mt-1">
          Revenue: {`$${Math.abs(data.revenue ?? 0 / 1000)}k  `}
        </p> */}
      </div>
    );
  }
  return null;
}
