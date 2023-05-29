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
      legacyMode: true,
    });

    this._client.on("error", (err) => console.error("Redis Client Error", err));
    this._client.on("ready", () => console.log("Cache initialized."));

    await this._client.connect();
  }

  async get(key: any): Promise<any> {
    const keyReceived = await this._client.get(key);
    console.log(keyReceived);
    return keyReceived;
  }

  async set(key: string, value: string): Promise<void> {
    this._client.set(key, value);
  }
}
