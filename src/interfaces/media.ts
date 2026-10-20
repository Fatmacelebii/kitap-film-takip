// Kitap veya film kaydının veri tipi
export type MediaType = "book" | "movie";
export type MediaStatus = "planned" | "inProgress" | "done";
 
export interface Media {
  id: string;
  title: string;
  type: MediaType;
  creator: string; // yazar veya yönetmen
  status: MediaStatus;
  rating: number; // 0 = puanlanmadı, 1-5
}
 
// Form verisi (id olmadan)
export type MediaFormData = Omit<Media, "id">;
 
export interface Filters {
  search: string;
  type: MediaType | "all";
  status: MediaStatus | "all";
}