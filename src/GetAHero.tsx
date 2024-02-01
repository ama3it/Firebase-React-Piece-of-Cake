import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase-config";
import { useState } from "react";

const GetAHero = () => {
  const [slug,setSlug]=useState<string|null>(null)
  
  const getHero = async (e:React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(slug){
      const collectionName = import.meta.env.VITE_COLLECTON_NAME;
      const docRef = doc(db, collectionName, slug);
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
       alert(JSON.stringify({"Name":docSnap.data().name, "Quirk":docSnap.data().quirk})
      )} else {
        alert("NO such document")
      }
    }
    
  
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center h-screen">
      <form
        className="bg-white rounded-lg shadow-lg p-8 w-96"
        onSubmit={getHero}
      >

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Get Hero</h2>
        </div>

        <div className="mb-4">
          <label htmlFor="feeling" className="font-semibold mb-2 block">
            Hero slug
          </label>
          <input
            type="text"
            id="feeling"
            placeholder="Eraser Head"
            className="border rounded px-4 py-2 w-full"
            onChange={(e) => setSlug(e.target.value )}
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
  )
};

export default GetAHero;
