import { useRef, type ReactNode, type ElementType, type ComponentPropsWithoutRef } from "react";

type MagneticButtonProps<T extends ElementType> = {
  as?: T;
  strength?: number;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children">;

/**
 * Wraps any element with a subtle pointer-following transform.
 * Disabled on touch devices and when prefers-reduced-motion is set.
 */
export function MagneticButton<T extends ElementType = "div">({
  as,
  strength = 0.25,
  children,
  ...rest
}: MagneticButtonProps<T>) {
  const Tag = (as || "div") as ElementType;
  const ref = useRef<HTMLElement | null>(null);

  const handleMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * strength;
    const y = (e.clientY - rect.top - rect.height / 2) * strength;
    el.style.transform = `translate(${x}px, ${y}px)`;
  };

  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate(0, 0)";
  };

  return (
    <Tag
      ref={ref as never}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      style={{ transition: "transform 0.25s cubic-bezier(0.22, 1, 0.36, 1)", display: "inline-flex" }}
      {...rest}
    >
      {children}
    </Tag>
  );
}