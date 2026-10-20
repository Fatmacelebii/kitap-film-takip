import { useCallback, useEffect, useState } from "react";
import type { Media, MediaFormData } from "../interfaces/media";
import { generateId, getStoredItems, saveItems } from "../utils/storage";

export function useMedia() {
  // İlk açılışta localStorage'daki veriyi oku
  const [items, setItems] = useState<Media[]>(() => getStoredItems());

  // Liste her değiştiğinde localStorage'a kaydet
  useEffect(() => {
    saveItems(items);
  }, [items]);

  // EKLE
  const addItem = useCallback((data: MediaFormData) => {
    setItems((prev) => [{ id: generateId(), ...data }, ...prev]);
  }, []);

  // GÜNCELLE
  const updateItem = useCallback((id: string, data: MediaFormData) => {
    setItems((prev) => prev.map((m) => (m.id === id ? { ...m, ...data } : m)));
  }, []);

  // SİL
  const deleteItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((m) => m.id !== id));
  }, []);

  return { items, addItem, updateItem, deleteItem };
}