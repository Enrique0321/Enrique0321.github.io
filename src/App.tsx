
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Mock data providers will be replaced with real data sources later
import { Vehicle, DailyEntry, FleetSummary as FleetSummaryType, FuelEfficiency } from "@/types/fleet";

// Mock data
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

// Demo routes to be replaced with proper pages
const VehiclesPage = () => <div className="p-8"><h1 className="text-2xl font-bold mb-4">Listado de Vehículos</h1><p>Esta página mostrará el listado completo de vehículos con opciones de filtrado y búsqueda.</p></div>;
const DailyEntryPage = () => <div className="p-8"><h1 className="text-2xl font-bold mb-4">Registro Diario</h1><p>Aquí se implementará el formulario de registro diario con todos los campos requeridos.</p></div>;
const ReportsPage = () => <div className="p-8"><h1 className="text-2xl font-bold mb-4">Reportes</h1><p>Esta sección permitirá generar reportes y exportar datos a Excel.</p></div>;
const ProjectsPage = () => <div className="p-8"><h1 className="text-2xl font-bold mb-4">Proyectos</h1><p>Administración de proyectos y asignación de vehículos.</p></div>;
const TeamsPage = () => <div className="p-8"><h1 className="text-2xl font-bold mb-4">Cuadrillas</h1><p>Gestión de cuadrillas y personal asignado.</p></div>;

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/vehicles" element={<VehiclesPage />} />
          <Route path="/daily-entry" element={<DailyEntryPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/teams" element={<TeamsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
