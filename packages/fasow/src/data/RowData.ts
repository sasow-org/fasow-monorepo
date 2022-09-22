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
    const { rows, head } = rowsData;
    for (let i = 0; i < rows.length; i++) {
      this.head.push(head[i]);
      this.rows.push(rows[i]);
    }
    return this;
  }
}
