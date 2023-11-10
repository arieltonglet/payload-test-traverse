import { User } from "@/payload-types";
import type { Access, FieldAccess } from "payload/types";

export const administrator: Access<any, User> = ({ req: { user } }) => {
  return Boolean(user?.roles?.includes("administrator"));
};

export const administratorFieldLevel: FieldAccess<
  { id: string },
  unknown,
  User
> = ({ req: { user } }) => {
  // Return true or false based on if the user has an admin role
  return Boolean(user?.roles?.includes("administrator"));
};
