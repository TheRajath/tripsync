import PlacePhoto from "@/components/custom/PlacePhoto";
import React from "react";
import { Link } from "react-router-dom";

function UserTripCardItem({ trip }) {
  return (
    <Link to={"/view-trip/" + trip.id}>
      <div className="hover:scale-105 transition-all">
        <div className="h-[200px] w-full rounded-xl overflow-hidden">
          <PlacePhoto query={trip?.userSelection?.location?.label} />
        </div>
        <div>
          <h2 className="font-medium text-lg">
            {trip?.userSelection?.location?.label}
          </h2>
          <h2 className="text-sm text-gray-600">
            {trip?.userSelection?.totalDays} Days trip with{" "}
            {trip?.userSelection?.budget}
          </h2>
        </div>
      </div>
    </Link>
  );
}

export default UserTripCardItem;
