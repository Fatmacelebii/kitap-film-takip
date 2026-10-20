import type { Media } from "../interfaces/media";
import {
  creatorLabel,
  statusColor,
  statusLabel,
  typeLabel,
} from "../utils/labels";

interface MediaCardProps {
  item: Media;
  onEdit: (item: Media) => void;
  onDelete: (id: string) => void;
}

export function MediaCard({ item, onEdit, onDelete }: MediaCardProps) {
  const handleDelete = () => {
    if (confirm(`"${item.title}" kaydını silmek istediğine emin misin?`)) {
      onDelete(item.id);
    }
  };

  return (
    <article className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5">
      <div>
        <div className="mb-3 flex items-center justify-between gap-2">
          <span className="text-sm font-medium text-teal-700">
            {typeLabel[item.type]}
          </span>
          <span
            className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColor[item.status]}`}
          >
            {statusLabel(item.type, item.status)}
          </span>
        </div>
        <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
        <p className="mt-1 text-sm text-slate-600">
          {creatorLabel[item.type]}: {item.creator || "Belirtilmedi"}
        </p>
        <p className="mt-3 text-amber-500" aria-label={`Puan: ${item.rating} / 5`}>
          {item.rating > 0 ? (
            <>
              {"★".repeat(item.rating)}
              <span className="text-slate-300">{"★".repeat(5 - item.rating)}</span>
            </>
          ) : (
            <span className="text-sm text-slate-400">Puanlanmadı</span>
          )}
        </p>
      </div>
      <div className="mt-5 flex gap-2">
        <button
          onClick={() => onEdit(item)}
          className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          Düzenle
        </button>
        <button
          onClick={handleDelete}
          className="flex-1 rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-50"
        >
          Sil
        </button>
      </div>
    </article>
  );
}