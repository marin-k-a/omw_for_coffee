import { defineCollection, z } from "astro:content";
import { feedLoader } from "@ascorbic/feed-loader";

// Define the post collection
const postCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    dateFormatted: z.string(),
  }),
});

// Define the releases collection
const releases = defineCollection({
  loader: feedLoader({
    url: "https://github.com/withastro/astro/releases.atom",
  }),
});

// Define the podcasts collection
const podcasts = defineCollection({
  loader: feedLoader({
    url: "https://anchor.fm/s/f887d5f4/podcast/rss",
  }),
});

// Combine all collections into a single export
export const collections = {
  post: postCollection,
  releases: releases,
  podcasts: podcasts,
};