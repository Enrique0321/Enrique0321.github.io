
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FleetSummary as FleetSummaryType } from '@/types/fleet';

interface FleetSummaryProps {
  summary: FleetSummaryType;
}

const FleetSummary: React.FC<FleetSummaryProps> = ({ summary }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card className="animate-fade-in">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Vehículos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{summary.totalVehicles}</div>
          <p className="text-xs text-muted-foreground mt-1">
            <span className="text-green-500 font-medium">{summary.activeVehicles} activos</span> · {summary.inMaintenance} en mantenimiento · {summary.inactive} inactivos
          </p>
        </CardContent>
      </Card>

      <Card className="animate-fade-in [animation-delay:100ms]">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Rendimiento Promedio</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{summary.averageEfficiency.toFixed(2)} <span className="text-sm font-normal">km/lt</span></div>
          <div className="w-full h-2 bg-muted mt-2 rounded-full overflow-hidden">
            <div 
              className="h-full bg-fleet-teal rounded-full" 
              style={{ width: `${Math.min(Math.max(summary.averageEfficiency / 15 * 100, 10), 100)}%` }}
            ></div>
          </div>
        </CardContent>
      </Card>

      <Card className="animate-fade-in [animation-delay:200ms]">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Kilómetros Recorridos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{summary.totalDistance.toLocaleString()} <span className="text-sm font-normal">km</span></div>
          <p className="text-xs text-muted-foreground mt-1">
            Este mes
          </p>
        </CardContent>
      </Card>

      <Card className="animate-fade-in [animation-delay:300ms]">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Combustible Consumido</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{summary.totalFuelConsumed.toLocaleString()} <span className="text-sm font-normal">litros</span></div>
          <p className="text-xs text-muted-foreground mt-1">
            Este mes
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default FleetSummary;
