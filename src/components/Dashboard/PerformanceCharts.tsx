
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FuelEfficiency, Vehicle } from '@/types/fleet';
import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface PerformanceChartsProps {
  vehicles: Vehicle[];
  efficiencyData: FuelEfficiency[];
}

// Transform data for charts
const prepareChartData = (
  vehicles: Vehicle[], 
  efficiencyData: FuelEfficiency[]
) => {
  const lastSevenDays = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return date.toISOString().split('T')[0];
  }).reverse();

  // Create a map for quick lookup
  const vehicleMap = vehicles.reduce((acc, vehicle) => {
    acc[vehicle.id] = vehicle;
    return acc;
  }, {} as Record<string, Vehicle>);

  // Process efficiency data
  const processedData = lastSevenDays.map(date => {
    const dayData: any = { date: new Date(date).toLocaleDateString('es-MX', { weekday: 'short', day: 'numeric' }) };
    
    // Add vehicle data
    vehicles.forEach(vehicle => {
      const vehicleEfficiency = efficiencyData.find(e => 
        e.vehicleId === vehicle.id && e.date === date
      );
      
      dayData[vehicle.economicNumber] = vehicleEfficiency?.efficiency || 0;
    });
    
    return dayData;
  });

  return processedData;
};

const PerformanceCharts: React.FC<PerformanceChartsProps> = ({ vehicles, efficiencyData }) => {
  const chartData = prepareChartData(vehicles, efficiencyData);
  
  // Create colors for vehicles
  const vehicleColors = vehicles.map((_, index) => {
    const colors = ['#2563EB', '#0D9488', '#9333EA', '#F59E0B', '#10B981', '#EC4899', '#6366F1'];
    return colors[index % colors.length];
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <Card className="animate-fade-in">
        <CardHeader>
          <CardTitle>Rendimiento de Combustible</CardTitle>
          <CardDescription>Eficiencia km/lt por vehículo</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="chart" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="chart">Gráfico</TabsTrigger>
              <TabsTrigger value="table">Tabla</TabsTrigger>
            </TabsList>
            <TabsContent value="chart" className="w-full">
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis label={{ value: 'km/lt', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Legend />
                    {vehicles.slice(0, 5).map((vehicle, index) => (
                      <Line 
                        key={vehicle.id}
                        type="monotone"
                        dataKey={vehicle.economicNumber}
                        stroke={vehicleColors[index]}
                        activeDot={{ r: 6 }}
                      />
                    ))}
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
            <TabsContent value="table">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Fecha</th>
                      {vehicles.slice(0, 5).map(vehicle => (
                        <th key={vehicle.id} className="text-left py-2">{vehicle.economicNumber}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {chartData.map((data, idx) => (
                      <tr key={idx} className="border-b">
                        <td className="py-2">{data.date}</td>
                        {vehicles.slice(0, 5).map(vehicle => (
                          <td key={vehicle.id} className="py-2">
                            {data[vehicle.economicNumber]?.toFixed(2) || '-'}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card className="animate-fade-in [animation-delay:100ms]">
        <CardHeader>
          <CardTitle>Kilómetros Recorridos</CardTitle>
          <CardDescription>Total de km por día</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis label={{ value: 'kilómetros', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="total" fill="#2563EB" name="Kilómetros totales" />
                {vehicles.slice(0, 3).map((vehicle, index) => (
                  <Line 
                    key={vehicle.id}
                    type="monotone"
                    dataKey={vehicle.economicNumber}
                    stroke={vehicleColors[index]}
                    activeDot={{ r: 6 }}
                  />
                ))}
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PerformanceCharts;
