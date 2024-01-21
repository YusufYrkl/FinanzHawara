import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/firebase.mjs";

export async function getEinnahmenAusgaben(user, setData) {
  try {
    if (user) {
      const userDocRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(userDocRef);

      if (docSnap.exists()) {
        const einnahmen = docSnap.data().einnahmen;
        const ausgaben = docSnap.data().ausgaben;
        setData({ einnahmen, ausgaben });

        const unsubscribe = onSnapshot(userDocRef, (doc) => {
          if (doc.exists()) {
            const updatedEinnahmen = doc.data().einnahmen;
            const updatedAusgaben = doc.data().ausgaben;
            setData({ einnahmen: updatedEinnahmen, ausgaben: updatedAusgaben });
          }
        });

        return () => unsubscribe();
      } else {
        console.log("No such document!");
        setData({ einnahmen: {}, ausgaben: {} });
      }
    } else {
      setData({ einnahmen: {}, ausgaben: {} });
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
}
