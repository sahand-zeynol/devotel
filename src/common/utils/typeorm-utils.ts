export async function findOrCreate<T>(
  repo: any,
  where: Partial<T>,
  defaults: Partial<T> = {}
): Promise<[T, boolean]> {
  const existing = await repo.findOne({ where });
  if (existing) return [existing, false];
  const created = repo.create({ ...where, ...defaults });
  return [await repo.save(created), true];
}
