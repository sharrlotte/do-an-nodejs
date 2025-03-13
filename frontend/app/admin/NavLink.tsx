import React from 'react';
import Link from 'next/link';
import { ReactNode } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

type Props = {
  href: { name: string; href: string }[] | string;
  name: string;
  icon: ReactNode;
};

export default function NavLink({ href, name, icon }: Props) {
  if (typeof href === 'string')
    return (
      <Link href={href} className="flex gap-4 items-center p-2 rounded-md">
        {icon}
        <div>{name}</div>
      </Link>
    );

  return (
    <div className="flex gap-4 p-2 items-start rounded-md" key={name}>
      {icon}
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1" className="border-none max-w-full overflow-hidden gap-4 grid">
          <AccordionTrigger className="p-0 font-bold text-lg gap-2 hover:no-underline">{name}</AccordionTrigger>
          {href.map((item) => (
            <AccordionContent key={item.href}>
              <Link href={item.href}>{item.name}</Link>
            </AccordionContent>
          ))}
        </AccordionItem>
      </Accordion>
    </div>
  );
}
