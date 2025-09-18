import type { User } from '@servitecperu/shared';

interface DefaultFirestoreProps {
  createAt: FirebaseFirestore.Timestamp;
  updateAt: FirebaseFirestore.Timestamp;
  deleteAt: FirebaseFirestore.Timestamp;
  isDeleted: boolean;
}

type _User = User & DefaultFirestoreProps;
