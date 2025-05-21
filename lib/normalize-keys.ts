export const toCamelCase = (str: string) => {
  return str
    .replace(/(?:^|\s|_)(\w)/g, (_, c) => c.toUpperCase())
    .replace(/^\w/, (c) => c.toLowerCase());
};

export const normalizeKeys = (account: Record<string, any>) => {
  const normalized: Record<string, any> = {};
  for (const key in account) {
    normalized[toCamelCase(key.trim())] = account[key];
  }
  return normalized;
};
