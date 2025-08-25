// src/stories/DataTable.stories.tsx
import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { DataTable, Column } from "../component/DataTable";

interface User {
  id: number;
  name: string;
  age: number;
  email: string;
}

const columns: Column<User>[] = [
  { key: "name", title: "Name", dataIndex: "name", sortable: true },
  { key: "age", title: "Age", dataIndex: "age", sortable: true },
  { key: "email", title: "Email", dataIndex: "email" },
];

const data: User[] = [
  { id: 1, name: "Ansh Soni", age: 21, email: "ansh@example.com" },
  { id: 2, name: "Riya Sharma", age: 22, email: "riya@example.com" },
  { id: 3, name: "Aman Verma", age: 20, email: "aman@example.com" },
];

const meta: Meta<typeof DataTable<User>> = {
  title: "Components/DataTable",
  component: DataTable<User>,
};
export default meta;

type Story = StoryObj<typeof DataTable<User>>;

export const Default: Story = {
  args: {
    data,
    columns,
    loading: false,
    selectable: true,
  },
};

export const Loading: Story = {
  args: {
    data: [],
    columns,
    loading: true,
  },
};

export const Empty: Story = {
  args: {
    data: [],
    columns,
    loading: false,
  },
};
