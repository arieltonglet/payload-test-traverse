import { CollectionBeforeChangeHook } from "payload/types";
import slugify from "../utils/slugify";

const beforeChangeChapter: CollectionBeforeChangeHook = async ({ data }) => {
  // Chapter slug
  data.slug = slugify(data.title);
  return data;
};

export default beforeChangeChapter;
