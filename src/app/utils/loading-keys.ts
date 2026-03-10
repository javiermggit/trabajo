export function hasLoadingKey(set: Set<string>, key: string | null | undefined): boolean {
  return !!key && set.has(key);
}

export function setLoadingKey(set: Set<string>, key: string | null | undefined, on: boolean): void {
  if (!key) return;
  if (on) {
    set.add(key);
  } else {
    set.delete(key);
  }
}

