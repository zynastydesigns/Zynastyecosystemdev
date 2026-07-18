let counter = 0;

/** Simple, dependency-free unique id generator. Swap for uuid/nanoid if needed. */
export function generateId(prefix: string): string {
  counter += 1;
  const rand = Math.random().toString(36).slice(2, 8);
  return `${prefix}_${Date.now().toString(36)}${rand}${counter}`;
}

export function nextProjectCode(existingCount: number): string {
  const year = new Date().getFullYear().toString().slice(-2);
  const seq = (23000 + existingCount + 1).toString();
  return `ZYN-${year}${seq.slice(-3)}`;
}
