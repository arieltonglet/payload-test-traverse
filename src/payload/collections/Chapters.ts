import { CollectionConfig } from "payload/types";
import { loggedIn } from "../access/loggedIn";
import beforeChangeChapter from "../hooks/beforeChangeChapter";

const Chapters: CollectionConfig = {
  slug: "chapters",
  admin: {
    useAsTitle: "title",
  },
  access: {
    read: loggedIn,
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      unique: true,
    },
    {
      name: "description",
      type: "textarea",
    },

    {
      name: "slug",
      type: "text",
      index: true,
      admin: {
        position: "sidebar",
        readOnly: true,
      },
    },
  ],
  hooks: {
    beforeChange: [beforeChangeChapter],
  },
};

export default Chapters;
