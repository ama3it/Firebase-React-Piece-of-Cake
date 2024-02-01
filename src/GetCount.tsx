import { collection, getCountFromServer,  query, where } from "firebase/firestore";
import { db } from "./firebase-config";
import { useState } from "react";
const GetCount = () => {

  const [quirk,setquirk]=useState<string|null>(null)

  const getherowhere = async (e:React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(quirk){
        const collectionName = import.meta.env.VITE_COLLECTON_NAME
        const heroRef = collection(db, collectionName);
    
        const heroquery = query(heroRef, where("quirk", "==", quirk))
        const snapshot = await getCountFromServer(heroquery);
        
        alert(`No of heros with the ${quirk} is`+snapshot.data().count);
    
    }
   
  };
  return (
    <>
      <div className="bg-gray-100 flex items-center justify-center h-screen">
        <form
          className="bg-white rounded-lg shadow-lg p-8 w-96"
          onSubmit={getherowhere}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Get Hero</h2>
          </div>

          <div className="mb-4">
            <label htmlFor="feeling" className="font-semibold mb-2 block">
              Hero quirk
            </label>
            <input
              type="text"
              id="feeling"
              placeholder="Eraser Head"
              className="border rounded px-4 py-2 w-full"
              onChange={(e) => setquirk(e.target.value)}
            />
          </div>

          <div className="flex justify-between items-center">
            <button
              className="bg-red-500 text-white rounded px-4 py-2"
              type="submit"
            >
              Get Hero
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default GetCount;
