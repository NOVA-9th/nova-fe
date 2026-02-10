import {
  Brain,
  Chrome,
  Earth,
  FileUser,
  Grid2X2Icon,
  LucideIcon,
  Newspaper,
  Settings,
  Code,
  Database,
  Network,
  Gamepad2,
  Eye,
  Shield,
  Cpu,
  TestTube,
  Blocks,
} from 'lucide-react';
import { PERSONALIZATION_TEXT } from '@/shared/data/PersonalizationText';

/**
 * 관심사 이름을 프론트엔드 표시 이름으로 변환
 * 백엔드에서 반환하는 interestName을 프론트엔드 UI에 맞게 변환
 */
export const mapInterestNameToDisplay = (backendName: string): string => {
  const nameMap: Record<string, string> = {
    'Mobile App': '모바일 앱',
    'Web': '웹 프론트엔드',
    'Backend': '백엔드',
    'Full-stack': 'Full-stack',
    'AI/ML': 'AI & ML',
    'Blockchain': '블록체인',
    'Data Engineering': '데이터 엔지니어링',
    'Data Analysis': '데이터 분석',
    'Infra': '인프라 / DevOps',
    'Security': '정보 보안',
    'Networking': '네트워크',
    'Embedded Systems': '임베디드 시스템',
    'Game Dev': '게임 개발',
    'Computer Vision': '컴퓨터 비전 (CV)',
    'System Engineering': '시스템 개발',
    'QA': 'QA / Testing',
  };

  return nameMap[backendName] || backendName;
};

/**
 * 관심사 표시 이름에 해당하는 아이콘 반환
 */
export const getInterestIcon = (displayName: string): LucideIcon => {
  const iconMap: Record<string, LucideIcon> = {
    '모바일 앱': FileUser,
    '웹 프론트엔드': Chrome,
    '백엔드': Code,
    'Full-stack': Blocks,
    'AI & ML': Brain,
    '블록체인': Database,
    '데이터 엔지니어링': Database,
    '데이터 분석': Brain,
    '인프라 / DevOps': Settings,
    '정보 보안': Shield,
    '네트워크': Network,
    '임베디드 시스템': Cpu,
    '게임 개발': Gamepad2,
    '컴퓨터 비전 (CV)': Eye,
    '시스템 개발': Settings,
    'QA / Testing': TestTube,
    '전체': Grid2X2Icon,
  };

  return iconMap[displayName] || Grid2X2Icon;
};

/**
 * 관심사 ID로 프론트엔드 표시 이름 찾기
 */
export const getInterestDisplayNameById = (interestId: number): string | null => {
  const index = PERSONALIZATION_TEXT.sections.interests.ids.indexOf(interestId);
  if (index === -1) return null;
  return PERSONALIZATION_TEXT.sections.interests.options[index];
};


