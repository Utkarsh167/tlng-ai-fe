import { Injectable,NgZone } from '@angular/core';
import { FormService } from '../../../../shared/services/form.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpService } from '../../../../shared/services/http.service';
import { USER_LIST, BLOCK_USER, USER, UPLOAD_BULK_EMP, COMPANY_SHIFT } from '../../../../../constant/urls';
import { COMMON_MESSAGES } from '../../../../../constant/messages';
import { map, catchError } from 'rxjs/operators';
import { throwError, Observable, observable } from 'rxjs';
import { UtilityService } from '../../../../shared/services/utility.service';
import { even } from '@rxweb/reactive-form-validators';
// import {EventSourcePolyfill} from 'ng-event-source';
// import {Observable} from 'rxjs';

@Injectable()
export class EmployeeListService {

  constructor(
    private _formService: FormService,
    private _formBuilder: FormBuilder,
    private _http: HttpService,
    private _utilityService: UtilityService,
    private _zone: NgZone
  ) { }
  // companyLocationName -- satyam
  getFilterForm() {
    return this._formBuilder.group(
      this._formService.getFilterFormControls(['fromDate', 'toDate', 'status','compLocationName']))
  }

  getEmployees(data) {
    return this._http.get<Employee.List>(USER_LIST, data);
  }

  // getEventSource(url: string): EventSource{
  //   return new EventSource(url);
  // }

  // getTestApiData(url: string): Observable<any> {
  //   return Observable.create(observer => {
  //     const eventSource = this.getEventSource(url);
  //     eventSource.onmessage = event => {
  //       this._zone.run(() => {
  //         observer.next(event);
  //       });
  //     };
  //     eventSource.onerror = error => {
  //       this._zone.run(() => {
  //         observer.error(error);
  //       });
  //     };
  //   });
  // }
  private getEventSource(url: string): EventSource {
    return new EventSource(url);
  }

  // getTestApiData(url){
  //   return Observable.create(observable=>{
  //     let eventSource = new EventSourcePolyfill(url, {headers: { headerName: 'HeaderValue', header2: 'HeaderValue2','Content-Type': 'application/json', }},);
  //     eventSource.onmessage = (data => {
  //     this._zone.run(() => {
  //         observable.next(data);
  //         // Do stuff here
  //     });
  //     });
  //     eventSource.onopen = (a) => {
  //     // Do stuff here
  //         observable.onopen(a);
  //     };
  //     eventSource.onerror = (e) => {
  //     // Do stuff here
  //         observable.error(e);
  //       }
  //   });
   
  //   // return new Observable((observable=>{
  //   //   const eventSource = this.getEventSource(url);
  //   //   eventSource.onmessage = event => {
  //   //     this._zone.run(()=> {
  //   //       observable.next(event);
  //   //     });
  //   //   };

  //   //   eventSource.onerror = error => {
  //   //     this._zone.run(()=> {
  //   //       observable.error(error);
  //   //     });
  //   //   };
  //   // }))
  // }


  getCompanyShift() {
    return this._http.get<any>(COMPANY_SHIFT);
  }
  // companyLocationName -- satyam
  createFilterObject(form: FormGroup) {
    return {
      registrationDate: {
        label: 'Registration Date',
        fromDate: form.controls.fromDate,
        toDate: form.controls.toDate
      },
      status: {
        label: 'Status',
        list: [
          { viewValue: 'Active', value: 'unblocked' },
          { viewValue: 'Blocked', value: 'blocked' }
        ],
        control: form.controls.status
      },
      compLocationName: {
        label: 'Building',
        list: JSON.parse(localStorage.getItem('buildings')),
        control: form.controls.compLocationName
      },
     
    }
  }

  async changeStatus(body) {
    try {
      let status = body.status.toUpperCase();
      let data = {
        message: COMMON_MESSAGES[status].confirm('Employee')
      }
      let success = await this._utilityService.openDialog(data).toPromise();
      if (success) {
        let response = status === 'DELETED' ?
          this._http.delete(USER + body.userId).toPromise() :
          this._http.post(BLOCK_USER + body.userId, { status: body.status }).toPromise();
        await response;
        this._utilityService.showAlert(COMMON_MESSAGES[status].success('Employee'))
        return Promise.resolve(response);
      } else {
        return Promise.resolve(null);
      }

    } catch (err) {
      return Promise.reject(err);
    }
  }



  uploadFile(data) {
    var formData = new FormData();
    formData.append('file', data);
    let apiType = 'post';
    return this._http[apiType](UPLOAD_BULK_EMP, formData).pipe(
      map(
        response => {
          this._utilityService.showAlert(COMMON_MESSAGES['UPLOADED']('File'));
          return response;
        }
      ),
      catchError(
        error => throwError(error)
      )
    )
  }

}
