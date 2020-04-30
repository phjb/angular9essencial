import { map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from './product.model';
import { Observable, EMPTY } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = 'http://localhost:3001/products';
  constructor(private snackBar: MatSnackBar, private httpClient: HttpClient) { }

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ['msg-error'] : ['msg-success']
    });
  }

  create(product: Product): Observable<Product> {
    return this.httpClient.post<Product>(this.baseUrl, product).pipe(
      map(obj => obj),
      catchError(e=> this.errorHandler(e))
    );
  }

  read(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.baseUrl).pipe(
      map(obj => obj),
      catchError(e=> this.errorHandler(e))
    );
  }

  readById(id: string): Observable<Product> {
    const url = `${this.baseUrl}/${id}`;
    return this.httpClient.get<Product>(url).pipe(
      map(obj => obj),
      catchError(e=> this.errorHandler(e))
    );
  }

  update(product: Product): Observable<Product> {
    const url = `${this.baseUrl}/${product.id}`;
    return this.httpClient.put<Product>(url, product).pipe(
      map(obj => obj),
      catchError(e=> this.errorHandler(e))
    );
  }

  delete(id: number): Observable<Product> {
    const url = `${this.baseUrl}/${id}`;
    return this.httpClient.delete<Product>(url).pipe(
      map(obj => obj),
      catchError(e=> this.errorHandler(e))
    );
  }

  errorHandler(e:any):Observable<any>{
    this.showMessage("Ocorreu um erro! " + `${e.message}`,true);
    return EMPTY;
  }

}
