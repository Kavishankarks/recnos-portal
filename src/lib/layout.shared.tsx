import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: "RECNOS Docs",
      url: "/docs",
    },
    links: [{ text: "recnos.com", url: "/" }],
  };
}
