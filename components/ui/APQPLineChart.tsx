"use client";

import React from "react";

interface APQPDataPoint {
  phase: string;
  actual: number;
  forecast: number;
}

interface APQPLineChartProps {
  data: APQPDataPoint[];
  title?: string;
  subtitle?: string;
  height?: number;
  className?: string;
}

export function APQPLineChart({
  data,
  title = "Planning Progress (APQP)",
  subtitle = "Milestones achieved vs. forecast.",
  height = 220,
  className = ""
}: APQPLineChartProps) {
  // Responsive chart dimensions - better proportions
  const chartWidth = 380;
  const chartHeight = height;
  const padding = { top: 40, right: 25, bottom: 40, left: 50 };
  const plotWidth = chartWidth - padding.left - padding.right;
  const plotHeight = chartHeight - padding.top - padding.bottom;

  // Calculate Y-axis scale (0% to 100%)
  const minValue = 0;
  const maxValue = 100;
  const valueRange = maxValue - minValue;

  // Scale function to convert percentage to Y coordinate
  const scaleY = (value: number) => {
    return padding.top + plotHeight - ((value - minValue) / valueRange) * plotHeight;
  };

  // Scale function to convert phase index to X coordinate
  const scaleX = (index: number) => {
    return padding.left + (index / (data.length - 1)) * plotWidth;
  };

  // Generate path for actual progress line
  const generateActualPath = () => {
    if (data.length === 0) return "";
    
    const points = data.map((point, index) => {
      const x = scaleX(index);
      const y = scaleY(point.actual);
      return `${x},${y}`;
    });
    
    return `M ${points.join(" L ")}`;
  };

  // Generate path for forecast line
  const generateForecastPath = () => {
    if (data.length === 0) return "";
    
    const points = data.map((point, index) => {
      const x = scaleX(index);
      const y = scaleY(point.forecast);
      return `${x},${y}`;
    });
    
    return `M ${points.join(" L ")}`;
  };

  // Generate Y-axis grid lines and labels
  const generateYAxisGrid = () => {
    const gridLines = [];
    const labels = [];
    
    for (let i = 0; i <= 10; i++) {
      const value = i * 10; // 0%, 10%, 20%, ..., 100%
      const y = scaleY(value);
      
      // Grid line - enhanced styling
      gridLines.push(
        <line
          key={`grid-${i}`}
          x1={padding.left}
          y1={y}
          x2={padding.left + plotWidth}
          y2={y}
          stroke="#4B5563"
          strokeWidth="0.5"
          opacity="0.4"
        />
      );
      
      // Y-axis label - improved typography
      labels.push(
        <text
          key={`label-${i}`}
          x={padding.left - 15}
          y={y + 5}
          fill="#D1D5DB"
          fontSize="11"
          textAnchor="end"
          fontWeight="600"
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          {value}%
        </text>
      );
    }
    
    return { gridLines, labels };
  };

  // Generate X-axis labels
  const generateXAxisLabels = () => {
    return data.map((point, index) => {
      const x = scaleX(index);
      return (
        <text
          key={`x-label-${index}`}
          x={x}
          y={chartHeight - 15}
          fill="#D1D5DB"
          fontSize="11"
          textAnchor="middle"
          fontWeight="600"
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          {point.phase}
        </text>
      );
    });
  };

  const { gridLines, labels } = generateYAxisGrid();

  return (
    <div className={`relative w-full ${className}`}>
      {/* Chart Container - Fixed Width */}
      <div 
        className="relative bg-slate-800/95 rounded-xl p-4 lg:p-6 border border-slate-700/60 shadow-2xl backdrop-blur-sm w-full max-w-full"
        style={{ 
          height: `${chartHeight + 60}px`,
          minWidth: '350px',
          maxWidth: '100%'
        }}
      >
        {/* Header */}
        <div className="mb-4 lg:mb-6">
          <h4 className="text-base lg:text-lg font-bold text-white tracking-tight font-sans">{title}</h4>
          <p className="text-xs lg:text-sm text-slate-400 mt-1 lg:mt-2 font-medium">{subtitle}</p>
        </div>

        {/* Legend */}
        <div className="flex justify-center gap-6 lg:gap-8 mb-4 lg:mb-6">
          <div className="flex items-center gap-2 lg:gap-3">
            <div className="w-4 lg:w-5 h-1.5 bg-blue-500 rounded-sm shadow-sm"></div>
            <span className="text-xs lg:text-sm text-slate-300 font-semibold">Actual Progress</span>
          </div>
          <div className="flex items-center gap-2 lg:gap-3">
            <div className="w-4 lg:w-5 h-1.5 bg-gray-500 rounded-sm shadow-sm" style={{ 
              backgroundImage: 'repeating-linear-gradient(to right, #6B7280 0px, #6B7280 4px, transparent 4px, transparent 8px)' 
            }}></div>
            <span className="text-xs lg:text-sm text-slate-300 font-semibold">Forecast</span>
          </div>
        </div>

        {/* SVG Chart - Responsive Container */}
        <div className="relative w-full overflow-hidden">
          <svg 
            className="w-full h-full" 
            viewBox={`0 0 ${chartWidth} ${chartHeight}`}
            preserveAspectRatio="xMidYMid meet"
            style={{ maxWidth: '100%', height: 'auto' }}
          >
            <defs>
              {/* Simple glow effects */}
              <filter id="actualGlow">
                <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              
              <filter id="forecastGlow">
                <feGaussianBlur stdDeviation="0.5" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {/* Y-axis grid lines */}
            {gridLines}

            {/* Y-axis labels */}
            {labels}

            {/* X-axis labels */}
            {generateXAxisLabels()}

            {/* Y-axis line - enhanced */}
            <line
              x1={padding.left}
              y1={padding.top}
              x2={padding.left}
              y2={padding.top + plotHeight}
              stroke="#6B7280"
              strokeWidth="2"
              opacity="0.8"
            />

            {/* X-axis line - enhanced */}
            <line
              x1={padding.left}
              y1={padding.top + plotHeight}
              x2={padding.left + plotWidth}
              y2={padding.top + plotHeight}
              stroke="#6B7280"
              strokeWidth="2"
              opacity="0.8"
            />

            {/* Forecast line (dotted) - enhanced */}
            <path
              d={generateForecastPath()}
              stroke="#9CA3AF"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="6,4"
              filter="url(#forecastGlow)"
            />

            {/* Actual progress line (solid) - enhanced */}
            <path
              d={generateActualPath()}
              stroke="#3B82F6"
              strokeWidth="3.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#actualGlow)"
            />

            {/* Forecast data points (squares) - enhanced */}
            {data.map((point, index) => {
              const x = scaleX(index);
              const y = scaleY(point.forecast);
              
              return (
                <rect
                  key={`forecast-point-${index}`}
                  x={x - 4}
                  y={y - 4}
                  width="8"
                  height="8"
                  fill="#9CA3AF"
                  stroke="#6B7280"
                  strokeWidth="1.5"
                  filter="url(#forecastGlow)"
                  rx="1"
                />
              );
            })}

            {/* Actual data points (circles) - enhanced */}
            {data.map((point, index) => {
              const x = scaleX(index);
              const y = scaleY(point.actual);
              
              return (
                <circle
                  key={`actual-point-${index}`}
                  cx={x}
                  cy={y}
                  r="5"
                  fill="#3B82F6"
                  stroke="#1E40AF"
                  strokeWidth="2"
                  filter="url(#actualGlow)"
                />
              );
            })}
          </svg>
        </div>
      </div>
    </div>
  );
}
