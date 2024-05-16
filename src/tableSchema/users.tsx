import { Settings2, User2Icon, Users } from "lucide-react";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/table/DataTableColumnHeader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { DataFilterProps } from "@/components/table/type";
import { UserProps } from "@/interfaces/users";
import { startCase } from "lodash";
import { GENDER_OPTIONS, ROLE_OPTIONS, USER_STATUS_OPTIONS } from "@/utils";

export const userTableFilters: DataFilterProps[] = [
  {
    column: "role",
    options: ROLE_OPTIONS,
    title: "Role",
    extra: {
      mainIcon: User2Icon
    }
  },
  {
    column: "gender",
    options: GENDER_OPTIONS,
    title: "Gender",
    extra: {
      mainIcon: Users
    }
  },
  {
    column: "status",
    options: USER_STATUS_OPTIONS,
    title: "Status",
    extra: {
      mainIcon: Settings2
    }
  }
];

export const usersTableSchema: ColumnDef<UserProps>[] = [
  {
    id: "avatar",
    cell: ({ row: { original } }) => (
      <Avatar className="h-8 w-8 outline-none">
        <AvatarImage src="https://github.com/shadcn.png" alt="Avatar" />
        <AvatarFallback>{`${original.firstName?.[0]}${original.lastName?.[0]}`.toUpperCase()}</AvatarFallback>
      </Avatar>
    )
  },
  {
    accessorKey: "firstName",
    header: ({ column }) => <DataTableColumnHeader column={column} title="First name" />,
    cell: ({ row }) => <div className="flex space-x-2">{row.getValue("firstName")}</div>,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    }
  },
  {
    accessorKey: "lastName",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Last name" />,
    cell: ({ row }) => {
      return <div className="flex space-x-2">{row.getValue("lastName")}</div>;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    }
  },
  {
    accessorKey: "email",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Email" />,
    cell: ({ row }) => {
      return <div className="flex space-x-2">{row.getValue("email")}</div>;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    }
  },
  {
    accessorKey: "gender",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Gender" />,
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="truncate font-medium">{startCase(row.getValue("gender"))}</span>
        </div>
      );
    }
  },
  {
    accessorKey: "role",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Role" />,
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="truncate font-medium">{startCase(row.getValue("role"))}</span>
        </div>
      );
    }
  },
  {
    accessorKey: "status",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => {
      const statusFiltered = USER_STATUS_OPTIONS.find((stat) => stat.value === row.getValue("status"))?.label;
      return <div className="flex items-center">{statusFiltered}</div>;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    }
  }
];
