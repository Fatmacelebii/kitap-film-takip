import type { MediaStatus, MediaType } from "../interfaces/media";

export const typeLabel: Record<MediaType, string> = {
  book: "Kitap",
  movie: "Film",
};

export const creatorLabel: Record<MediaType, string> = {
  book: "Yazar",
  movie: "Yönetmen",
};

// Duruma verilen ad, türe göre değişir (okunacak / izlenecek)
export function statusLabel(type: MediaType, status: MediaStatus): string {
  const labels: Record<MediaType, Record<MediaStatus, string>> = {
    book: { planned: "Okunacak", inProgress: "Okunuyor", done: "Bitti" },
    movie: { planned: "İzlenecek", inProgress: "İzleniyor", done: "İzlendi" },
  };
  return labels[type][status];
}

export const statusColor: Record<MediaStatus, string> = {
  planned: "bg-slate-100 text-slate-700",
  inProgress: "bg-amber-100 text-amber-800",
  done: "bg-emerald-100 text-emerald-800",
};