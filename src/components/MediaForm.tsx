import { useState } from "react";
import type { Media, MediaFormData, MediaStatus, MediaType } from "../interfaces/media";
import { creatorLabel, statusLabel } from "../utils/labels";

interface MediaFormProps {
  initial: Media | null; // null ise yeni kayıt, doluysa güncelleme
  onSubmit: (data: MediaFormData) => void;
  onClose: () => void;
}

const emptyForm: MediaFormData = {
  title: "",
  type: "book",
  creator: "",
  status: "planned",
  rating: 0,
};

const fieldClass =
  "w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-600/20";

export function MediaForm({ initial, onSubmit, onClose }: MediaFormProps) {
  const [form, setForm] = useState<MediaFormData>(
    initial
      ? {
          title: initial.title,
          type: initial.type,
          creator: initial.creator,
          status: initial.status,
          rating: initial.rating,
        }
      : emptyForm
  );
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) {
      setError("Başlık boş bırakılamaz.");
      return;
    }
    onSubmit({ ...form, title: form.title.trim(), creator: form.creator.trim() });
  };

  const statuses: MediaStatus[] = ["planned", "inProgress", "done"];

  return (
    <div
      className="fixed inset-0 z-10 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <form
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl"
      >
        <h2 className="mb-4 text-xl font-semibold text-slate-900">
          {initial ? "Kaydı düzenle" : "Yeni kayıt ekle"}
        </h2>

        <div className="space-y-4">
          <div>
            <label htmlFor="title" className="mb-1 block text-sm font-medium text-slate-700">
              Başlık
            </label>
            <input
              id="title"
              value={form.title}
              onChange={(e) => {
                setForm({ ...form, title: e.target.value });
                setError("");
              }}
              placeholder="Örn: Sefiller"
              className={fieldClass}
              autoFocus
            />
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="type" className="mb-1 block text-sm font-medium text-slate-700">
                Tür
              </label>
              <select
                id="type"
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value as MediaType })}
                className={fieldClass}
              >
                <option value="book">Kitap</option>
                <option value="movie">Film</option>
              </select>
            </div>
            <div>
              <label htmlFor="status" className="mb-1 block text-sm font-medium text-slate-700">
                Durum
              </label>
              <select
                id="status"
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value as MediaStatus })}
                className={fieldClass}
              >
                {statuses.map((s) => (
                  <option key={s} value={s}>
                    {statusLabel(form.type, s)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="creator" className="mb-1 block text-sm font-medium text-slate-700">
              {creatorLabel[form.type]}
            </label>
            <input
              id="creator"
              value={form.creator}
              onChange={(e) => setForm({ ...form, creator: e.target.value })}
              className={fieldClass}
            />
          </div>

          <div>
            <label htmlFor="rating" className="mb-1 block text-sm font-medium text-slate-700">
              Puan
            </label>
            <select
              id="rating"
              value={form.rating}
              onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
              className={fieldClass}
            >
              <option value={0}>Puanlanmadı</option>
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>
                  {"★".repeat(n)} ({n}/5)
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Vazgeç
          </button>
          <button
            type="submit"
            className="rounded-lg bg-teal-700 px-4 py-2 text-sm font-medium text-white hover:bg-teal-800"
          >
            {initial ? "Değişiklikleri kaydet" : "Ekle"}
          </button>
        </div>
      </form>
    </div>
  );
}