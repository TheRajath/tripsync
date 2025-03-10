import { Button } from "@/components/ui/button";
import { GetPhotoUrl, GetPlaceDetails } from "@/service/GlobalApi";
import React, { useEffect, useState } from "react";
import { IoShareSharp } from "react-icons/io5";

function InformationSection({ trip }) {
  const [mainPhoto, setMainPhoto] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLocationPhoto = async () => {
      const location = trip?.userSelection?.location?.label;
      if (!location) return;

      setIsLoading(true);
      try {
        const results = await GetPlaceDetails(location);
        const firstPhotoRef = results[0]?.photos?.[0]?.photo_reference;
        setMainPhoto(firstPhotoRef ? GetPhotoUrl(firstPhotoRef) : null);
      } catch (error) {
        console.error("Main photo error:", error);
        setMainPhoto(null);
      }
      setIsLoading(false);
    };

    fetchLocationPhoto();
  }, [trip]);

  return (
    <div>
      <div className="h-[340px] w-full rounded-xl overflow-hidden bg-gray-100">
        {isLoading ? (
          <div className="h-full w-full animate-pulse bg-gray-200" />
        ) : mainPhoto ? (
          <img
            src={mainPhoto}
            className="h-full w-full object-cover"
            alt="Location preview"
            onError={() => setMainPhoto(null)}
          />
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500">
            No location image available
          </div>
        )}
      </div>
      <div className="flex justify-between items-center">
        <div className="my-5 flex flex-col gap-2">
          <h2 className="font-bold text-2xl">
            {trip?.userSelection?.location?.label}
          </h2>
          <div className="flex gap-5">
            <h2 className="p-1 px-4 bg-gray-200 rounded-full text-gray-500 test-xs md:text-md">
              📅 {trip?.userSelection?.noOfDays} Days
            </h2>
            <h2 className="p-1 px-4 bg-gray-200 rounded-full text-gray-500 test-xs md:text-md">
              💰 {trip?.userSelection?.budget} Budget
            </h2>
            <h2 className="p-1 px-4 bg-gray-200 rounded-full text-gray-500 test-xs md:text-md">
              👪 {trip?.userSelection?.traveler} Traveler
            </h2>
          </div>
        </div>

        <Button>
          <IoShareSharp />
        </Button>
      </div>
    </div>
  );
}

export default InformationSection;
