
import type { Request, Response } from 'express';
import { type OutgoingHttpHeaders } from 'node:http2';
import eventManager from '../event/eventManager.js';

let dataVersion: number = 1;

interface ResponseCacheEntry {
    body: Record<string, any>
};

class Cache {
    private entries: Record<string, ResponseCacheEntry> = {};

    get(key: string) {
      return this.entries[key] || null;
    }

    set(key: string, value: ResponseCacheEntry) {
      this.entries[key] = value;
    }

    clear() {
      for (let k of Object.keys(this.entries)) {
        delete this.entries[k];
      }
    }
}

const memoryCache = new Cache();

// whenever data changes, invalidate(clear) cache
const invalidateCache = () => {
  dataVersion++;
  memoryCache.clear();
};
eventManager.addListener('dataChanged', invalidateCache);

export default memoryCache;