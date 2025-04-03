import { HISTORY_PERSISTENT_KEY } from '@/constant/constant';
import { useLocalStorage } from 'usehooks-ts';

type LocalReadHistory = Record<number, number>;

export default function useLocalHistory() {
  const [history, setHistory] = useLocalStorage(
    HISTORY_PERSISTENT_KEY,
    {},
    {
      deserializer: (value) => {
        try {
          return JSON.parse(value) as LocalReadHistory;
        } catch (error) {
          return {};
        }
      },
    },
  );

  return { history, setHistory };
}
