
import React from 'react';
import { Button } from '@/components/ui/button';
import { FileTextIcon, PlusIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const DashboardHeader: React.FC = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
      <div>
        <h1 className="text-2xl font-bold text-fleet-blue">Panel de Control</h1>
        <p className="text-muted-foreground mt-1">Monitoreo de flota vehicular</p>
      </div>
      <div className="flex gap-3">
        <Button asChild variant="outline" className="flex items-center gap-2">
          <Link to="/reports">
            <FileTextIcon className="h-4 w-4" />
            <span>Exportar</span>
          </Link>
        </Button>
        <Button asChild className="bg-fleet-teal hover:bg-fleet-teal/90 flex items-center gap-2">
          <Link to="/daily-entry">
            <PlusIcon className="h-4 w-4" />
            <span>Nuevo Registro</span>
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeader;
