/* eslint-disable no-plusplus */
export default class RowData {
  head: string[];
  rows: string[];

  constructor() {
    this.head = [];
    this.rows = [];
  }

  public addRow(new_row: any, name: string): void {
    this.rows.push(`${new_row}`);
    this.head.push(name);
  }

  public addRows(rowsData: RowData): RowData {
    const { rows } = rowsData;
    const heads: string[] = rowsData.head;
    for (let i = 0; i < rows.length; i++) {
      this.head.push(heads[i]);
      this.rows.push(rows[i]);
    }
    return this;
  }
}
