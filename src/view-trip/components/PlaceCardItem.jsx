import { Button } from "@/components/ui/button";
import React from "react";
import { IoLocationSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

function PlaceCardItem({ activity }) {
  return (
    <Link
      to={
        "https://www.google.com/maps/search/?api=1&query=" + activity?.placeName
      }
      target="_blank"
    >
      <div
        className="flex flex-col items-start bg-white border shadow-sm rounded-xl p-4
    hover:scale-105 hover:shadow-md transition-all"
      >
        <h2 className="text-orange-600 font-medium text-sm">
          {activity.bestTimeToVisit}
        </h2>

        <div className="flex items-center w-full mt-2">
          <img
            src="/placeholder.jpg"
            className="w-[130px] h-[130px] rounded-xl"
          />
          <div className="ml-4">
            <h2 className="font-bold text-lg">{activity.placeName}</h2>
            <p className="text-sm text-gray-500">{activity.placeDetails}</p>
            {/* Travel Time Information */}
            {activity.timeToTravelFromHotel && (
              <p className="text-sm text-gray-500 mt-2">
                <strong>🕖 From Hotel:</strong> {activity.timeToTravelFromHotel}
              </p>
            )}
            {activity.timeToTravelFromPrevious && (
              <p className="text-sm text-gray-500 mt-1">
                <strong>🕖 From Previous:</strong>{" "}
                {activity.timeToTravelFromPrevious}
              </p>
            )}
            <Button size="sm">
              <IoLocationSharp />
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default PlaceCardItem;
