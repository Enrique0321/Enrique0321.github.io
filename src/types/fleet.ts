
export interface Vehicle {
  id: string;
  economicNumber: string;
  licensePlate: string;
  make: string;
  model: string;
  year: number;
  fuelType: string;
  tankCapacity: number;
  assignedTo: string;
  project: string;
  team: string;
  status: 'active' | 'maintenance' | 'inactive';
}

export interface DailyEntry {
  id: string;
  date: string;
  vehicleId: string;
  initialMileage: number;
  finalMileage: number;
  fuelConsumed: number;
  operator: string;
  project: string;
  team: string;
  locations: GpsLocation[];
}

export interface GpsLocation {
  latitude: number;
  longitude: number;
  timestamp: string;
  description?: string;
}

export interface FuelEfficiency {
  vehicleId: string;
  date: string;
  efficiency: number; // km/lt
}

export interface TeamInfo {
  id: string;
  name: string;
  leader: string;
  assistant: string;
}

export interface ProjectInfo {
  id: string;
  name: string;
  location: string;
  active: boolean;
}

export interface FleetSummary {
  totalVehicles: number;
  activeVehicles: number;
  inMaintenance: number;
  inactive: number;
  averageEfficiency: number;
  totalDistance: number;
  totalFuelConsumed: number;
}
