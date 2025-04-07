import axiosInstance from '@/api/api';

export class Batcher<T, R> {
  private static batchers: Batcher<any, any>[] = [];

  static follow = new Batcher<number, number>(
    async (ids) => axiosInstance.post('novels/isFollow', ids, { withCredentials: true }).then((res) => res.data),
    (results, id) => results.find((result) => result === id),
  );

  static async process() {
    for (const batcher of Batcher.batchers) {
      await batcher.batch();
    }
  }

  private promises = new Map<
    T,
    {
      resolve: Parameters<ConstructorParameters<typeof Promise<R>>[0]>[0];
      reject: Parameters<ConstructorParameters<typeof Promise<R>>[0]>[1];
    }
  >();

  constructor(private readonly batchFn: (ids: T[]) => Promise<R[]>, private readonly extractor: (result: R[], id: T) => R | undefined) {
    Batcher.batchers.push(this);
  }

  private async batch() {
    const copy = new Map(this.promises);
    this.promises.clear();

    if (copy.size === 0) {
      return;
    }

    const ids = Array.from(copy.keys());

    await this.batchFn(ids)
      .then((results) => {
        ids.forEach((id) => {
          const result = this.extractor(results, id);
          if (result) {
            const promise = copy.get(id);
            if (promise) {
              promise.resolve(result);
            }
          }
        });
      })
      .catch((error) => {
        ids.forEach((id) => {
          copy.get(id)?.reject(error);
        });
      })
      .finally(() => copy.clear());
  }

  get(id: T) {
    const promise = new Promise<R>((resolve, reject) => {
      this.promises.set(id, { resolve, reject });
    });

    return promise;
  }
}
