import PlacePhoto from "@/components/custom/PlacePhoto";
import { Button } from "@/components/ui/button";
import React from "react";
import { Link } from "react-router-dom";
import { IoLocation, IoCash } from "react-icons/io5";

function Hotels({ trip }) {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold mb-8">Recommended Stays</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {trip?.tripData?.hotelOptions?.map((hotel, index) => (
          <Link
            key={index}
            to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              hotel.hotelName
            )},${encodeURIComponent(hotel.hotelAddress)}`}
            target="_blank"
            className="group"
          >
            <div className="h-full bg-white border rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col">
              <div className="relative h-48 overflow-hidden">
                <PlacePhoto
                  query={`${hotel.hotelName} ${hotel.hotelAddress}`}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <div className="p-4 flex flex-col flex-1">
                <h3 className="font-semibold text-lg mb-2">
                  {hotel.hotelName}
                </h3>

                <div className="flex items-start text-gray-600 mb-3">
                  <IoLocation className="flex-shrink-0 mt-1 mr-2" />
                  <p className="text-sm line-clamp-2">{hotel.hotelAddress}</p>
                </div>

                <div className="mt-auto pt-3">
                  <div className="flex items-center text-green-600 mb-3">
                    <IoCash className="mr-2" />
                    <span className="font-medium">{hotel.price}</span>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full rounded-lg"
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Hotels;
