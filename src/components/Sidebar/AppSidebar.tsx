
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger
} from "@/components/ui/sidebar";
import { CalendarIcon, ChartBarIcon, FileTextIcon, FolderIcon, MapPinIcon, UserIcon } from 'lucide-react';

const AppSidebar = () => {
  const location = useLocation();
  
  const menuItems = [
    {
      title: "Dashboard",
      path: "/",
      icon: ChartBarIcon
    },
    {
      title: "Vehículos",
      path: "/vehicles",
      icon: FileTextIcon
    },
    {
      title: "Registro Diario",
      path: "/daily-entry",
      icon: CalendarIcon
    },
    {
      title: "Reportes",
      path: "/reports",
      icon: FolderIcon
    },
    {
      title: "Proyectos",
      path: "/projects",
      icon: MapPinIcon
    },
    {
      title: "Cuadrillas",
      path: "/teams",
      icon: UserIcon
    }
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <Sidebar className="border-r border-border">
      <SidebarHeader className="py-6 px-4 flex items-center justify-between">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-fleet-teal flex items-center justify-center">
            <span className="text-white font-bold">FT</span>
          </div>
          <span className="ml-2 text-sidebar-foreground font-semibold">Fleet Track</span>
        </div>
        <SidebarTrigger />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menú</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    className={isActive(item.path) ? 'bg-sidebar-accent text-sidebar-foreground' : ''}
                  >
                    <Link to={item.path} className="flex items-center">
                      <item.icon className="h-5 w-5 mr-2" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
