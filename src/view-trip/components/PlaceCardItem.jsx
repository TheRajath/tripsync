import PlacePhoto from "@/components/custom/PlacePhoto";
import { Button } from "@/components/ui/button";
import React from "react";
import { IoLocationSharp, IoTimeOutline, IoCarOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

function PlaceCardItem({ activity }) {
  return (
    <div className="relative pl-8 md:pl-12 group">
      <div className="absolute left-0 top-5 w-3 h-3 md:w-4 md:h-4 bg-blue-500 rounded-full ring-4 ring-white z-10" />

      <div className="my-5 bg-white p-4 md:p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
        <div className="flex items-center gap-2 mb-3 text-gray-600 text-sm md:text-base">
          <IoTimeOutline className="flex-shrink-0" />
          <span className="font-medium">{activity.bestTimeToVisit}</span>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-32 h-32 rounded-lg overflow-hidden flex-shrink-0">
            <PlacePhoto query={activity.placeName} />
          </div>

          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-1 md:mb-2">
              {activity.placeName}
            </h3>
            <p className="text-gray-600 text-sm md:text-base mb-3">
              {activity.placeDetails}
            </p>

            {(activity.timeToTravelFromHotel ||
              activity.timeToTravelFromPrevious) && (
              <div className="bg-gray-50 p-3 md:p-4 rounded-lg">
                <div className="flex items-center gap-2 text-gray-600 mb-2">
                  <IoCarOutline className="flex-shrink-0" />
                  <span className="text-sm font-medium">Getting There</span>
                </div>
                {activity.timeToTravelFromHotel && (
                  <p className="text-sm text-gray-600">
                    <strong>From hotel:</strong>{" "}
                    {activity.timeToTravelFromHotel}
                  </p>
                )}
                {activity.timeToTravelFromPrevious && (
                  <p className="text-sm text-gray-600 mt-1">
                    <strong>From previous location:</strong>{" "}
                    {activity.timeToTravelFromPrevious}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        <Button size="sm" className="mt-3 md:mt-4 w-full md:w-auto" asChild>
          <Link
            to={`https://www.google.com/maps/search/?api=1&query=${activity.placeName}`}
            target="_blank"
            className="flex items-center justify-center gap-2"
          >
            <IoLocationSharp />
            View on Map
          </Link>
        </Button>
      </div>
    </div>
  );
}

export default PlaceCardItem;
