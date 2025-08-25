import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { InputField } from "../component/InputField";

const meta: Meta<typeof InputField> = {
  title: "Components/InputField",
  component: InputField,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof InputField>;

export const Default: Story = {
  args: {
    label: "Username",
    placeholder: "Enter your username",
    helperText: "This will be your unique username",
    variant: "outlined",
    size: "md",
  },
};

export const Invalid: Story = {
  args: {
    label: "Password",
    placeholder: "Enter password",
    invalid: true,
    errorMessage: "Password is required",
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled Field",
    placeholder: "Can't type here",
    disabled: true,
  },
};

export const Loading: Story = {
  args: {
    label: "Loading Field",
    placeholder: "Wait...",
    loading: true,
  },
};
