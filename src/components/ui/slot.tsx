import * as React from "react";

/**
 * Minimal `Slot` implementation (no Radix dependency).
 * Merges its props onto the single child element, enabling the `asChild` pattern.
 */
export const Slot = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ children, ...props }, ref) => {
    if (!React.isValidElement(children)) return null;
    return React.cloneElement(children, {
      ...props,
      ...(children.props as Record<string, unknown>),
      ref,
      className: [props.className, (children.props as { className?: string }).className]
        .filter(Boolean)
        .join(" "),
    } as React.HTMLAttributes<HTMLElement> & { ref?: React.Ref<HTMLElement> });
  }
);
Slot.displayName = "Slot";
