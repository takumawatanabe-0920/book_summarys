import dayjs from 'dayjs';
import { useLocation } from 'react-router-dom';
export const formatUpdateDate = (date: Date & { seconds?: any }) => {
  const dateTime = date.seconds;
  const messageTime = dateTime ? dayjs.unix(dateTime).format('MM/DD') : '';
  const now = new Date();
  const nowTime = Math.floor(now.getTime() / 1000);
  let diffTime = nowTime - dateTime;
  const diffDays = Math.floor(diffTime / 86400);

  diffTime -= diffDays * 86400;
  const diffHours = Math.floor(diffTime / 3600) % 24;
  diffTime -= diffHours * 3600;
  const diffMinutes = Math.floor(diffTime / 60) % 60;
  diffTime -= diffMinutes * 60;

  if (diffDays >= 7) {
    return messageTime;
  } else if (0 < diffDays) {
    return `${diffDays}日前`;
  } else if (diffDays === 0) {
    if (diffHours > 0) {
      return `${diffHours}時間前`;
    } else {
      return `${diffMinutes}分前`;
    }
  }
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
