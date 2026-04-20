import type { MDXComponents } from "mdx/types";

export const mdxComponents: MDXComponents = {
  h2: (props) => (
    <h2
      {...props}
      id={
        typeof props.children === "string"
          ? props.children
              .toLowerCase()
              .replace(/[^a-z0-9가-힣\s-]/g, "")
              .replace(/\s+/g, "-")
          : undefined
      }
    />
  ),
  h3: (props) => (
    <h3
      {...props}
      id={
        typeof props.children === "string"
          ? props.children
              .toLowerCase()
              .replace(/[^a-z0-9가-힣\s-]/g, "")
              .replace(/\s+/g, "-")
          : undefined
      }
    />
  ),
  a: (props) => (
    <a {...props} target="_blank" rel="noopener noreferrer" />
  ),
  pre: (props) => (
    <pre {...props} className="overflow-x-auto rounded-lg" />
  ),
};
