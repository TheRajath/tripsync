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
  DialogTrigger,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function CreateTrip() {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
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
    const docId = Date.now().toString();

    await setDoc(doc(db, "AITrips", docId), {
      userSelection: formData,
      tripData: JSON.parse(TripData),
      userEmail: user?.email,
      id: docId,
    });

    setLoading(false);
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
      <div className="flex flex-col items-center justify-center min-h-screen px-5">
        {/* Container to keep content centered */}
        <div className="w-full max-w-3xl text-center mt-16">
          <h2 className="font-bold text-3xl">
            Personalize Your Next Adventure 🏝️
          </h2>
          <p className="mt-3 text-gray-500 text-xl">
            Your ideal trip is just a few clicks away, tell us what you need!
          </p>

          <div className="mt-10 flex flex-col gap-8 items-center w-full">
            {/* Destination Input */}
            <div className="w-full">
              <h2 className="text-xl my-3 font-medium text-left">
                Which destination would you like to visit?
              </h2>
              <GooglePlacesAutocomplete
                apiKey={googleApiKey}
                selectProps={{
                  place,
                  onChange: (value) => {
                    setPlace(value);
                    handleInputChange("location", value);
                  },
                }}
              />
            </div>

            {/* Number of Days Input */}
            <div className="w-full">
              <h2 className="text-xl my-3 font-medium text-left">
                For how many days are you planning your trip?
              </h2>
              <Input
                placeholder="Ex 3"
                type="number"
                className="w-full"
                onChange={(event) =>
                  handleInputChange("noOfDays", event.target.value)
                }
              />
            </div>

            <div className="w-full">
              <h2 className="text-xl my-3 font-medium text-left">
                What is your budget?
              </h2>
              <div className="grid grid-cols-3 gap-5 mt-5">
                {SelectBudgetOptions.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => handleInputChange("budget", item.title)}
                    className={`p-4 border cursor-pointer
                    rounded-lg hover:shadow-lg
                    ${
                      formData?.budget == item.title && "shadow-lg border-black"
                    }
                    `}
                  >
                    <h2 className="text-4xl">{item.icon}</h2>
                    <h2 className="font-bold text-lg">{item.title}</h2>
                    <h2 className="text-sm text-gray-500">{item.desc}</h2>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full">
              <h2 className="text-xl my-3 font-medium text-left">
                Who do you plan to travel with on your upcoming trip?
              </h2>
              <div className="grid grid-cols-3 gap-5 mt-5">
                {SelectTravelList.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => handleInputChange("traveler", item.people)}
                    className={`p-4 border cursor-pointer
                    rounded-lg hover:shadow-lg
                    ${
                      formData?.traveler == item.people &&
                      "shadow-lg border-black"
                    }
                    `}
                  >
                    <h2 className="text-4xl">{item.icon}</h2>
                    <h2 className="font-bold text-lg">{item.title}</h2>
                    <h2 className="text-sm text-gray-500">{item.desc}</h2>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="my-10">
          <Button disabled={loading} onClick={OnScheduleTrip}>
            {loading ? (
              <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" />
            ) : (
              "Schedule Trip"
            )}
          </Button>
        </div>
      </div>

      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="/logo.svg" />
              <DialogTitle className="font-bold text-lg mt-7">
                Sign In With Google
              </DialogTitle>
              {/* <h2 className='font-bold text-lg mt-7'>Sign In With Google</h2> */}
              <p>Sign in to the App with Google Authentication Securely</p>

              <Button
                onClick={login}
                className="w-full mt-5 flex gap-4 items-center"
              >
                <FcGoogle className="h-7 w-7" />
                Sign In With Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </LoadScript>
  );
}

export default CreateTrip;
