import type { Media } from "../interfaces/media";
import { MediaCard } from "./MediaCard";

interface MediaListProps {
  items: Media[];
  hasAnyItem: boolean;
  onEdit: (item: Media) => void;
  onDelete: (id: string) => void;
}

export function MediaList({ items, hasAnyItem, onEdit, onDelete }: MediaListProps) {
  if (items.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 py-16 text-center">
        <h3 className="text-lg font-semibold text-slate-800">
          {hasAnyItem ? "Aramana uyan kayıt yok" : "Listen henüz boş"}
        </h3>
        <p className="mt-1 text-sm text-slate-500">
          {hasAnyItem
            ? "Filtreleri değiştirmeyi dene."
            : "“Yeni ekle” butonuyla ilk kitabını veya filmini ekle."}
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <MediaCard key={item.id} item={item} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
}