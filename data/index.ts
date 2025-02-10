export interface Property {
  id: string;
  address: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  image: string;
  status: "Active" | "Pending" | "Sold";
}

export const properties: Property[] = [
  {
    id: "1",
    address: "123 Main St, City, State",
    price: 599000,
    bedrooms: 3,
    bathrooms: 2,
    sqft: 2100,
    image: "/ex_house.jpg",
    status: "Active",
  },
  {
    id: "2",
    address: "456 Oak Ave, City, State",
    price: 899000,
    bedrooms: 4,
    bathrooms: 3,
    sqft: 2800,
    image: "/ex_house.jpg",
    status: "Pending",
  },
  {
    id: "3",
    address: "789 Pine Rd, City, State",
    price: 450000,
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1800,
    image: "/ex_house.jpg",
    status: "Sold",
  },
  {
    id: "4",
    address: "321 Elm St, City, State",
    price: 750000,
    bedrooms: 4,
    bathrooms: 2.5,
    sqft: 2400,
    image: "/ex_house.jpg",
    status: "Active",
  },
  {
    id: "5",
    address: "654 Maple Dr, City, State",
    price: 1200000,
    bedrooms: 5,
    bathrooms: 4,
    sqft: 3500,
    image: "/ex_house.jpg",
    status: "Active",
  },
];
