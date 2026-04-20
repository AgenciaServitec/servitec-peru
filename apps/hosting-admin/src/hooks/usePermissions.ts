import { useEffect, useState } from "react";
import { useAuthentication } from "../providers";
import { doc } from "firebase/firestore";
import { firestore } from "../firebase";

export const usePermissions = () => {
  const { authUser } = useAuthentication();
  const [rolePermissions, setRolePermissions] = useState<string[]>([]);

  useEffect(() => {
    const fetchRoleData = async () => {
      if (authUser?.role) {
        const docRef = doc(firestore, "roles", authUser.role);
        const snap = await getDoc(docRef);
        setRolePermissions(snap.data()?.permissions || []);
      }
    };
    fetchRoleData();
  }, [authUser?.role]);

  // Combinamos ambos:
  const allPermissions = [
    ...rolePermissions,
    ...(authUser?.extraPermissions || []),
  ];

  const hasPermission = (perm: string) => {
    if (authUser?.role === "super_admin") return true;
    return allPermissions.includes(perm);
  };

  return { hasPermission, allPermissions };
};
