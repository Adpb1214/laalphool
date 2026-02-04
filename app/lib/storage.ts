'use client';

type FlowerChoice = 'laal' | 'neela';

interface StorageData {
  selectedFlowers: FlowerChoice[];
  lastUpdated: string;
}

const STORAGE_KEY = 'crush_surprise_data';

export function saveToStorage(selectedFlowers: FlowerChoice[]): void {
  if (typeof window === 'undefined') return;
  
  const data: StorageData = {
    selectedFlowers,
    lastUpdated: new Date().toISOString(),
  };
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function loadFromStorage(): FlowerChoice[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return [];
    
    const data: StorageData = JSON.parse(saved);
    return data.selectedFlowers || [];
  } catch {
    return [];
  }
}

export function clearStorage(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
}