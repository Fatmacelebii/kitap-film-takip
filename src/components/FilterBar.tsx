import type { Filters, MediaStatus, MediaType } from "../interfaces/media";

interface FilterBarProps {
  filters: Filters;
  onChange: (filters: Filters) => void;
}

const fieldClass =
  "rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-600/20";

export function FilterBar({ filters, onChange }: FilterBarProps) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row">
      <input
        type="search"
        value={filters.search}
        onChange={(e) => onChange({ ...filters, search: e.target.value })}
        placeholder="Başlık veya yazar/yönetmen ara"
        className={`${fieldClass} sm:flex-1`}
        aria-label="Ara"
      />
      <select
        value={filters.type}
        onChange={(e) =>
          onChange({ ...filters, type: e.target.value as MediaType | "all" })
        }
        className={fieldClass}
        aria-label="Tür filtresi"
      >
        <option value="all">Tüm türler</option>
        <option value="book">Kitaplar</option>
        <option value="movie">Filmler</option>
      </select>
      <select
        value={filters.status}
        onChange={(e) =>
          onChange({ ...filters, status: e.target.value as MediaStatus | "all" })
        }
        className={fieldClass}
        aria-label="Durum filtresi"
      >
        <option value="all">Tüm durumlar</option>
        <option value="planned">Okunacak / İzlenecek</option>
        <option value="inProgress">Okunuyor / İzleniyor</option>
        <option value="done">Bitti / İzlendi</option>
      </select>
    </div>
  );
}