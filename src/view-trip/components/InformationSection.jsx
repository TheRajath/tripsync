import { Button } from "@/components/ui/button";
import React from "react";
import { IoShareSharp } from "react-icons/io5";

function InformationSection({ trip }) {
  return (
    <div>
      <img
        src="/placeholder.jpg"
        className="h-[340px] w-full object-cover rounded-xl"
      />
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
