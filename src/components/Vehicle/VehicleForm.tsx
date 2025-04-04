
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Vehicle } from '@/types/fleet';

interface VehicleFormProps {
  initialData?: Partial<Vehicle>;
  onSubmit: (data: Partial<Vehicle>) => void;
  onCancel: () => void;
}

const VehicleForm: React.FC<VehicleFormProps> = ({ initialData = {}, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<Partial<Vehicle>>({
    economicNumber: '',
    licensePlate: '',
    make: '',
    model: '',
    year: new Date().getFullYear(),
    fuelType: 'diesel',
    tankCapacity: 0,
    assignedTo: '',
    project: '',
    team: '',
    status: 'active',
    ...initialData
  });

  const handleChange = (field: keyof Vehicle, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Card className="animate-fade-in max-w-2xl mx-auto">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>{initialData.id ? 'Editar Vehículo' : 'Nuevo Vehículo'}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="economicNumber">Número Económico</Label>
              <Input 
                id="economicNumber"
                value={formData.economicNumber}
                onChange={(e) => handleChange('economicNumber', e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="licensePlate">Placa</Label>
              <Input 
                id="licensePlate"
                value={formData.licensePlate}
                onChange={(e) => handleChange('licensePlate', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="make">Marca</Label>
              <Input 
                id="make"
                value={formData.make}
                onChange={(e) => handleChange('make', e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="model">Modelo</Label>
              <Input 
                id="model"
                value={formData.model}
                onChange={(e) => handleChange('model', e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="year">Año</Label>
              <Input 
                id="year"
                type="number"
                value={formData.year}
                onChange={(e) => handleChange('year', parseInt(e.target.value))}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fuelType">Tipo de Combustible</Label>
              <Select 
                value={formData.fuelType}
                onValueChange={(value) => handleChange('fuelType', value)}
              >
                <SelectTrigger id="fuelType">
                  <SelectValue placeholder="Seleccione..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="diesel">Diesel</SelectItem>
                  <SelectItem value="gasoline">Gasolina</SelectItem>
                  <SelectItem value="natural_gas">Gas Natural</SelectItem>
                  <SelectItem value="electric">Eléctrico</SelectItem>
                  <SelectItem value="hybrid">Híbrido</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="tankCapacity">Capacidad del Tanque (litros)</Label>
              <Input 
                id="tankCapacity"
                type="number"
                value={formData.tankCapacity}
                onChange={(e) => handleChange('tankCapacity', parseFloat(e.target.value))}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="assignedTo">Asignado a</Label>
              <Input 
                id="assignedTo"
                value={formData.assignedTo}
                onChange={(e) => handleChange('assignedTo', e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="status">Estado</Label>
              <Select 
                value={formData.status}
                onValueChange={(value: Vehicle['status']) => handleChange('status', value)}
              >
                <SelectTrigger id="status">
                  <SelectValue placeholder="Seleccione..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Activo</SelectItem>
                  <SelectItem value="maintenance">Mantenimiento</SelectItem>
                  <SelectItem value="inactive">Inactivo</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

export default VehicleForm;
