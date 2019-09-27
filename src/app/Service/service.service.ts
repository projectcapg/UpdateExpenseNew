import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ExpenseClaimed } from '../model/expense-claimed';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  claim: ExpenseClaimed = {
    expenseCodeId: 0, employeeId: 0, projectCode: 0, expenseCode: 0, startDate: null, endDate: null, expenseAmount: 0
  }
  constructor(private http: HttpClient) { }

  search(value: string) {
    return this.http.get<ExpenseClaimed>('http://localhost:1111/expenseclaim/search/'+value);
 }

  setSearchedData(data :ExpenseClaimed){
    this.claim=data;
  }
  getSearchData(){
    return this.claim;
  }

  updateClaim(claim: ExpenseClaimed): Observable<Object> {  
    return this.http.put('http://localhost:1111/expenseclaim/update/', claim); 
  }  
}
