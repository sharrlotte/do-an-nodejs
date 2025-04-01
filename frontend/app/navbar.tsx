import { Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem } from '@/components/ui/menubar';
import { List, Star, Clock, Bookmark, Users } from 'lucide-react';

export function Navbar() {
  const categories = ['Romcom', 'Fantasy', 'Shojo', 'Shonen', 'Gyoro', 'Horror', 'Adventure'];
  const ranking = ['Top View', 'Top Rated', 'Newest', 'Trending'];

  return (
    <Menubar className="w-full flex gap-4 justify-center">
      <MenubarMenu>
        <MenubarTrigger className="hover:bg-accent hover:text-accent-foreground px-4 py-2 rounded-md font-semibold flex items-center">
          <List size={20} className="pr-2" /> Thể Loại
        </MenubarTrigger>
        <MenubarContent className="items-center flex flex-row flex-wrap w-60 p-2">
          {categories.map((category, index) => (
            <MenubarItem key={index} className="px-3 py-1">
              {category}
            </MenubarItem>
          ))}
        </MenubarContent>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger className="hover:bg-accent hover:text-accent-foreground px-4 py-2 rounded-md font-semibold flex items-center">
          <Star size={20} className="pr-2" /> Xếp Loại
        </MenubarTrigger>
        <MenubarContent className="items-center flex flex-row flex-wrap p-2">
          {ranking.map((rank, index) => (
            <MenubarItem key={index} className="px-3 py-1">
              {rank}
            </MenubarItem>
          ))}
        </MenubarContent>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger className="hover:bg-accent hover:text-accent-foreground px-4 py-2 rounded-md font-semibold flex items-center">
          <Clock size={20} className="pr-2" /> <a href="/history">Lịch Sử</a>
        </MenubarTrigger>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger className="hover:bg-accent hover:text-accent-foreground px-4 py-2 rounded-md font-semibold flex items-center">
          <Bookmark size={20} className="pr-2" /> <a href="/follow">Theo Dõi</a>
        </MenubarTrigger>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger className="hover:bg-accent hover:text-accent-foreground px-4 py-2 rounded-md font-semibold flex items-center">
          <Users size={20} className="pr-2" /> <a href="https://www.facebook.com/CuuTruyenTranh">Fanpage</a>
        </MenubarTrigger>
      </MenubarMenu>
    </Menubar>
  );
}
