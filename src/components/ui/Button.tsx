import Link from "next/link";
import type { ComponentProps } from "react";

type Variant = "primary" | "secondary" | "highlight" | "ghost" | "danger";
type Size = "md" | "lg";

const VARIANTS: Record<Variant, string> = {
  primary: "bg-espresso text-paper hover:bg-coffee",
  secondary: "bg-manila text-ink hover:bg-manila-400 border-2 border-manila-600/60",
  highlight: "bg-postit text-ink hover:bg-postit-dark",
  ghost: "bg-transparent text-coffee hover:bg-paper-dark underline-offset-4",
  danger: "bg-evidence-dark text-paper hover:bg-[#5E1E19]",
};

const SIZES: Record<Size, string> = {
  md: "min-h-11 px-5 py-2 text-base",
  lg: "min-h-14 px-7 py-3 text-lg",
};

type Common = { variant?: Variant; size?: Size };

/**
 * Plain, obvious button. Labels should say exactly what happens (Start, Save, Next).
 * With an href it renders a Link so keyboard and screen reader behaviour stays correct.
 */
export function Button(
  props: Common & (({ href: string } & Omit<ComponentProps<typeof Link>, "className">) | ({ href?: undefined } & ComponentProps<"button">)),
) {
  const { variant = "primary", size = "md", ...rest } = props;
  const className = `inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100 ${VARIANTS[variant]} ${SIZES[size]}`;

  if ("href" in rest && rest.href !== undefined) {
    const linkProps = rest as ComponentProps<typeof Link>;
    return <Link {...linkProps} className={className} />;
  }
  const buttonProps = rest as ComponentProps<"button">;
  return <button type="button" {...buttonProps} className={className} />;
}
