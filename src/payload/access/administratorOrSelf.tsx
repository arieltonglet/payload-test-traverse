import { User } from "@/payload-types";
import type { Access } from "payload/config";
import type { FieldAccess } from "payload/types";

export const administratorOrSelf: Access = ({ req: { user } }) => {
  if (user) {
    if (user.roles?.includes("administrator")) {
      return true;
    }

    return {
      id: {
        equals: user.id,
      },
    };
  }

  return false;
};

export const administratorOrSelfFieldLevel: FieldAccess<
  { id: string },
  unknown,
  User
> = ({ req: { user }, id }) => {
  // Return true or false based on if the user has an admin role
  if (user?.roles?.includes("admin")) return true;
  if (user?.id === id) return true;
  return false;
};
