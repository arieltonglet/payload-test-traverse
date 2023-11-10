import path from "path";
import { Locale, buildConfig } from "payload/config";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { webpackBundler } from "@payloadcms/bundler-webpack";
import Users from "./collections/Users";
import { ContextType } from "payload/dist/admin/components/utilities/DocumentInfo/types";
import { RichTextAdapter } from "payload/types";
import Chapters from "./collections/Chapters";

const livePreviewUrl = ({
  data,
}: {
  data: Record<string, any>;
  documentInfo: ContextType;
  locale: Locale;
}) => `http://localhost:3000/${data.slug}`;

export default buildConfig({
  admin: {
    user: Users.slug,
    livePreview: {
      url: livePreviewUrl,
      collections: ["chapters"],
    },
    bundler: webpackBundler(),
    webpack(config) {
      const emptyModulePath = path.resolve(__dirname, "./mockModule.ts");

      return {
        ...config,
        resolve: {
          ...config.resolve,
          alias: {
            ...config.resolve?.alias,
            fs: emptyModulePath,
          },
        },
      };
    },
  },
  collections: [Users, Chapters],
  globals: [],
  typescript: {
    outputFile: path.resolve(__dirname, "../payload-types.ts"),
  },
  db: mongooseAdapter({
    url: process.env.MONGODB_URI || "",
  }),
  editor: lexicalEditor({}) as RichTextAdapter<any, any>,
  upload: {
    useTempFiles: true,
  },
});
