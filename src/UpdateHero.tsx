import {
  deleteDoc,
  deleteField,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase-config";
import { useState } from "react";

type Hero = {
  name: string;
  anime: string;
  quirk: string;
  slug: string;
};

const AddHero = () => {
  const [hero, setHero] = useState<Hero>({
    name: "",
    slug: "",
    quirk: "",
    anime: "",
  });

  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const UpdateHero = async (data: Hero) => {
    try {
      let collectionName = import.meta.env.VITE_COLLECTON_NAME;

      console.log(data);
      const HeroRef = doc(db, collectionName, data.slug);
      await updateDoc(HeroRef, {
        name: data.name,
      });
      setIsSuccess(true);
    } catch (error) {
      console.log(error);
      throw new Error("Oh no!");
    }
  };

  const addHero = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    UpdateHero(hero);
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center h-screen">
      <form
        className="bg-white rounded-lg shadow-lg p-8 w-96"
        onSubmit={addHero}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Update Hero</h2>
        </div>
        {isSuccess ? (
          <p className="text-green-600 my-2">Hero name Update successful.</p>
        ) : (
          ""
        )}
        <div className="mb-4">
          <label htmlFor="feeling" className="font-semibold mb-2 block">
            Hero Slug
          </label>
          <input
            type="text"
            id="feeling"
            placeholder="Eraser Head"
            className="border rounded px-4 py-2 w-full"
            onChange={(e) => setHero({ ...hero, slug: e.target.value })}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="feeling" className="font-semibold mb-2 block">
            Hero name
          </label>
          <input
            type="text"
            id="feeling"
            placeholder="Eraser Head"
            className="border rounded px-4 py-2 w-full"
            onChange={(e) => setHero({ ...hero, name: e.target.value })}
          />
        </div>

        <div className="flex justify-between items-center">
          <button
            className="bg-blue-500 text-white rounded px-4 py-2"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddHero;
