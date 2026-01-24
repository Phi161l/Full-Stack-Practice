type Role = "admin" | "user";

export const rolePermission: Record<Role, string[]> = {
    admin: ["dashboard", "users", "logs"],
    user: ["dashboard"],
}

export function hasPermission(role:Role, permission: string) : boolean{
    return rolePermission[role]?.includes(permission);
}