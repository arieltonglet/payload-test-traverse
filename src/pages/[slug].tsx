import React from "react";
import { useLivePreview } from "@payloadcms/live-preview-react";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { ParsedUrlQuery } from "querystring";
import getPayloadClient from "@/payload/payloadClient";
import { Chapter } from "@/payload-types";

const Chapter: React.FC<Chapter> = (initialDoc) => {
  const { data } = useLivePreview({
    serverURL: process.env.NEXT_PUBLIC_SITE_URL || "",
    depth: 2,
    initialData: initialDoc,
  });

  return (
    <>
      <h1>{data.title}</h1>
      <p>{data.description}</p>
    </>
  );
};

export default Chapter;

interface IParams extends ParsedUrlQuery {
  slug: string;
}

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const { params } = context;

  let { slug } = (params as IParams) || {};
  if (!slug) slug = "home";

  let doc = {};
  const notFound = false;

  const lowerCaseSlug = slug.toLowerCase(); // NOTE: let the url be case insensitive

  const payload = await getPayloadClient();

  const chapters = await payload.find({
    collection: "chapters",
    where: {
      slug: {
        equals: lowerCaseSlug,
      },
    },
  });
  doc = chapters.docs[0];

  if (!doc) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      ...doc,
      collection: "chapters",
    },
    notFound,
    revalidate: 3600, // in seconds
  };
};

type Path = {
  params: {
    slug: string;
  };
};

type Paths = Path[];

export const getStaticPaths: GetStaticPaths = async () => {
  const payload = await getPayloadClient();

  const chapters = await payload.find({
    collection: "chapters",
    limit: 0,
  });

  const paths: Paths = chapters.docs.map((p) => ({
    params: { slug: p.slug || "" },
  }));

  return {
    paths,
    fallback: true,
  };
};
