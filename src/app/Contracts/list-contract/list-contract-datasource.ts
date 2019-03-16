import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface ListContractItem {
  propertyAddress: string;
  renterDNI:string
  renterid:number
  dstart:Date;
  dend: Date;
  iva:number;
  watertax:number;
  gastax:number;
  electricitytax:string;
  communitytax:number;
}

// TODO: replace this with real data from your application


/**
 * Data source for the ListContract view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class ListContractDataSource extends DataSource<ListContractItem> {
  data: ListContractItem[];

  constructor(public paginator: MatPaginator,
               public sort: MatSort,
               ) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<ListContractItem[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    // Set the paginator's length
    this.paginator.length = this.data.length;

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: ListContractItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: ListContractItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'propertyAddress': return compare(a.dstart, b.dstart, isAsc);
        case 'renterDNI': return compare(+a.dstart, +b.dstart, isAsc);
        case 'dstart': return compare(a.dstart, b.dstart, isAsc);
        case 'dend': return compare(a.dend, b.dend, isAsc);
        case 'iva': return compare(+a.iva, +b.iva, isAsc);
        case 'watertax': return compare(+a.watertax, +b.watertax, isAsc);
        case 'gastax': return compare(+a.gastax, +b.gastax, isAsc);
        case 'electricitytax': return compare(+a.electricitytax, +b.electricitytax, isAsc);
        case 'communitytax': compare(+a.communitytax, +b.communitytax, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
