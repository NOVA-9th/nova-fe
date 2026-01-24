import { LucideIcon } from 'lucide-react';

export type SideItem = {
  href: string;
  title: string;
  description: string;
  icon: LucideIcon;
  badge?: string;
};
