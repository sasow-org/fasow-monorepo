import RowData from "../data/RowData";

export default interface IData {
  DataEssential(): RowData;
  DataDetailed(): RowData;
}
