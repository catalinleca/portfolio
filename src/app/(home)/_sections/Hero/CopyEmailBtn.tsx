import { CopyButton } from "@/ui/shared";

interface CopyEmailBtnProps {
  email: string;
  className?: string;
}

export const CopyEmailBtn = ({ email, className }: CopyEmailBtnProps) => {
  return (
    <CopyButton text={email} className={className}>
      Email
    </CopyButton>
  );
};
