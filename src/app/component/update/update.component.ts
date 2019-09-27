import { Component, OnInit } from '@angular/core';
import { ExpenseClaimed } from 'src/app/model/expense-claimed';
import { ServiceService } from 'src/app/Service/service.service';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { error } from '@angular/compiler/src/util';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  form: FormGroup;
  flag: boolean;
  isUpdated: boolean = false;
  expenseForm: FormGroup;
  claim: ExpenseClaimed = {
    expenseCodeId: 0, employeeId: 0, projectCode: 0, expenseCode: 0, startDate: null, endDate: null, expenseAmount: 0
  }

  constructor(private service: ServiceService, private router: Router) { }

  ngOnInit() {
    this.claim = this.service.getSearchData();
  }

  filterData(value: string) {
    this.flag = false;
    this.service.search(value).subscribe((data) => {
    this.claim = data;

      if (this.claim) {
        this.service.setSearchedData(this.claim);
        this.flag = true;
      }
      else {
        this.flag = false;
      }
    }, error => { alert("Expense Id Not Found") }
    );
    //alert(this.claim.expenseAmount);

  }

  update() {
    //this.claim = this.expenseForm.value;
    this.service.updateClaim(this.claim).subscribe(
      success => alert('Update Successful'),
      error => alert(error)
    );
    this.router.navigate(['']);
  }

  error: any = { isError: false, errorMessage: '' };


  compare(){
    if(this.claim.startDate>this.claim.endDate){
      alert('Dates not in proper order');
    }
  }
}
