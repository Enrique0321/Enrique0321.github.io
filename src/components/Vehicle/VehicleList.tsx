
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Vehicle } from '@/types/fleet';
import { Badge } from '@/components/ui/badge';
import { ChevronRightIcon, PlusIcon } from 'lucide-react';

interface VehicleListProps {
  vehicles: Vehicle[];
}

const getStatusBadge = (status: Vehicle['status']) => {
  switch (status) {
    case 'active':
      return <Badge className="bg-green-500">Activo</Badge>;
    case 'maintenance':
      return <Badge className="bg-yellow-500">Mantenimiento</Badge>;
    case 'inactive':
      return <Badge className="bg-gray-500">Inactivo</Badge>;
    default:
      return null;
  }
};

const VehicleList: React.FC<VehicleListProps> = ({ vehicles }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl">Vehículos</CardTitle>
        <Button asChild size="sm" className="bg-fleet-teal hover:bg-fleet-teal/90">
          <Link to="/vehicles/new">
            <PlusIcon className="h-4 w-4 mr-2" />
            Nuevo Vehículo
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4">N° Económico</th>
                <th className="text-left py-3 px-4">Placa</th>
                <th className="text-left py-3 px-4">Marca / Modelo</th>
                <th className="text-left py-3 px-4">Asignado a</th>
                <th className="text-left py-3 px-4">Proyecto</th>
                <th className="text-left py-3 px-4">Estado</th>
                <th className="text-right py-3 px-4">Acción</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map((vehicle) => (
                <tr key={vehicle.id} className="border-b hover:bg-muted/50 transition-colors">
                  <td className="py-3 px-4 font-medium">{vehicle.economicNumber}</td>
                  <td className="py-3 px-4">{vehicle.licensePlate}</td>
                  <td className="py-3 px-4">{vehicle.make} {vehicle.model} ({vehicle.year})</td>
                  <td className="py-3 px-4">{vehicle.assignedTo}</td>
                  <td className="py-3 px-4">{vehicle.project}</td>
                  <td className="py-3 px-4">{getStatusBadge(vehicle.status)}</td>
                  <td className="py-3 px-4 text-right">
                    <Button asChild variant="ghost" size="icon">
                      <Link to={`/vehicles/${vehicle.id}`}>
                        <ChevronRightIcon className="h-4 w-4" />
                      </Link>
                    </Button>
                  </td>
                </tr>
              ))}
              {vehicles.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-6 text-center text-muted-foreground">
                    No hay vehículos registrados. Haga clic en "Nuevo Vehículo" para agregar uno.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default VehicleList;
