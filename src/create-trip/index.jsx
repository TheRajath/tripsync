import React, { useEffect, useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { LoadScript } from '@react-google-maps/api';
import { Input } from '@/components/ui/input';
import { SelectBudgetOptions, SelectTravelList } from '@/constants/options';
import { Button } from '@/components/ui/button';

function CreateTrip() {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState([]);
  const googleApiKey = import.meta.env.VITE_GOOGLE_PLACE_API_KEY;

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]:value
    })
  }

  useEffect(() => {
    console.log(formData);
  }, [formData])

  const OnScheduleTrip=()=>{
    if (formData?.noOfDays > 5) {
      return;
    }
    console.log(formData)
  }

  return (
    <LoadScript googleMapsApiKey={googleApiKey} libraries={["places"]}>
      <div className="flex flex-col items-center justify-center min-h-screen px-5">
        {/* Container to keep content centered */}
        <div className="w-full max-w-3xl text-center mt-16">
          <h2 className="font-bold text-3xl">Personalize Your Next Adventure 🏝️</h2>
          <p className="mt-3 text-gray-500 text-xl">
            Your ideal trip is just a few clicks away, tell us what you need!
          </p>

          <div className="mt-10 flex flex-col gap-8 items-center w-full">
            {/* Destination Input */}
            <div className="w-full">
              <h2 className="text-xl my-3 font-medium text-left">Which destination would you like to visit?</h2>
              <GooglePlacesAutocomplete
                apiKey={googleApiKey}
                selectProps={{
                  place,
                  onChange: (value) => { setPlace(value); handleInputChange('location', value)}
                }}
              />
            </div>

            {/* Number of Days Input */}
            <div className="w-full">
              <h2 className="text-xl my-3 font-medium text-left">For how many days are you planning your trip?</h2>
              <Input placeholder="Ex 3" type="number" className="w-full"
                onChange={(event)=>handleInputChange('noOfDays', event.target.value)}/>
            </div>

            <div className="w-full">
              <h2 className="text-xl my-3 font-medium text-left">What is your budget?</h2>
              <div className='grid grid-cols-3 gap-5 mt-5'>
                {SelectBudgetOptions.map((item, index) => (
                  <div key={index}
                    onClick={()=>handleInputChange('budget', item.title)}
                    className={`p-4 border cursor-pointer
                    rounded-lg hover:shadow-lg
                    ${formData?.budget==item.title&&'shadow-lg border-black'}
                    `}>
                    <h2 className='text-4xl'>{item.icon}</h2>
                    <h2 className='font-bold text-lg'>{item.title}</h2>
                    <h2 className='text-sm text-gray-500'>{item.desc}</h2>
                  </div>
                ))}
              </div>              
            </div>

            <div className="w-full">
              <h2 className="text-xl my-3 font-medium text-left">Who do you plan to travel with on your upcoming trip?</h2>
              <div className='grid grid-cols-3 gap-5 mt-5'>
                {SelectTravelList.map((item, index) => (
                  <div key={index}
                    onClick={()=>handleInputChange('traveler', item.people)}
                    className={`p-4 border cursor-pointer
                    rounded-lg hover:shadow-lg
                    ${formData?.traveler==item.people&&'shadow-lg border-black'}
                    `}>
                    <h2 className='text-4xl'>{item.icon}</h2>
                    <h2 className='font-bold text-lg'>{item.title}</h2>
                    <h2 className='text-sm text-gray-500'>{item.desc}</h2>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className='my-10'>
          <Button onClick={OnScheduleTrip}>Schedule Trip</Button>
        </div>
      </div>
    </LoadScript>
  );
}

export default CreateTrip;
