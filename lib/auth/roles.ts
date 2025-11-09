import { type Role } from "@/lib/types";

export const roleLabels: Record<Role, string> = {
  foundation_admin: "Vakıf Admin",
  foundation_editor: "Vakıf Editör",
  foundation_viewer: "Vakıf İzleyici",
  guardian: "Veli",
};

export const foundationRoles: Role[] = ["foundation_admin", "foundation_editor", "foundation_viewer"];
