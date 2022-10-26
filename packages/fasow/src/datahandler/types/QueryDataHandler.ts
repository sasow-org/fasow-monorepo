import { QueryResult, QuerySelection } from "./types";

export default interface QueryDataHandler<T> {
  getData<S extends QuerySelection<T>>(selection: S): QueryResult<T, S>;
}
