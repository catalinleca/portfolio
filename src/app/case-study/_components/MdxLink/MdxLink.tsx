import type { AnchorHTMLAttributes } from "react";
import { trackClick } from "@/analytics";

const isExternalHref = (href: string | undefined): boolean =>
  href != null && (href.startsWith("http://") || href.startsWith("https://"));

export const MdxLink = ({
  href,
  ...rest
}: AnchorHTMLAttributes<HTMLAnchorElement>) => {
  const externalProps = isExternalHref(href)
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <a
      href={href}
      {...externalProps}
      {...rest}
      {...trackClick("mdx_link", "case_study_body")}
    />
  );
};
