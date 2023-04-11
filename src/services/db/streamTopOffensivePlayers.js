import { query, orderBy, onSnapshot, collection, limit } from 'firebase/firestore';
import { db } from 'services/firestore';

export const streamTopOffensivePlayers = (sortField, sortType, snapshot, error) => {
  const collectionRef = collection(db, 'players');
  const queryRef = query(collectionRef, orderBy(sortField, sortType), limit(10));
  return onSnapshot(queryRef, snapshot, error);
};

export default {};
