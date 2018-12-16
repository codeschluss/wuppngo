export class ListComponent {

    public pageNumber: number = 0;
    public totalPages: number = 100;
    public pageSize: number = 10;
    public sort: string;

    constructor() {}

    moreEntriesExist(): boolean {
        return (this.pageNumber + 1) < this.totalPages;
      }

}
