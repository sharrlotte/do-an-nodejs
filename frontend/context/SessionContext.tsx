'use client';

import api from '@/api/api';
import { Session } from '@/schema/user.schema';
import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import { useInterval, useLocalStorage } from 'usehooks-ts';

export type SessionState = 'loading' | 'authenticated' | 'unauthenticated';

type SessionContextType =
  | {
      session: null;
      state: 'loading' | 'unauthenticated';
    }
  | {
      session: Session;
      state: 'authenticated';
    };

const defaultContextValue: SessionContextType & { refresh: () => void } = {
  session: null,
  state: 'loading',
  refresh: async () => {},
};

export const SessionContext = React.createContext<
  SessionContextType & {
    refresh: () => void;
  }
>(defaultContextValue);

export function useSession(): SessionContextType & { refresh: () => void } {
  const context = React.useContext(SessionContext);

  if (!context) {
    throw new Error('Can not use out side of context');
  }

  return context;
}

export function SessionProvider({ children }: { children: ReactNode }) {
  const [token] = useLocalStorage('token', '', {
    deserializer: (value) => value,
  });
  const [auth, setSession] = useState<SessionContextType>({
    state: 'loading',
    session: null,
  });

  const getSession = useCallback(
    async () =>
      api
        .get<any, { data: Session }>('/users/session')
        .then(({ data }) => data)
        .then((session) =>
          session
            ? setSession((prev) => ({
                ...prev,
                session,
                state: 'authenticated',
              }))
            : setSession((prev) => ({ ...prev, state: 'unauthenticated', session: null })),
        )
        .catch((error) => {
          setSession({
            state: 'unauthenticated',
            session: null,
          });
          console.error(error);
        }),
    [],
  );

  useEffect(() => {
    if (token) {
      getSession();
    } else {
      setSession({
        state: 'unauthenticated',
        session: null,
      });
    }
  }, [getSession, token]);

  useInterval(() => {
    getSession();
  }, 300000);

  return <SessionContext.Provider value={{ ...auth, refresh: getSession }}>{children}</SessionContext.Provider>;
}
