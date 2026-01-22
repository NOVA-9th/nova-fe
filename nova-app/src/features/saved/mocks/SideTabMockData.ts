import { Brain, Chrome, Earth, FileUser, Grid2X2Icon, LucideIcon, Newspaper, Settings } from "lucide-react";


export const SideTabCollectionMockData: {
  id: number;
  icon: LucideIcon;
  peak: boolean;
  label: string;
  value: number;
}[] = [
  {
    id: 1,
    icon: Grid2X2Icon,
    peak: true,
    label: '전체',
    value: 5,
  },
  {
    id: 2,
    icon: Brain,
    peak: false,
    label: 'AI / ML',
    value: 5,
  },
  {
    id: 3,
    icon: Chrome,
    peak: false,
    label: '웹 프론트엔드',
    value: 5,
  },
  {
    id: 4,
    icon: Settings,
    peak: false,
    label: '인프라 / DevOps',
    value: 5,
  },
];

export const SavedStaticsMockData: {
  id: number;
  icon: LucideIcon;
  label: string;
  value: number;
}[] = [
  {
    id: 1,
    icon: Grid2X2Icon,
    label: '전체',
    value: 5,
  },
  {
    id: 2,
    icon: Newspaper,
    label: 'AI / ML',
    value: 2,
  },
  {
    id: 3,
    icon: FileUser,
    label: '웹 프론트엔드',
    value: 1,
  },
  {
    id: 4,
    icon: Earth,
    label: '인프라 / DevOps',
    value: 1,
  },
];