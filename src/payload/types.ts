import {
  DownloadContentBlock,
  HorizontalMediaBlock,
  RelatedContentBlock,
  SpacerBlock,
  TextBlock,
  TitleBlock,
  VerticalMediaBlock,
} from "@/payload-types";

export type ContentBlock =
  | DownloadContentBlock
  | HorizontalMediaBlock
  | VerticalMediaBlock
  | RelatedContentBlock
  | SpacerBlock
  | TextBlock
  | TitleBlock;

export type SectionBlock =
  | HorizontalMediaBlock
  | VerticalMediaBlock
  | TextBlock
  | TitleBlock;
