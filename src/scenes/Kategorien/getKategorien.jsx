import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/firebase.mjs";

export async function getKategorien(user, setData) {
  try {
    if (user) {
      const userDocRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(userDocRef);

      if (docSnap.exists()) {
        const kategorien = docSnap.data().kategorien;
        setData(kategorien);

        const unsubscribe = onSnapshot(userDocRef, (doc) => {
          if (doc.exists()) {
            const updatedKategorien = doc.data().kategorien;
            setData(updatedKategorien);
          }
        });

        return () => unsubscribe();
      } else {
        console.log("No such document!");
        setData([]);
      }
    } else {
      setData([]);
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
}
