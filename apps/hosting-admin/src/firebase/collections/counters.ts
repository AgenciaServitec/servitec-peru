import { firestore } from "../index";
import { fetchCollection } from "../firestore";

export interface CounterDoc {
  id: string;
  current: number;
}

export const countersRef = firestore.collection("counters");

export const fetchCounters = async (): Promise<CounterDoc[]> => {
  return fetchCollection<CounterDoc>(countersRef);
};

export const subscribeToCounters = (
  onUpdate: (counters: Record<string, number>) => void,
  onError?: (error: Error) => void
) => {
  return countersRef.onSnapshot(
    (snapshot) => {
      const countersMap: Record<string, number> = {};

      snapshot.forEach((doc) => {
        const data = doc.data();
        countersMap[doc.id] = data?.current || 0;
      });

      onUpdate(countersMap);
    },
    (error) => {
      if (onError) onError(error);
      else console.error("Error al escuchar counters:", error);
    }
  );
};
