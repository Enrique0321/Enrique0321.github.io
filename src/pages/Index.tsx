
import React from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import DashboardHeader from '@/components/Dashboard/DashboardHeader';
import FleetSummary from '@/components/Dashboard/FleetSummary';
import PerformanceCharts from '@/components/Dashboard/PerformanceCharts';
import VehicleList from '@/components/Vehicle/VehicleList';
import { FleetSummary as FleetSummaryType, Vehicle, FuelEfficiency } from '@/types/fleet';

// Mock data
const mockSummary: FleetSummaryType = {
  totalVehicles: 24,
  activeVehicles: 18,
  inMaintenance: 4,
  inactive: 2,
  averageEfficiency: 8.7,
  totalDistance: 34257,
  totalFuelConsumed: 3942
};

const mockVehicles: Vehicle[] = [
  {
    id: "v1",
    economicNumber: "VH-001",
    licensePlate: "ABC-1234",
    make: "Toyota",
    model: "Hilux",
    year: 2020,
    fuelType: "diesel",
    tankCapacity: 80,
    assignedTo: "Juan Pérez",
    project: "Construcción Norte",
    team: "Equipo A",
    status: "active"
  },
  {
    id: "v2",
    economicNumber: "VH-002",
    licensePlate: "XYZ-5678",
    make: "Nissan",
    model: "NP300",
    year: 2021,
    fuelType: "gasoline",
    tankCapacity: 75,
    assignedTo: "Ana Gómez",
    project: "Mantenimiento Sur",
    team: "Equipo B",
    status: "active"
  },
  {
    id: "v3",
    economicNumber: "VH-003",
    licensePlate: "DEF-9012",
    make: "Ford",
    model: "Ranger",
    year: 2019,
    fuelType: "diesel",
    tankCapacity: 85,
    assignedTo: "Carlos López",
    project: "Exploración Este",
    team: "Equipo C",
    status: "maintenance"
  },
  {
    id: "v4",
    economicNumber: "VH-004",
    licensePlate: "GHI-3456",
    make: "Chevrolet",
    model: "Silverado",
    year: 2022,
    fuelType: "gasoline",
    tankCapacity: 95,
    assignedTo: "Roberto Sánchez",
    project: "Transporte Oeste",
    team: "Equipo D",
    status: "active"
  },
  {
    id: "v5",
    economicNumber: "VH-005",
    licensePlate: "JKL-7890",
    make: "Mitsubishi",
    model: "L200",
    year: 2020,
    fuelType: "diesel",
    tankCapacity: 75,
    assignedTo: "María Rodríguez",
    project: "Construcción Norte",
    team: "Equipo A",
    status: "inactive"
  }
];

// Generate mock efficiency data
const generateEfficiencyData = (): FuelEfficiency[] => {
  const data: FuelEfficiency[] = [];
  const lastSevenDays = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return date.toISOString().split('T')[0];
  }).reverse();

  mockVehicles.forEach(vehicle => {
    lastSevenDays.forEach(date => {
      // Generate a random efficiency between 6 and 12 km/lt
      const baseEfficiency = vehicle.fuelType === 'diesel' ? 9 : 7;
      const randomVariation = Math.random() * 4 - 2; // Random value between -2 and 2
      
      data.push({
        vehicleId: vehicle.id,
        date,
        efficiency: baseEfficiency + randomVariation
      });
    });
  });

  return data;
};

const mockEfficiencyData = generateEfficiencyData();

const Index: React.FC = () => {
  return (
    <MainLayout>
      <div className="dashboard-container">
        <DashboardHeader />
        <FleetSummary summary={mockSummary} />
        <PerformanceCharts 
          vehicles={mockVehicles}
          efficiencyData={mockEfficiencyData}
        />
        <VehicleList vehicles={mockVehicles} />
      </div>
    </MainLayout>
  );
};

export default Index;
