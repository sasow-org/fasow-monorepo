import { RowData } from "../RowData";

export default interface IData {
  DataEssential(): RowData;
  DataDetailed(): RowData;
}
