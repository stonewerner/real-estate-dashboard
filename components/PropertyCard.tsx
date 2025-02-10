"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

interface PropertyCardProps {
  address: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  image: string;
  status: "Active" | "Pending" | "Sold";
}

export default function PropertyCard({
  address,
  price,
  bedrooms,
  bathrooms,
  sqft,
  image,
  status,
}: PropertyCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-lg border bg-white">
      <div className="aspect-[4/3] overflow-hidden relative">
        <div
          className={cn(
            "absolute top-2 right-2 px-2 py-1 rounded-full text-sm text-white",
            status === "Active"
              ? "bg-green-500"
              : status === "Pending"
              ? "bg-yellow-500"
              : "bg-red-500"
          )}
        >
          {status}
        </div>
        <Image
          src={image || "/placeholder.svg"}
          alt={address}
          width={400}
          height={300}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h3 className="font-medium text-gray-900">{address}</h3>
        <p className="text-xl font-bold text-gray-900">
          ${price.toLocaleString()}
        </p>
        <div className="mt-2 flex items-center gap-4 text-sm text-gray-500">
          <span>{bedrooms} beds</span>
          <span>{bathrooms} baths</span>
          <span>{sqft.toLocaleString()} sqft</span>
        </div>
        <div className="mt-2 flex items-center gap-4 text-sm text-gray-500">
          <div className="relative flex items-start gap-2">
            <span>This is the text to send to the client...</span>
            <button
              onClick={() => {
                navigator.clipboard.writeText(
                  "This is the text to send to the client..."
                );
              }}
              className="shrink-0 p-2 text-gray-500 hover:text-gray-700 active:text-gray-900 transition-colors"
              title="Copy to clipboard"
              aria-label="Copy to clipboard"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
