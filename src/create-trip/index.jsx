import React, { useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { LoadScript } from "@react-google-maps/api";
import { Input } from "@/components/ui/input";
import {
  AI_PROMPT,
  SelectBudgetOptions,
  SelectTravelList,
} from "@/constants/options";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { chatSession } from "@/service/AIModel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

function CreateTrip() {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const naviagte = useNavigate();
  const googleApiKey = import.meta.env.VITE_GOOGLE_PLACE_API_KEY;

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => GetUserProfile(codeResponse),
    onError: (error) => console.log(error),
  });

  const OnScheduleTrip = async () => {
    const user = localStorage.getItem("user");

    if (!user) {
      setOpenDialog(true);
      return;
    }

    const isFormIncomplete =
      !formData?.location || !formData?.budget || !formData?.traveler;

    if (formData?.noOfDays > 5 || isFormIncomplete) {
      toast("Please fill all the details");
      return;
    }

    setLoading(true);

    const FINAL_PROMPT = AI_PROMPT.replace(
      "{location}",
      formData?.location.label
    )
      .replace("{totalDays}", formData?.noOfDays)
      .replace("{traveler}", formData?.traveler)
      .replace("{budget}", formData?.budget);

    // console.log(FINAL_PROMPT)

    const result = await chatSession.sendMessage(FINAL_PROMPT);

    // console.log(result?.response?.text());

    setLoading(false);
    SaveAiTrip(result?.response?.text());
  };

  const SaveAiTrip = async (TripData) => {
    setLoading(true);

    const user = JSON.parse(localStorage.getItem("user"));
    const documentId = Date.now().toString();

    await setDoc(doc(db, "AITrips", documentId), {
      userSelection: formData,
      tripData: JSON.parse(TripData),
      userEmail: user?.email,
      id: documentId,
    });

    setLoading(false);

    naviagte("/view-trip/" + documentId);
  };

  const GetUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "Application/json",
          },
        }
      )
      .then((response) => {
        console.log(response);
        localStorage.setItem("user", JSON.stringify(response.data));
        setOpenDialog(false);
        OnScheduleTrip();
      });
  };

  return (
    <LoadScript googleMapsApiKey={googleApiKey} libraries={["places"]}>
      <div className="flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="w-full max-w-2xl space-y-8 py-12">
          {/* Header Section */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
              Craft Your Perfect Journey
            </h1>
            <p className="text-lg text-gray-600">
              Your ideal trip is just a few clicks away, tell us what you need!
            </p>
          </div>

          {/* Form Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 space-y-8">
            {/* Destination Input */}
            <div className="space-y-3">
              <label className="block text-lg font-medium text-gray-900">
                🌍 Destination
              </label>
              <GooglePlacesAutocomplete
                apiKey={googleApiKey}
                selectProps={{
                  placeholder: "Search for a location...",
                  styles: {
                    control: (provided) => ({
                      ...provided,
                      padding: "0.5rem",
                      borderRadius: "0.75rem",
                      borderColor: "#e5e7eb",
                    }),
                    input: (provided) => ({
                      ...provided,
                      fontSize: "1rem",
                    }),
                  },
                  value: place,
                  onChange: (value) => {
                    setPlace(value);
                    handleInputChange("location", value);
                  },
                }}
              />
            </div>

            {/* Trip Duration */}
            <div className="space-y-3">
              <label className="block text-lg font-medium text-gray-900">
                📅 Trip Duration (Days)
              </label>
              <Input
                placeholder="Enter number of days"
                type="number"
                className="w-full rounded-lg py-6 text-lg"
                onChange={(event) =>
                  handleInputChange("noOfDays", event.target.value)
                }
              />
            </div>

            {/* Budget Selection */}
            <div className="space-y-3">
              <label className="block text-lg font-medium text-gray-900">
                💰 Budget Preference
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {SelectBudgetOptions.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => handleInputChange("budget", item.title)}
                    className={`p-4 border-2 rounded-xl cursor-pointer transition-all
                      ${
                        formData?.budget === item.title
                          ? "border-blue-500 bg-blue-50 shadow-lg"
                          : "border-gray-200 hover:border-blue-200 hover:bg-blue-50"
                      }
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{item.icon}</span>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-600">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Travel Companion */}
            <div className="space-y-3">
              <label className="block text-lg font-medium text-gray-900">
                👥 Traveling With
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {SelectTravelList.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => handleInputChange("traveler", item.people)}
                    className={`p-4 border-2 rounded-xl cursor-pointer transition-all
                      ${
                        formData?.traveler === item.people
                          ? "border-blue-500 bg-blue-50 shadow-lg"
                          : "border-gray-200 hover:border-blue-200 hover:bg-blue-50"
                      }
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{item.icon}</span>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-600">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <Button
                onClick={OnScheduleTrip}
                className="w-full py-6 text-lg font-semibold rounded-xl transition-transform hover:scale-[1.02]"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <AiOutlineLoading3Quarters className="h-6 w-6 animate-spin" />
                    <span>Creating Your Plan...</span>
                  </div>
                ) : (
                  "✨ Generate My Travel Plan"
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Sign-in Dialog */}
        <Dialog open={openDialog}>
          <DialogContent className="rounded-2xl max-w-md">
            <DialogHeader>
              <div className="text-center space-y-4">
                <div className="mx-auto bg-blue-100 p-4 rounded-full w-fit">
                  <FcGoogle className="h-12 w-12" />
                </div>
                <DialogTitle className="text-2xl font-bold text-gray-900">
                  Sign In to Continue
                </DialogTitle>
                <DialogDescription className="text-gray-600">
                  Secure login with Google to save and access your travel plans
                </DialogDescription>

                <Button
                  onClick={login}
                  className="w-full py-6 text-lg font-semibold rounded-xl bg-white border border-gray-200 hover:bg-gray-50 text-gray-900"
                >
                  <div className="flex items-center gap-3">
                    <FcGoogle className="h-6 w-6" />
                    Continue with Google
                  </div>
                </Button>
              </div>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </LoadScript>
  );
}

export default CreateTrip;
