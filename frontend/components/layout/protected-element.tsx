import { ReactNode } from 'react';

import { Filter, hasAccess } from '@/lib/utils';
import { Session } from '@/schema/user.schema';
type Props = {
  filter?: Filter;
  session: Session | null;
  alt?: ReactNode;
  children: ReactNode;
};

export default function ProtectedElement({ children, alt, filter, session }: Props) {
  return hasAccess(session, filter) ? children : alt;
}
