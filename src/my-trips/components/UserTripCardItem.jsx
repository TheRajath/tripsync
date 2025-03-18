import PlacePhoto from "@/components/custom/PlacePhoto";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { IoShareSharp, IoTrashOutline } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { db } from "@/service/firebaseConfig";
import { doc, deleteDoc } from "firebase/firestore";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

function UserTripCardItem({ trip, onDelete }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleShare = () => {
    const tripUrl = `${window.location.origin}/view-trip/${trip.id}`;
    navigator.clipboard.writeText(tripUrl);
    toast.success("Trip link copied to clipboard!");
    setMenuOpen(false);
  };

  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, "AITrips", trip.id));
      onDelete(trip.id);
      toast.success("Trip deleted successfully!");
    } catch (error) {
      console.error("Error deleting trip:", error);
      toast.error("Failed to delete trip.");
    }
    setConfirmDialog(false);
  };

  return (
    <div className="relative">
      <Link to={`/view-trip/${trip.id}`}>
        <div className="bg-white shadow-md rounded-xl overflow-hidden transition-transform transform hover:scale-[1.03] hover:shadow-lg mb-6">
          <div className="h-[220px] w-full relative">
            <PlacePhoto query={trip?.userSelection?.location?.label} />
            <div className="absolute bottom-2 right-2 bg-gray-900 text-white text-xs px-2 py-1 rounded-lg opacity-80">
              {trip?.userSelection?.noOfDays} Days
            </div>
          </div>

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

      <div className="absolute top-3 right-3">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition"
        >
          <BsThreeDotsVertical className="text-gray-700 w-5 h-5" />
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute top-10 right-3 bg-white shadow-lg rounded-lg overflow-hidden w-36 z-50"
          >
            <button
              onClick={handleShare}
              className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-100 text-gray-700"
            >
              <IoShareSharp className="w-5 h-5" />
              Share Trip
            </button>
            <button
              onClick={() => {
                setMenuOpen(false);
                setConfirmDialog(true);
              }}
              className="flex items-center gap-2 w-full px-4 py-2 text-red-600 hover:bg-gray-100"
            >
              <IoTrashOutline className="w-5 h-5" />
              Delete Trip
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <Dialog open={confirmDialog} onOpenChange={setConfirmDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this trip? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Yes, Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default UserTripCardItem;
