import { SetStorage, GetStorage } from "@/data/protocols/cache";

export class LocalStorageAdapter implements SetStorage, GetStorage {
  set(key: string, value?: object): void {
    if (value) {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      localStorage.removeItem(key);
    }
  }

  get<t = unknown>(key: string): t {
    return JSON.parse(`${localStorage.getItem(key)}`);
  }
}
