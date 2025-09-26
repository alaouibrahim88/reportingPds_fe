"use client";

import React, { useEffect, useState } from "react";

interface ChartDataPoint {
  value: number;
  label?: string;
  color?: string;
}

interface ChartComponentProps {
  data: ChartDataPoint[];
  title?: string;
  subtitle?: string;
  height?: number;
  showGrid?: boolean;
  showArea?: boolean;
  showDots?: boolean;
  showValues?: boolean;
  color?: string;
  className?: string;
  yAxisLabel?: string;
  xAxisLabels?: string[];
  minValue?: number;
  maxValue?: number;
  formatValue?: (value: number) => string;
  animated?: boolean;
  animationDuration?: number;
  showZeroLine?: boolean;
  mixedValues?: boolean;
}

export function ChartComponent({
  data,
  title,
  subtitle,
  height = 80,
  showValues = true,
  color = "#3B82F6",
  className = "",
  minValue,
  maxValue,
  formatValue = (value) => value.toString(),
  animated = true,
  animationDuration = 1000,
  showZeroLine = false,
  mixedValues = false
}: ChartComponentProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [animationProgress, setAnimationProgress] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    if (animated) {
      const timer = setTimeout(() => {
        setAnimationProgress(1);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setAnimationProgress(1);
    }
  }, [animated]);
  // Calculate chart dimensions and scaling
  const chartWidth = 200;
  const chartHeight = height;
  const padding = 20;
  const plotWidth = chartWidth - (padding * 2);
  const plotHeight = chartHeight - (padding * 2);

  // Determine value range with enhanced logic for mixed values
  const values = data.map(point => point.value);
  const dataMin = Math.min(...values);
  const dataMax = Math.max(...values);
  const hasNegativeValues = dataMin < 0;
  const hasPositiveValues = dataMax > 0;
  
  // Enhanced padding for mixed values
  const rangePadding = Math.max((dataMax - dataMin) * 0.1, Math.abs(dataMax) * 0.05, Math.abs(dataMin) * 0.05);
  
  let chartMin, chartMax;
  if (minValue !== undefined && maxValue !== undefined) {
    chartMin = minValue;
    chartMax = maxValue;
  } else if (mixedValues || (hasNegativeValues && hasPositiveValues)) {
    // For mixed values, ensure zero is visible and add symmetric padding
    const maxAbs = Math.max(Math.abs(dataMin), Math.abs(dataMax));
    chartMin = -maxAbs - rangePadding;
    chartMax = maxAbs + rangePadding;
  } else {
    chartMin = minValue !== undefined ? minValue : Math.min(0, dataMin - rangePadding);
    chartMax = maxValue !== undefined ? maxValue : dataMax + rangePadding;
  }
  
  const valueRange = chartMax - chartMin;

  // Scale function to convert values to chart coordinates
  const scaleY = (value: number) => {
    return plotHeight - ((value - chartMin) / valueRange) * plotHeight;
  };

  // Generate path for the line with animation support
  const generatePath = () => {
    if (data.length === 0) return "";
    
    const points = data.map((point, index) => {
      const x = padding + (index / (data.length - 1)) * plotWidth;
      const y = padding + scaleY(point.value);
      return `${x},${y}`;
    });
    
    return `M ${points.join(" L ")}`;
  };

  // Generate animated path for line drawing effect
  const generateAnimatedPath = () => {
    if (data.length === 0) return "";
    
    const totalLength = data.length;
    const animatedLength = Math.ceil(totalLength * animationProgress);
    
    const points = data.slice(0, animatedLength).map((point, index) => {
      const x = padding + (index / (data.length - 1)) * plotWidth;
      const y = padding + scaleY(point.value);
      return `${x},${y}`;
    });
    
    return `M ${points.join(" L ")}`;
  };

  // Get color for each point based on value (for mixed positive/negative)
  const getPointColor = (value: number) => {
    if (mixedValues) {
      if (value > 0) return "#10B981"; // Green for positive
      if (value < 0) return "#EF4444"; // Red for negative
      return "#6B7280"; // Gray for zero
    }
    return color;
  };

  return (
    <div className={`relative ${className}`}>
        {/* Chart Container */}
        <div 
          className="relative rounded-xl overflow-hidden"
          style={{ 
            height: `${chartHeight + 40}px`
          }}
        >
        {/* Header */}
        {(title || subtitle) && (
          <div className="absolute top-2 left-3 right-3 z-10">
            {title && (
              <h4 className="text-xs font-semibold text-white truncate">{title}</h4>
            )}
            {subtitle && (
              <p className="text-xs text-slate-400 truncate">{subtitle}</p>
            )}
          </div>
        )}

        {/* SVG Chart */}
        <div className="absolute inset-0 p-3">
          <svg 
            className="w-full h-full" 
            viewBox={`0 0 ${chartWidth} ${chartHeight}`}
            preserveAspectRatio="none"
          >
            <defs>
              {/* Glow filter for animated lines */}
              <filter id="lineGlow">
                <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {/* Zero line for mixed values - removed as per design */}

            {/* Chart line with animation */}
            <path
              d={animated ? generateAnimatedPath() : generatePath()}
              stroke={mixedValues ? "#3B82F6" : color}
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                transition: animated ? `stroke-dasharray ${animationDuration}ms ease-in-out` : undefined,
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
                transitionProperty: 'opacity, transform',
                transitionDuration: `${animationDuration}ms`,
                transitionTimingFunction: 'ease-out'
              }}
            />

            {/* Data points with diamond markers */}
            {data.map((point, index) => {
              const x = padding + (index / (data.length - 1)) * plotWidth;
              const y = padding + scaleY(point.value);
              const pointColor = getPointColor(point.value);
              const isVisible = animated ? index <= Math.ceil(data.length * animationProgress) - 1 : true;
              
              return (
                <g key={`point-${index}`}>
                  {/* Diamond marker */}
                  <polygon
                    points={`${x},${y-4} ${x+4},${y} ${x},${y+4} ${x-4},${y}`}
                    fill={pointColor}
                    stroke={pointColor}
                    strokeWidth="1"
                    opacity={isVisible ? 1 : 0}
                    style={{
                      transition: `opacity ${animationDuration}ms ease-in-out`,
                      transitionDelay: `${index * 100}ms`
                    }}
                  />
                </g>
              );
            })}

            {/* Value labels with animation */}
            {showValues && data.map((point, index) => {
              const x = padding + (index / (data.length - 1)) * plotWidth;
              const y = padding + scaleY(point.value);
              const isNegative = point.value < 0;
              const pointColor = getPointColor(point.value);
              const isVisible = animated ? index <= Math.ceil(data.length * animationProgress) - 1 : true;
              
              return (
                <text
                  key={`value-${index}`}
                  x={x}
                  y={isNegative ? y + 15 : y - 8}
                  fill={pointColor}
                  fontSize="8"
                  textAnchor="middle"
                  fontWeight="500"
                  opacity={isVisible ? 1 : 0}
                  style={{
                    transition: `opacity ${animationDuration}ms ease-in-out`,
                    transitionDelay: `${index * 100}ms`
                  }}
                >
                  {formatValue(point.value)}
                </text>
              );
            })}
            
          </svg>
        </div>

      </div>
    </div>
  );
}

