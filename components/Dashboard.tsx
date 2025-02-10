"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Bell, Home, Building, DollarSign, Search, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import PropertyCard from "./PropertyCard";
import { properties } from "@/data";
import { AuthDialog } from "./AuthDialog";

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  active?: boolean;
}

function NavItem({ href, icon, children, active }: NavItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-2 px-3 py-2 text-sm text-gray-700 rounded-lg",
        active && "bg-gray-100"
      )}
    >
      {icon}
      <span>{children}</span>
    </Link>
  );
}

export default function Dashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTab, setSelectedTab] = React.useState("all");

  useEffect(() => {
    const auth = sessionStorage.getItem("isAuthenticated");
    setIsAuthenticated(!!auth);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <AuthDialog onAuthenticated={() => setIsAuthenticated(true)} />;
  }

  const filteredProperties = properties.filter((property) => {
    if (selectedTab === "all") return true;
    return property.status.toLowerCase() === selectedTab.toLowerCase();
  });

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <div className="w-64 border-r bg-white">
        <div className="p-4">
          <h1 className="text-xl font-bold">Real Estate Dashboard</h1>
        </div>
        <nav className="space-y-1 px-2">
          <NavItem href="#" icon={<Home className="h-4 w-4" />} active>
            All Listings
          </NavItem>
          <NavItem href="#" icon={<Building className="h-4 w-4" />}>
            Properties
          </NavItem>
          <NavItem href="#" icon={<DollarSign className="h-4 w-4" />}>
            Sales
          </NavItem>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1">
        <header className="flex items-center justify-between border-b px-6 py-4">
          <div className="w-96">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search properties..."
                className="pl-9"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
            <div className="h-8 w-8 overflow-hidden rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z" />
                {/*TODO: better avatar icon*/}
              </svg>
            </div>
          </div>
        </header>

        <div className="p-6">
          <div className="mb-6 flex items-center gap-4">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Listing
            </Button>
          </div>

          <div className="mb-6">
            <Tabs defaultValue="all" onValueChange={setSelectedTab}>
              <TabsList>
                <TabsTrigger value="all">All Listings</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="sold">Sold</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredProperties.map((property) => (
              <PropertyCard
                key={property.id}
                address={property.address}
                price={property.price}
                bedrooms={property.bedrooms}
                bathrooms={property.bathrooms}
                sqft={property.sqft}
                image={property.image}
                status={property.status}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
