'use client';

import Link from 'next/link';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { cn } from '@/lib/utils';
import rehypeSanitize from 'rehype-sanitize';
import env from '@/constant/env';
interface MarkdownProps {
  className?: string;
  children: string;
}

function RouterLink({ href, children }: any) {
  return href.match(/^(https?:)?\/\//) ? (
    <a className="text-emerald-500" href={href} target="_blank" rel="noreferrer">
      {children}
    </a>
  ) : (
    <Link href={href}>{children}</Link>
  );
}

function MarkdownImage({ src, alt }: any) {
  if (src && src.includes('res.cloudinary.com')) {
    src = src.replace('http://localhost:3000/', '');
  } else if (src && src.includes(env.url.base)) {
    src = 'blob:' + src;
  }

  // eslint-disable-next-line @next/next/no-img-element
  return <img className="markdown-image" alt={alt} src={src} />;
}

export default function Markdown({ className, children }: MarkdownProps) {
  return (
    <ReactMarkdown className={cn('markdown', className)} components={{ a: RouterLink, img: MarkdownImage }} rehypePlugins={[rehypeSanitize]}>
      {children}
    </ReactMarkdown>
  );
}
