export type QuerySelection<T> = {
  [K in keyof T]?: boolean;
};

export type Truly<T> = {
  [K in keyof T as T[K] extends true ? K : never]: T[K];
};

export type Contain<K, T> = K extends keyof T ? K : never;

export type QueryResult<T, S> = {
  readonly [K in keyof T as Contain<K, Truly<S>>]: T[K];
};

export class Model<T> {
  props: T[] = [];

  register(prop: T) {
    this.props.push(prop);
  }

  select<S extends QuerySelection<T>>(selection: S): QueryResult<T, S> {
    console.log("HOLA SOY SELECTION : ", selection);
    const data = {};
    return data as QueryResult<T, S>;
  }
}
