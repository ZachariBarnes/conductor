import React, { AnchorHTMLAttributes } from "react";

interface AppLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
}

export function AppLink({ children, ...props }: AppLinkProps) {
  return (
    <a className="text-blue-600 hover:text-blue-800" {...props}>
      {children}
    </a>
  );
}
