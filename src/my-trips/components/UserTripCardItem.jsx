import PlacePhoto from "@/components/custom/PlacePhoto";
import React from "react";
import { Link } from "react-router-dom";

function UserTripCardItem({ trip }) {
  return (
    <Link to={`/view-trip/${trip.id}`}>
      <div className="bg-white shadow-md rounded-xl overflow-hidden transition-transform transform hover:scale-[1.03] hover:shadow-lg mb-6">
        {/* Trip Image */}
        <div className="h-[220px] w-full relative">
          <PlacePhoto query={trip?.userSelection?.location?.label} />
          <div className="absolute bottom-2 right-2 bg-gray-900 text-white text-xs px-2 py-1 rounded-lg opacity-80">
            {trip?.userSelection?.noOfDays} Days
          </div>
        </div>

        {/* Trip Info */}
        <div className="p-5">
          <h2 className="font-semibold text-lg text-gray-800 truncate">
            {trip?.userSelection?.location?.label}
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            ✈️ {trip?.userSelection?.noOfDays} days trip | 💰{" "}
            {trip?.userSelection?.budget}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default UserTripCardItem;
