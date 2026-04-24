import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuthentication } from "./AuthenticationProvider.tsx";
import { fetchRole } from "../firebase/collections/rolesAndPermissons.ts";

const PermissionsContext = createContext({
  permissions: [],
  loading: false,
});

export const PermissionsProvider = ({ children }: { children: ReactNode }) => {
  const { authUser } = useAuthentication();
  const [permissions, setPermissions] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAllPermissions = async () => {
      setLoading(true);
      if (authUser) {
        try {
          const roleData = await fetchRole(authUser.role);
          const rolePerms = roleData?.permissions || [];

          const finalPerms = [
            ...new Set([...rolePerms, ...(authUser.extraPermissions || [])]),
          ];
          setPermissions(finalPerms);
        } catch (error) {
          console.error("Error cargando permisos:", error);
          setPermissions([]);
        }
      } else {
        setPermissions([]);
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
