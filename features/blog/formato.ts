/** "2026-08-30T16:00:00.000Z" → "30 de agosto de 2026". */
export function formatearFecha(iso: string): string {
  if (!iso) return "";

  return new Date(iso).toLocaleDateString("es-CR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
