import RowData from "./RowData";

function arrayToString(array: string[]) {
  return array.join(",");
}

export default class MatrixData {
  columns: [string[]];
  head: string[];

  // Todo hay un problema porque tendremos repetidas las cabeceras por cada row data
  // todo creo que javascript/typescript soluciona ese problema je.

  constructor() {
    this.columns = [[]];
    this.head = [];
  }

  public addRow(row: RowData): void {
    if (this.head.length === 0) {
      this.head = row.head;
      this.columns.push(row.head);
    }
    this.columns.push(row.rows);
  }

  public toCSVFormat(): string {
    const result = this.columns
      .map((column) => arrayToString(column))
      .join("\n");
    return result;
  }
}