// Predefined chart configurations for common use cases
export const ChartConfigs = {
  // Positive trend (green)
  positive: {
    color: "#10B981",
    showArea: true,
    showDots: true,
    showValues: true,
    animated: true,
    animationDuration: 1000,
  },
  
  // Negative trend (red)
  negative: {
    color: "#EF4444",
    showArea: true,
    showDots: true,
    showValues: true,
    animated: true,
    animationDuration: 1000,
  },

  // Mixed positive/negative values
  mixed: {
    color: "#3B82F6",
    showArea: true,
    showDots: true,
    showValues: true,
    animated: true,
    animationDuration: 1200,
    mixedValues: true,
    showZeroLine: true,
  },

  // Performance variance (blue with mixed values)
  variance: {
    color: "#3B82F6",
    showArea: false,
    showDots: true,
    showValues: true,
    animated: true,
    animationDuration: 1000,
    mixedValues: true,
    showZeroLine: true,
  },

  // Volatile performance (orange/yellow)
  volatile: {
    color: "#F59E0B",
    showArea: false,
    showDots: true,
    showValues: true,
    animated: true,
    animationDuration: 800,
  },

  // Efficiency metrics (green)
  efficiency: {
    color: "#10B981",
    showArea: true,
    showDots: true,
    showValues: true,
    animated: true,
    animationDuration: 1000,
  },

  // Cost metrics (red)
  cost: {
    color: "#EF4444",
    showArea: true,
    showDots: true,
    showValues: true,
    animated: true,
    animationDuration: 1000,
  },
};
