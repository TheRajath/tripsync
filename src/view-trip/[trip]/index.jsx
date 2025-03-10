import { db } from "@/service/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import InformationSection from "../components/InformationSection";
import Hotels from "../components/Hotels";
import PlacesToVisit from "../components/PlacesToVisit";
import Footer from "../components/Footer";

function ViewTrip() {
  const { tripId } = useParams();
  const [trip, setTrip] = useState([]);

  useEffect(() => {
    tripId && GetTripData();
  }, [tripId]);

  // Use to get information from firebase

  const GetTripData = async () => {
    const documentReference = doc(db, "AITrips", tripId);
    const documentSnap = await getDoc(documentReference);

    if (documentSnap.exists()) {
      setTrip(documentSnap.data());
    } else {
      console.log("No such document");
      toast("No trip found!");
    }
  };

  return (
    <div className="p-10 md:px-20 lg:px-44 xl:px-56">
      {/* Information Section */}
      <InformationSection trip={trip} />

      {/* Recomented Hotels */}
      <Hotels trip={trip} />

      {/* Daily Plan */}
      <PlacesToVisit trip={trip} />

      {/* Footer */}
      <Footer trip={trip} />
    </div>
  );
}

export default ViewTrip;
