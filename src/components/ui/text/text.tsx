import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";


type Variant = VariantProps<typeof textVariants>["variant"];
type Size = VariantProps<typeof textVariants>["size"];
type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";

type TextProps = React.HTMLAttributes<HTMLHeadingElement> & {
  variant?: Variant;
  size?: Size;
  tag?: HeadingLevel;
  asChild?: boolean;
};

const textVariants = cva("", {
  variants: {
    variant: {},
    size: {
      default: "text-sm",
      sm: "text-sm",
      lg: "text-lg",
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
});

const Text = React.forwardRef<HTMLHeadingElement, TextProps>(
  (
    { className, variant, size, tag: Tag = "p", asChild = false, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : Tag;
    return (
      <Comp
        ref={ref}
        className={cn(textVariants({ variant, size }), className)}
        {...props}
      />
    );
  }
);

Text.displayName = "Text";

export { Text };
