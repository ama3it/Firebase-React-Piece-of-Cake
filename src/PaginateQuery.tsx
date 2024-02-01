import { collection, query, orderBy, startAfter, limit, getDocs } from "firebase/firestore";  
import { db } from "./firebase-config";

const collectionName = import.meta.env.VITE_COLLECTON_NAME;
const first = query(collection(db, collectionName), orderBy("name"), limit(25));
const documentSnapshots = await getDocs(first);

// Get the last visible document
const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length-1];
console.log("last", lastVisible);

// Construct a new query starting at this document,
// get the next 25 heros.
const next = query(collection(db, collectionName),
    orderBy("name"),
    startAfter(lastVisible),
    limit(25))
    
const Snapshots = await getDocs(next);  