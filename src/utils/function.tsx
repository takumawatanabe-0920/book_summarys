import dayjs from 'dayjs';
import { useLocation } from 'react-router-dom';

export const formatUpdateDate = (date: Date) => {
  return dayjs(date).format('MM/DD HH:mm');
};

export const formatTagColor = (_categoryName: string): string => {
  switch (_categoryName) {
    case 'スポーツ':
      return 'sport-tag';
    case '自然界':
      return 'nature-tag';
    case '小説':
      return 'novel-tag';
    case 'ビジネス':
      return 'business-tag';
    case '雑誌':
      return 'magazin-tag';
    default:
      return 'all-tag';
  }
};

export const readQuery = (key?: string): string => {
  return new URLSearchParams(useLocation().search).get(key);
};
