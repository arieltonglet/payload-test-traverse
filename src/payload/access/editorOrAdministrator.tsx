import { User } from "@/payload-types";
import type { Access, FieldAccess } from "payload/types";

export const editorOrAdministrator: Access<any, User> = ({ req: { user } }) => {
  return Boolean(
    user?.roles?.includes("editor") || user?.roles?.includes("administrator")
  );
};

export const editorOrAdministratorFieldLevel: FieldAccess<
  { id: string },
  unknown,
  User
> = ({ req: { user } }) => {
  return Boolean(
    user?.roles?.includes("editor") || user?.roles?.includes("administrator")
  );
};
