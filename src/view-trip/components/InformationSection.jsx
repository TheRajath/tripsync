import { Button } from "@/components/ui/button";
import PlacePhoto from "@/components/custom/PlacePhoto";
import React, { useState } from "react";
import { IoShareSharp, IoCalendar, IoPeople, IoCash } from "react-icons/io5";
import { toast } from "sonner";

function InformationSection({ trip }) {
  const [copied, setCopied] = useState(false);
  const location = trip?.userSelection?.location?.label;

  const handleCopy = () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl).then(() => {
      setCopied(true);
      toast.success("Link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="relative mb-8">
      <div className="h-[400px] w-full rounded-xl overflow-hidden bg-gray-100 relative">
        <PlacePhoto
          query={location}
          className="h-full w-full object-cover"
          fallback="/placeholder.jpg"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 drop-shadow-lg">
              {location}
            </h1>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <IoCalendar className="mr-2" />
                <span className="font-medium">
                  {trip?.userSelection?.noOfDays} Days
                </span>
              </div>

              <div className="flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <IoCash className="mr-2" />
                <span className="font-medium">
                  {trip?.userSelection?.budget} Budget
                </span>
              </div>

              <div className="flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <IoPeople className="mr-2" />
                <span className="font-medium">
                  {trip?.userSelection?.traveler} Travelers
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute top-4 right-4 z-10">
        <Button
          onClick={handleCopy}
          variant="secondary"
          className="rounded-full p-3 shadow-lg backdrop-blur-sm bg-white/30 hover:bg-white/50 
          transition-transform duration-200 active:scale-90 flex items-center gap-2"
        >
          <IoShareSharp className="w-5 h-5 text-white" />
          {copied && (
            <span className="text-sm font-semibold text-white">Copied!</span>
          )}
        </Button>
      </div>
    </div>
  );
}

export default InformationSection;
