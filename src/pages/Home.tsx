import { useMemo, useState } from "react";
import { FilterBar } from "../components/FilterBar";
import { MediaForm } from "../components/MediaForm";
import { MediaList } from "../components/MediaList";
import { useMedia } from "../hooks/useMedia";
import type { Filters, Media, MediaFormData } from "../interfaces/media";

export function Home() {
  const { items, addItem, updateItem, deleteItem } = useMedia();
  const [filters, setFilters] = useState<Filters>({
    search: "",
    type: "all",
    status: "all",
  });
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editing, setEditing] = useState<Media | null>(null);

  const filtered = useMemo(() => {
    const q = filters.search.trim().toLowerCase();
    return items.filter(
      (m) =>
        (filters.type === "all" || m.type === filters.type) &&
        (filters.status === "all" || m.status === filters.status) &&
        (q === "" ||
          m.title.toLowerCase().includes(q) ||
          m.creator.toLowerCase().includes(q))
    );
  }, [items, filters]);

  const openNew = () => {
    setEditing(null);
    setIsFormOpen(true);
  };

  const openEdit = (item: Media) => {
    setEditing(item);
    setIsFormOpen(true);
  };

  const handleSubmit = (data: MediaFormData) => {
    if (editing) updateItem(editing.id, data);
    else addItem(data);
    setIsFormOpen(false);
    setEditing(null);
  };

  const doneCount = items.filter((m) => m.status === "done").length;

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Kitap ve Film Günlüğüm</h1>
          <p className="mt-1 text-slate-600">
            {items.length} kayıt, {doneCount} tanesi bitti.
          </p>
        </div>
        <button
          onClick={openNew}
          className="rounded-lg bg-teal-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-teal-800"
        >
          Yeni ekle
        </button>
      </header>

      <FilterBar filters={filters} onChange={setFilters} />

      <MediaList
        items={filtered}
        hasAnyItem={items.length > 0}
        onEdit={openEdit}
        onDelete={deleteItem}
      />

      {isFormOpen && (
        <MediaForm
          key={editing?.id ?? "new"}
          initial={editing}
          onSubmit={handleSubmit}
          onClose={() => setIsFormOpen(false)}
        />
      )}
    </div>
  );
}