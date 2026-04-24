import React from "react";
import { usePermissions } from "../../providers/PermissionsProvider.tsx";

interface CanAccessProps {
  permission: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const CanAccess: React.FC<CanAccessProps> = ({
  permission,
  children,
  fallback = null,
}) => {
  const { hasPermission, loading } = usePermissions();

  if (loading) return null;

  if (!hasPermission(permission)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};
