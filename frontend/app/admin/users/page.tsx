'use client';

import * as React from 'react';
import { ColumnDef, ColumnFiltersState, SortingState, VisibilityState, flexRender, getCoreRowModel, getFilteredRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { searchParamsSchema } from '@/schema/pagination.schema';
import PageSelector from '@/components/common/PageSelector';
import { User } from '@/schema/user.schema';
import { getUsers, updateUser } from '@/api/user.api';
import { UserRole, userRoles } from '@/constant/enum';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { useState } from 'react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';

const columns: ColumnDef<User>[] = [
  {
    id: 'select',
    header: ({ table }) => <Checkbox checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')} onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)} aria-label="Select all" />,
    cell: ({ row }) => <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} aria-label="Select row" />,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'username',
    header: ({ column }) => {
      return (
        <Button className="p-0" variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Tên
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue('username')}</div>,
  },
  {
    accessorKey: 'roles',
    header: () => <div>Mô tả</div>,
    cell: ({ row }) => {
      return (
        <div className="font-medium px-0 flex gap-1">
          <UserRolePicker user={row.original} />
        </div>
      );
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end"></DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default function Page() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const params = useSearchParams();
  const page = searchParamsSchema.parse(Object.fromEntries(params)).page;
  const [filter, setFilter] = useState<UserRole>('USER');

  const { data, isPending } = useQuery({
    queryKey: ['users', page, filter ? filter : 'None'],
    queryFn: () => getUsers({ size: 20, page, role: filter }),
  });

  function handleFilter(data: UserRole) {
    const newParams = new URLSearchParams(params);
    newParams.set('status', data);
    window.history.replaceState({}, '', `?${newParams.toString()}`);
    setFilter(data);
  }

  const table = useReactTable({
    data: data ?? [],
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="rounded-md border w-full h-full flex flex-col p-4 shadow-xl">
      <div className="flex flex-col h-full overflow-hidden gap-2">
        <div className="flex items-center py-4 gap-2">
          <div className="font-bold flex justify-between w-full">
            <h2>Quản lý người dùng</h2>
          </div>
        </div>
        <ToggleGroup className="justify-start border rounded-md divide-x gap-0 w-fit" type="single" value={filter} onValueChange={handleFilter}>
          {userRoles.map((role) => (
            <ToggleGroupItem className="data-[state=on]:bg-blue-500 rounded-none data-[state=on]:text-white" key={role} value={role}>
              {role}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
        {isPending ? (
          <div className="w-full text-center">Đang tải</div>
        ) : (
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} className="px-4">
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody className="h-full overflow-y-auto">
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    Không có nội dung
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>
      <div className="flex items-center justify-between space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground text-nowrap">
          Đã chọn {table.getFilteredSelectedRowModel().rows.length} trên {table.getFilteredRowModel().rows.length} dòng.
        </div>
        <PageSelector className="justify-end" defaultPage={1} maxPage={100} enabled={!isPending} />
      </div>
    </div>
  );
}

type UserRolePickerProps = {
  user: User;
};
function UserRolePicker({ user }: UserRolePickerProps) {
  const [filter, setFilter] = useState<UserRole[]>(user.roles);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutate } = useMutation({
    mutationFn: async (data: UserRole[]) => updateUser(user.id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['users'],
      });
    },

    onError: (error: any) => {
      switch (error.response.status) {
        default:
          toast({
            title: 'Lỗi',
            description: 'Có lỗi đã xảy ra, vui lòng thử lại sau',
            variant: 'destructive',
          });
          break;
      }
    },
  });

  function handleUpdateRole(data: UserRole[]) {
    mutate(data);
    setFilter(data);
  }

  return (
    <Dialog>
      <DialogTrigger className="flex gap-1">{user.roles.length > 0 ? user.roles.map((role) => <span key={role}>{role}</span>) : 'Không có quyền'}</DialogTrigger>
      <DialogContent>
        <ToggleGroup className="justify-start border rounded-md divide-x gap-0 w-fit" type="multiple" value={filter} onValueChange={handleUpdateRole}>
          {userRoles.length > 0
            ? userRoles.map((role) => (
                <ToggleGroupItem className="data-[state=on]:bg-blue-500 rounded-none data-[state=on]:text-white" key={role} value={role}>
                  {role}
                </ToggleGroupItem>
              ))
            : 'Không có quyền'}
        </ToggleGroup>
      </DialogContent>
    </Dialog>
  );
}
