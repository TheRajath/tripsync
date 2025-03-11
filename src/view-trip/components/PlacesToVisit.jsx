import React from "react";
import PlaceCardItem from "./PlaceCardItem";
import { IoCalendarOutline } from "react-icons/io5";

function PlacesToVisit({ trip }) {
  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 flex items-center gap-2">
        <IoCalendarOutline className="text-blue-500 text-lg md:text-2xl" />
        Travel Itinerary
      </h2>

      {trip.tripData?.itinerary &&
        Object.entries(trip.tripData.itinerary)
          .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
          .map(([day, details], index) => (
            <section key={index} className="mb-8 md:mb-12">
              {/* Day Header */}
              <div className="mb-4 md:mb-6 border-l-4 border-blue-500 pl-3 md:pl-4">
                <h2 className="text-lg md:text-xl font-bold text-gray-800">
                  {day.replace("day", "Day ")}
                </h2>
                <p className="text-gray-600 text-sm md:text-base mt-1">
                  {details.theme}
                </p>
              </div>

              {/* Timeline Activities */}
              <div className="relative before:absolute before:left-[14px] md:before:left-[18px] before:h-full before:w-0.5 before:bg-gray-200">
                {details.activities?.map((activity, idx) => (
                  <PlaceCardItem key={idx} activity={activity} />
                ))}
              </div>
            </section>
          ))}
    </div>
  );
}

export default PlacesToVisit;
