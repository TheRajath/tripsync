import React from "react";
import PlaceCardItem from "./PlaceCardItem";

function PlacesToVisit({ trip }) {
  return (
    <div>
      <h2 className="mt-4 font-bold text-lg">Places to Visit</h2>
      <div>
        {trip.tripData?.itinerary &&
          Object.entries(trip.tripData.itinerary)
            .sort(([a], [b]) =>
              a.localeCompare(b, undefined, { numeric: true })
            )
            .map(([day, details], index) => (
              <div key={index} className="my-6">
                <h2 className="font-bold text-lg">{day.toUpperCase()}</h2>
                <p className="italic text-gray-600">{details.theme}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  {details.activities?.map((activity, idx) => (
                    <PlaceCardItem key={idx} activity={activity} />
                  ))}
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}

export default PlacesToVisit;
