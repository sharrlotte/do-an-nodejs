'use client';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useSession } from '@/context/SessionContext';
import useComments from '@/hook/use-comments';
import useCreateComment from '@/hook/use-create-coimment';
import useUser from '@/hook/use-user';
import { Comment } from '@/schema/comment.schema';
import { SendIcon } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

type CommentSectionProps = {
  chapterId?: number;
  novelId: number;
};

export default function CommentSection({ novelId, chapterId }: CommentSectionProps) {
  const [content, setContent] = useState<string>('');
  const { mutate, isPending } = useCreateComment(novelId, chapterId);
  const { state } = useSession();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate(content);
    setContent('');
  };

  return (
    <div className="border-t pt-6 space-y-2">
      <div>Bình luận</div>
      <form className="flex gap-1" onSubmit={handleSubmit}>
        <Textarea value={content} onChange={(event) => setContent(event.target.value)} />
        {state === 'unauthenticated' ? (
          <span>Bạn cần đăng nhập để bình luận</span>
        ) : (
          <Button type="submit" disabled={isPending}>
            <SendIcon size={20} />
          </Button>
        )}
      </form>
      <CommentList novelId={novelId} chapterId={chapterId}></CommentList>
    </div>
  );
}

function CommentList({ novelId, chapterId }: CommentSectionProps) {
  const { data, isLoading, isError, error } = useComments(novelId, chapterId);

  return <section className="space-y-2">{isError ? error?.message : isLoading ? <span>Đang tải</span> : data?.map((comment) => <CommentCard key={comment.id} comment={comment} />)}</section>;
}

function CommentCard({ comment }: { comment: Comment }) {
  const { userId } = comment;
  const { data, isSuccess } = useUser(userId);

  if (!isSuccess) {
    return <div className="w-8 h-8 rounded-full bg-gray-400"></div>;
  }

  return (
    <div className="flex gap-1 items-center">
      <div className="w-8 h-8 rounded-full bg-gray-400">
        <Image src={data?.avatar + '.png'} alt="Avatar" width={32} height={32} className="rounded-full" />
      </div>
      <div className="flex flex-col">
        <span>{data.username}</span>
        <p className="text-sm">{comment.content}</p>
      </div>
    </div>
  );
}
