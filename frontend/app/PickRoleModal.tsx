import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { useSession } from '@/context/SessionContext';
import React from 'react';

export default function PickRoleModal() {
  const { session } = useSession();

  const open = !!session && !session.rolePicked;

  return (
    <Dialog open={open}>
      <DialogTitle>Bạn đang tìm kiếm điều gì?</DialogTitle>
      <DialogContent></DialogContent>
    </Dialog>
  );
}
