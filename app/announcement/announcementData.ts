// @/app/announcement/announcementData.ts

export type AnnouncementCategory =
  | "活動訊息"
  | "OIA"
  | "學術活動"
  | "精選訊息"
  | "行政事務";

export interface AnnouncementItem {
  id: number;
  category: AnnouncementCategory;
  title_zh: string;
  title_en: string;
  url_zh: string;
  url_en: string;
  content: string;
  content_en: string;
  publish_date: string;
}

export interface CategoryCardConfig {
  key: AnnouncementCategory;
  title: string;
  subtitle: string;
  imageSrc?: string;
}