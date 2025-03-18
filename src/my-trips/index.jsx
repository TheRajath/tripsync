import { db } from "@/service/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserTripCardItem from "./components/UserTripCardItem";

function MyTrips() {
  const navigate = useNavigate();
  const [userTrips, setUserTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    GetUserTrips();
  }, []);

  const GetUserTrips = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/");
      return;
    }
    try {
      const q = query(
        collection(db, "AITrips"),
        where("userEmail", "==", user.email)
      );
      const querySnapshot = await getDocs(q);
      const tripsArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUserTrips(tripsArray);
    } catch (error) {
      console.error("Error fetching user trips:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTrip = (tripId) => {
    setUserTrips((prevTrips) => prevTrips.filter((trip) => trip.id !== tripId));
  };

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8 mt-8 mb-20">
      <h2 className="font-bold text-3xl md:text-4xl text-gray-800 mb-6 text-center">
        My Trips
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {loading ? (
          [1, 2, 3, 4, 5, 6].map((item, index) => (
            <div
              key={index}
              className="h-[220px] bg-gray-300 animate-pulse rounded-xl"
            ></div>
          ))
        ) : userTrips.length > 0 ? (
          userTrips.map((trip, index) => (
            <UserTripCardItem
              trip={trip}
              key={index}
              onDelete={handleDeleteTrip}
            />
          ))
        ) : (
          <p className="text-gray-500 text-lg col-span-full text-center">
            No trips found. Start planning your next adventure!
          </p>
        )}
      </div>
    </div>
  );
}

export default MyTrips;
