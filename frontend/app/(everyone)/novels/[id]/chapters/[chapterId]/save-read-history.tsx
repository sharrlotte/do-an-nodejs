'use client';

import api from '@/api/api';
import useLocalHistory from '@/hook/use-local-history';
import { useQuery } from '@tanstack/react-query';

type SaveReadHistoryProps = {
  novelId: number;
  chapterId: number;
};

export default function SaveReadHistory({ novelId, chapterId }: SaveReadHistoryProps) {
  const { history, setHistory } = useLocalHistory();

  useQuery({
    queryKey: ['read-history', novelId, chapterId],
    queryFn: () => {
      try {
        if (history[novelId] ?? -1 < chapterId) {
          history[novelId] = chapterId;
          setHistory(history);
        }
      } catch (error) {
        setHistory({ [novelId]: chapterId });
      }

      return api.get(`/novels/${novelId}/chapters/${chapterId}/read`);
    },
  });

  return <></>;
}
