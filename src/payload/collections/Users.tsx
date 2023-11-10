import { CollectionConfig } from "payload/types";
import {
  administrator,
  administratorFieldLevel,
} from "../access/administrator";
import {
  administratorOrSelf,
  administratorOrSelfFieldLevel,
} from "../access/administratorOrSelf";

const Users: CollectionConfig = {
  auth: true,
  slug: "users",
  admin: {
    useAsTitle: "email",
    group: "Admin",
  },
  fields: [
    {
      name: "roles",
      type: "select",
      required: true,
      defaultValue: ["visitor"],
      options: ["administrator", "editor", "visitor"],
      access: {
        read: administratorOrSelfFieldLevel,
        create: administratorFieldLevel,
        update: administratorFieldLevel,
      },
    },
  ],
  access: {
    create: administrator,
    read: () => true,
    update: administratorOrSelf,
    delete: administratorOrSelf,
  },
};

export default Users;
