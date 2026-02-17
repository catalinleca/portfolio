"use client";

import type { AnchorHTMLAttributes, MouseEvent } from "react";

type ScrollLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
};

export const ScrollLink = ({ href, onClick, ...rest }: ScrollLinkProps) => {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    const id = href.replace(/^\/?#/, "");
    const el = document.getElementById(id);

    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: "smooth" });
      history.replaceState(null, "", `#${id}`);
    } else {
      e.preventDefault();
      window.location.href = `/#${id}`;
    }

    onClick?.(e);
  };

  return <a href={href} onClick={handleClick} {...rest} />;
};
