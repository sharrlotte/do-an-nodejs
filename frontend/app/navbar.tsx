import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";

  export function Navbar() {
    const categories = ["Romcom", "Fantasy", "Shojo", "Shonen", "Gyoro", "Horror", "Adventure"];
    const ranking = ["Top ngày", "Top Tuần", "Top Tháng", "Đỉnh của chóp"];

    return (
      <Menubar className="flex justify-center items-center p-2">

        <MenubarMenu>
          <MenubarTrigger className="hover:bg-gray-200 transition-colors px-4 py-2 rounded-md font-bold">Thể Loại</MenubarTrigger>
          <MenubarContent className="items-center flex flex-row flex-wrap w-60 p-2">
          {categories.map((category, index) => (
            <MenubarItem key={index} className="px-3 py-1">
              {category}
            </MenubarItem>
          ))}
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger className="hover:bg-gray-200 transition-colors px-4 py-2 rounded-md font-bold">Xếp Hạng</MenubarTrigger>
          <MenubarContent className="items-center flex flex-row flex-wrap p-2">
          {ranking.map((ranking, index) => (
            <MenubarItem key={index} className="px-3 py-1">
              {ranking}
            </MenubarItem>
          ))}
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger className="hover:bg-gray-200 transition-colors px-4 py-2 rounded-md font-bold">
            <a href="/history">Lịch Sử</a>
          </MenubarTrigger>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger className="hover:bg-gray-200 transition-colors px-4 py-2 rounded-md font-bold">
            <a href="/follow">Theo Dõi</a>
          </MenubarTrigger>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger className="hover:bg-gray-200 transition-colors px-4 py-2 rounded-md font-bold">
            <a href="/fanpage">Fanpage</a>
          </MenubarTrigger>
        </MenubarMenu>
      </Menubar>
    )
  }
  