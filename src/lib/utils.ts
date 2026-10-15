/** Minimal `cn`: joins truthy class fragments. No clsx/tailwind-merge dependency needed here. */
export function cn(...inputs: Array<string | false | null | undefined | 0>) {
  return inputs.filter(Boolean).join(" ");
}
