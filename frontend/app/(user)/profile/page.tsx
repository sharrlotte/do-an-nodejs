import { getAuthSession } from '@/api/auth-server.api';
import { getProfile } from '@/api/user.server-api';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import React from 'react';

export default async function page() {
  const session = await getAuthSession();
  const profile = await getProfile(session.id);

  return (
    <div className="flex h-full overflow-auto p-4">
      <div className="w-1/3">
        <div className="p-4 g-2">
          <Card className=" p-4 items-center flex-col">
            <CardHeader className="flex-col items-center gap-2">
              <Avatar className="h-24 w-24">
                <AvatarImage className="rounded-full h-24 w-24" src={profile.avatar + '.png'} alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <CardTitle>{profile.username}</CardTitle>
              <CardDescription>Deploy your new project in one-click.</CardDescription>
              <Separator orientation="vertical" />
              <Button>Cập nhật</Button>
              <Link href="/account/change-password">Thay đôi mật khẩu</Link>
            </CardHeader>
          </Card>
        </div>
        <div className="p-4 g-2">
          <Card className=" p-4 items-center flex-col">
            <CardHeader className="flex-col items-center gap-2">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Mô tả</AccordionTrigger>
                  <AccordionContent>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline">Edit Profile</Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Chỉnh sửa Mô tả</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                              Nội dung
                            </Label>
                            <Input id="name" defaultValue="" className="col-span-3" />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button type="submit">Lưu thay đổi</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Ngôn ngữ</AccordionTrigger>
                  <AccordionContent>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline">Edit</Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Chỉnh sửa ngôn ngữ</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                              Nội dung
                            </Label>
                            <Input id="name" defaultValue="" className="col-span-3" />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                              Level
                            </Label>
                            <Select>
                              <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Độ thông thạo" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel>Level</SelectLabel>
                                  <SelectItem value="apple">Phổ thông</SelectItem>
                                  <SelectItem value="banana">Thông thạo</SelectItem>
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <DialogFooter>
                          <Button type="submit">Lưu thay đổi</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Kỹ năng</AccordionTrigger>
                  <AccordionContent>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline">Edit</Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Thêm kỹ năng</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                              Nội dung
                            </Label>
                            <Input id="name" defaultValue="" className="col-span-3" />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button type="submit">Lưu thay đổi</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardHeader>
          </Card>
        </div>
      </div>
      <div className="w-2/3">
        <div className="p-4 g-2">
          <Card className=" p-4 items-center flex-col">
            <CardHeader className="flex-col items-center gap-2">
              <CardDescription>Trong</CardDescription>
              <Separator orientation="vertical" />
              <Button className="bg-green-500">Become a seller</Button>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  );
}
