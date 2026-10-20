import type { Media } from "../interfaces/media";

const STORAGE_KEY = "kitap-film-takip";

// localStorage'dan kayıtları oku
export function getStoredItems(): Media[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? (JSON.parse(data) as Media[]) : [];
  } catch (error) {
    console.error("LocalStorage okuma hatası:", error);
    return [];
  }
}

// localStorage'a kayıtları yaz
export function saveItems(items: Media[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (error) {
    console.error("LocalStorage yazma hatası:", error);
  }
}

export function generateId(): string {
  return crypto.randomUUID();
}