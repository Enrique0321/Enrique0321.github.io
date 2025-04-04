
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DailyEntry, Vehicle } from '@/types/fleet';
import { CalendarIcon } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface DailyEntryFormProps {
  vehicles: Vehicle[];
  initialData?: Partial<DailyEntry>;
  onSubmit: (data: Partial<DailyEntry>) => void;
  onCancel: () => void;
}

const DailyEntryForm: React.FC<DailyEntryFormProps> = ({ 
  vehicles, 
  initialData = {}, 
  onSubmit, 
  onCancel 
}) => {
  const today = new Date().toISOString().split('T')[0];
  
  const [formData, setFormData] = useState<Partial<DailyEntry>>({
    date: today,
    vehicleId: '',
    initialMileage: 0,
    finalMileage: 0,
    fuelConsumed: 0,
    operator: '',
    project: '',
    team: '',
    locations: [],
    ...initialData
  });

  const [calculating, setCalculating] = useState({
    distance: formData.finalMileage && formData.initialMileage 
      ? formData.finalMileage - formData.initialMileage : 0,
    efficiency: formData.finalMileage && formData.initialMileage && formData.fuelConsumed
      ? (formData.finalMileage - formData.initialMileage) / formData.fuelConsumed : 0
  });

  const handleChange = (field: keyof DailyEntry, value: any) => {
    setFormData(prev => {
      const newData = { ...prev, [field]: value };
      
      // Auto-calculate when mileage or fuel changes
      if (field === 'initialMileage' || field === 'finalMileage' || field === 'fuelConsumed') {
        const initial = field === 'initialMileage' ? value : (newData.initialMileage || 0);
        const final = field === 'finalMileage' ? value : (newData.finalMileage || 0);
        const fuel = field === 'fuelConsumed' ? value : (newData.fuelConsumed || 0);
        
        const distance = final - initial;
        
        setCalculating({
          distance,
          efficiency: fuel > 0 ? distance / fuel : 0
        });
      }
      
      // If vehicle changes, auto-populate project and team if available
      if (field === 'vehicleId') {
        const selectedVehicle = vehicles.find(v => v.id === value);
        if (selectedVehicle) {
          newData.project = selectedVehicle.project;
          newData.team = selectedVehicle.team;
        }
      }
      
      return newData;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const selectedVehicle = vehicles.find(v => v.id === formData.vehicleId);

  return (
    <Card className="animate-fade-in max-w-2xl mx-auto">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>{initialData.id ? 'Editar Registro' : 'Nuevo Registro Diario'}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Fecha</Label>
              <div className="relative">
                <Input 
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleChange('date', e.target.value)}
                  required
                />
                <CalendarIcon className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="vehicleId">Vehículo</Label>
              <Select 
                value={formData.vehicleId}
                onValueChange={(value) => handleChange('vehicleId', value)}
              >
                <SelectTrigger id="vehicleId">
                  <SelectValue placeholder="Seleccione un vehículo" />
                </SelectTrigger>
                <SelectContent>
                  {vehicles.map(vehicle => (
                    <SelectItem key={vehicle.id} value={vehicle.id}>
                      {vehicle.economicNumber} - {vehicle.make} {vehicle.model}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="initialMileage">Kilometraje Inicial</Label>
              <Input 
                id="initialMileage"
                type="number"
                value={formData.initialMileage}
                onChange={(e) => handleChange('initialMileage', parseFloat(e.target.value))}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="finalMileage">Kilometraje Final</Label>
              <Input 
                id="finalMileage"
                type="number"
                value={formData.finalMileage}
                onChange={(e) => handleChange('finalMileage', parseFloat(e.target.value))}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="fuelConsumed">Combustible (litros)</Label>
              <Input 
                id="fuelConsumed"
                type="number"
                value={formData.fuelConsumed}
                onChange={(e) => handleChange('fuelConsumed', parseFloat(e.target.value))}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted p-4 rounded-lg">
            <div>
              <Label className="text-sm text-muted-foreground">Distancia Recorrida</Label>
              <p className="text-xl font-semibold">{calculating.distance.toFixed(1)} km</p>
            </div>
            <div>
              <Label className="text-sm text-muted-foreground">Rendimiento</Label>
              <p className="text-xl font-semibold">{calculating.efficiency.toFixed(2)} km/lt</p>
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="operator">Operador</Label>
              <Input 
                id="operator"
                value={formData.operator}
                onChange={(e) => handleChange('operator', e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="project">Proyecto</Label>
              <Input 
                id="project"
                value={formData.project}
                onChange={(e) => handleChange('project', e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="team">Cuadrilla</Label>
              <Input 
                id="team"
                value={formData.team}
                onChange={(e) => handleChange('team', e.target.value)}
                required
              />
            </div>
          </div>
          
          {selectedVehicle && (
            <div className="bg-muted/40 p-4 rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Información del vehículo</p>
              <p className="text-sm"><span className="font-medium">Número Económico:</span> {selectedVehicle.economicNumber}</p>
              <p className="text-sm"><span className="font-medium">Placa:</span> {selectedVehicle.licensePlate}</p>
              <p className="text-sm"><span className="font-medium">Tipo de Combustible:</span> {selectedVehicle.fuelType}</p>
              <p className="text-sm"><span className="font-medium">Capacidad del Tanque:</span> {selectedVehicle.tankCapacity} litros</p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" type="button" onClick={onCancel}>
            Cancelar
          </Button>
          <Button type="submit" className="bg-fleet-teal hover:bg-fleet-teal/90">
            {initialData.id ? 'Actualizar' : 'Guardar'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default DailyEntryForm;
