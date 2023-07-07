export function exclude<Obj, Key extends keyof Obj>(
  user: Obj,
  keys: Key[],
): Omit<Obj, Key> {
  // @ts-ignore
  return Object.fromEntries(
    Object.entries(user).filter(([key]) => !keys.includes(key as Key)),
  );
}
