import type { ComponentProps } from "react";
import { CopyButton } from "@/ui/shared";

type CopyEmailBtnProps = Omit<ComponentProps<typeof CopyButton>, "text" | "children"> & {
  email: string;
};

export const CopyEmailBtn = ({ email, ...rest }: CopyEmailBtnProps) => {
  return (
    <CopyButton text={email} {...rest}>
      Email
    </CopyButton>
  );
};
