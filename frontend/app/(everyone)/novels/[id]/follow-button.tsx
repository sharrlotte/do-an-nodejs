'use client';

import { Button } from '@/components/ui/button';
import useFollow from '@/hook/use-follow';
import { BookmarkPlus } from 'lucide-react';

export default function FollowButton({ novelId }: { novelId: number }) {
  const { toggleFollow, isFollowing, isLoading } = useFollow(novelId);

  return (
    <Button className="bg-orange-500 hover:bg-orange-600 text-white" onClick={() => toggleFollow()}>
      <BookmarkPlus className="mr-2 h-4 w-4" />
      {isFollowing ? 'Dã lưu' : 'Lưu'}
    </Button>
  );
}
