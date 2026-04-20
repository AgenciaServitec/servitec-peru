import { createContext, useContext, useEffect, useState } from "react";
import { useAuthentication } from "./AuthenticationProvider.tsx";
import { fetchRole } from "../firebase/collections/rolesAndPermissons.ts";

const PermissionsContext = createContext({
  permissions: [],
  loading: false,
});

export const PermissionsProvider: React.FC = ({ children }) => {
  const { authUser } = useAuthentication();
  const [permissions, setPermissions] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAllPermissions = async () => {
      if (authUser) {
        const role = await fetchRole(authUser?.role);
        const permissions = role?.permissions || [];

        const finalPerms = [
          ...new Set([...rolePerms, ...(authUser.extraPermissions || [])]),
        ];

        setPermissions(finalPerms);
      }
      setLoading(false);
    };

    loadAllPermissions();
  }, [authUser]);

  return (
    <PermissionsContext.Provider value={{ permissions, loading }}>
      {children}
    </PermissionsContext.Provider>
  );
};

export const usePermissions = () => {
  const context = useContext(PermissionsContext);

  if (!context)
    throw new Error("usePermissions debe usarse dentro de PermissionProvider");

  const { permissions, loading } = context;

  const hasPermission = (id: string) => {
    return permissions.includes(id);
  };

  return { hasPermission, loading, permissions };
};
