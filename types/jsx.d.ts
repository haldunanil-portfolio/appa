import "react";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      marquee: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          scrollamount?: number;
          direction?: "left" | "right" | "up" | "down";
          behavior?: "scroll" | "slide" | "alternate";
        },
        HTMLElement
      >;
    }
  }
}
