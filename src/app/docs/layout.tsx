import { source } from "@/lib/source";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { RootProvider } from "fumadocs-ui/provider/next";
import { baseOptions } from "@/lib/layout.shared";

export default function Layout({ children }: LayoutProps<"/docs">) {
  return (
    <RootProvider theme={{ forcedTheme: "dark", defaultTheme: "dark" }}>
      <DocsLayout tree={source.getPageTree()} {...baseOptions()}>
        {children}
      </DocsLayout>
    </RootProvider>
  );
}
