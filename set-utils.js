export const difference = (a, b) => new Set([...a].filter(x => !b.has(x)));

export const unionObjectKeys = (...args) => new Set(args.flatMap(Object.keys));
