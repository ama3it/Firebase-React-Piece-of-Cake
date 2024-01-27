import { deleteDoc, doc } from "firebase/firestore";
import { db } from "./firebase-config";
import { useState } from "react";


const DeleteHero = () => {
  const [slug, setSlug] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const DeleteHero = async (heroslug: string) => {
    try {
      let collectionName = import.meta.env.VITE_COLLECTON_NAME;

      await deleteDoc(doc(db, collectionName, heroslug));
      setIsSuccess(true)
    } catch (error) {
      throw new Error("Oh no!");
    }
  };
  

  const addHero = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
   
    DeleteHero(slug);
  }

  return (
    <div className="bg-gray-100 flex items-center justify-center h-screen">
      <form
        className="bg-white rounded-lg shadow-lg p-8 w-96"
        onSubmit={addHero}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Delete Hero</h2>
        </div>
        {isSuccess ? (
          <p className="text-red-600 my-2">
            Hero Successfully deleted.
          </p>
        ) : (
          ""
        )}
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
            Delete
          </button>
        </div>
      </form>
    </div>
  );
};

export default DeleteHero;
