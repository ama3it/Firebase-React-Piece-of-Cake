import { query, orderBy, limit, collection, getDocs } from "firebase/firestore";
import { db } from "./firebase-config";
import { useState } from "react";
import { Hero } from "./AddHero";

const GetHeroOrdered = () => {
  const [heros, setHeros] = useState<Hero[] | null>(null);

  const getherowhere = async () => {

    const collectionName = import.meta.env.VITE_COLLECTON_NAME;
    const heroRef = collection(db, collectionName);

    const heroquery = query(heroRef, orderBy("name"), limit(2));
    const snapshot = await getDocs(heroquery);
    const fetchedheros: Hero[] = [];
    snapshot.forEach((doc) => {
      const hero: Hero = {
        name: doc.data().name,
        slug: doc.data().slug,
        quirk: doc.data().quirk,
        anime: doc.data().anime,
      };
      fetchedheros.push(hero);
    });

    setHeros(fetchedheros);
  };
  return (
    <>
      <button className="bg-red-500 text-white rounded px-4 py-2 m-10" onClick={getherowhere}>
        Get Hero
      </button>

      {heros ? (
        <div className="flex items-center justify-center h-screen ">
          <table className="w-[200px] divide-y divide-gray-200 dark:divide-gray-700">
            <thead>
              <tr>
                <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Name</th>
                <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Quirk</th>
                <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Anime</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {heros.map((hero) => {
                return (
                  <tr key={hero.slug}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">{hero.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{hero.quirk}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{hero.anime}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default GetHeroOrdered;
