import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface ListContractItem {
  cref: string;
  address: string;
  population:string;
  province:string;
  cp:number;
  type:string;
  m2:number;
  ac:boolean;
  nroom:number;
  nbath:number;
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
        case 'cref': return compare(a.cref, b.cref, isAsc);
        case 'address': return compare(a.address, b.address, isAsc);
        case 'population': return compare(a.population, b.population, isAsc);
        case 'province': return compare(a.province, b.province, isAsc);
        case 'cp': return compare(+a.cp, +b.cp, isAsc);
        case 'type': return compare(a.type, b.type, isAsc);
        case 'm2': return compare(a.m2, b.m2, isAsc);
        case 'ac': return compare(a.ac, b.ac, isAsc);
        case 'nroom': return compare(+a.cp, +b.cp, isAsc);
        case 'nbath': return compare(+a.nbath, +b.nbath, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
