import { doc, setDoc } from "firebase/firestore";
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
    anime: "",
    quirk: "",
    slug: "",
  });
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const putHero = async (data: Hero) => {
    // We are using slug variable to assign a unique document ID of our own.
    try {
      let collectionName = import.meta.env.VITE_COLLECTON_NAME;
      await setDoc(doc(db, collectionName, data.slug), {
        name: data.name,
        anime: data.anime,
        quirk: data.quirk,
        slug: data.slug,
      });
      setIsSuccess(true);
    } catch (error) {
      throw new Error("Oh no!");
    }
  };


  const addHero = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Just keep in mind that this might not be completely unique, and for a production application, you might want to use a library like nanoid for more reliable unique identifiers.
    let slug = hero.name.trim() + Math.floor(Math.random() * 100) + 1;
    putHero({ ...hero, slug: slug });
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center h-screen">
      <form
        className="bg-white rounded-lg shadow-lg p-8 w-96"
        onSubmit={addHero}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Add Hero</h2>
        </div>
        {isSuccess ? (
          <p className="text-green-600 my-2">
            Hero Added to our collection successfully.
          </p>
        ) : (
          ""
        )}
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

        <div className="mb-6">
          <label htmlFor="support" className="font-semibold mb-2 block">
            Quirk
          </label>
          <input
            id="support"
            placeholder="Erasure..."
            className="border rounded px-4 py-2 w-full"
            onChange={(e) => setHero({ ...hero, quirk: e.target.value })}
          ></input>
        </div>

        <div className="mb-6">
          <label htmlFor="support" className="font-semibold mb-2 block">
            Anime Verse
          </label>
          <input
            id="support"
            placeholder="My Hero Academia"
            className="border rounded px-4 py-2 w-full"
            onChange={(e) => setHero({ ...hero, anime: e.target.value })}
          ></input>
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
