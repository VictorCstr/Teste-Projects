import { createClient } from "redis";

export class CacheProvider {
  private static _instance;
  private _client;

  static getInstance(): CacheProvider {
    if (!CacheProvider._instance) {
      CacheProvider._instance = new CacheProvider();
    }
    return CacheProvider._instance;
  }

  async initialize(url: string) {
    this._client = createClient({
      url,
    });

    this._client.on("error", (err) => console.error("Redis Client Error", err));
    this._client.on("ready", () => console.log("Cache initialized."));

    await this._client.connect();
  }

  async get(key): Promise<any> {
    return await this._client.get(key);
  }

  async set({ key, value, ttl }: { key: string; value: any; ttl?: number }) {
    this._client.set(key, value);

    if (ttl) this._client.expire(key, ttl);
  }
}
