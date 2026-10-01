import Link from "next/link";
import type { ComponentProps } from "react";

type Variant = "primary" | "secondary" | "highlight" | "ghost" | "danger";
type Size = "md" | "lg";

/*
  Buttons are small slabs of material, not outlined boxes: the edge comes from a darker underside
  and a tight shadow. Primary actions are evidence red, the one accent that says "do this".
*/
const LIFT = "shadow-[inset_0_-2px_0_rgb(36_25_19/0.28),0_1px_2px_rgb(36_25_19/0.3)]";
const VARIANTS: Record<Variant, string> = {
  primary: `bg-evidence text-paper hover:bg-evidence-dark ${LIFT}`,
  secondary: `bg-manila text-ink hover:bg-manila-400 ${LIFT}`,
  highlight: `bg-postit text-ink hover:bg-postit-dark ${LIFT}`,
  ghost: "bg-transparent text-evidence-dark underline decoration-1 underline-offset-4 hover:bg-paper-dark",
  danger: `bg-evidence-dark text-paper hover:bg-[#5E1E19] ${LIFT}`,
};

const SIZES: Record<Size, string> = {
  md: "min-h-11 px-6 py-2 text-base",
  lg: "min-h-14 px-8 py-4 text-lg",
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
  const className = `inline-flex items-center justify-center gap-2 rounded-[3px] font-semibold transition active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100 ${VARIANTS[variant]} ${SIZES[size]}`;

  if ("href" in rest && rest.href !== undefined) {
    const linkProps = rest as ComponentProps<typeof Link>;
    return <Link {...linkProps} className={className} />;
  }
  const buttonProps = rest as ComponentProps<"button">;
  return <button type="button" {...buttonProps} className={className} />;
}
