import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface myData {
  growersList: object;
}

@Injectable({
  providedIn: 'root'
})
export class ValidationService {
  link: any;

  constructor(private http: HttpClient) {
    this.link = "http://128.199.228.223:3000"
    // this.link = "http://localhost:3000"
  }

  getGrowersData(info) {
    let status = info;
    return new Promise(resolve => {
      this.http.get<myData>(this.link + '/api/rewards/growers/claim/' + status).subscribe(
        data => {
          resolve(data);
          // console.log('growersData', data);
        },
        err => {
          console.log(err);
        }
      );
    });
  }

  getRetailersData(info) {
    let status = info;
    return new Promise(resolve => {
      this.http.get<myData>(this.link + '/api/rewards/retailers/claim/' + status).subscribe(
        data => {
          resolve(data);
          // console.log('retailersData', data);
        },
        err => {
          console.log(err);
        }
      );
    });
  }

  growersValidate(info) {
    let data;
    if (info.status == 4) {
      data = {
        status: info.status,
        remards: info.remarks
      };
    } else {
      data = {
        status: info.status
      };
    }

    console.log(info);
    console.log(data);
    return new Promise(resolve => {
      this.http.patch(this.link + '/api/rewards/growers/claim/' + info.id + '', data).subscribe(
        data => {
          resolve(data);
          console.log('res', data);
        },
        err => {
          console.log(err);
        }
      );
    });
  }

  retailersValidate(info) {
    let data;
    if (info.status == 4) {
      data = {
        status: info.status,
        remards: info.remarks
      };
    } else {
      data = {
        status: info.status
      };
    }

    return new Promise(resolve => {
      this.http.patch(this.link + '/api/rewards/retailers/claim/' + info.id + '', data).subscribe(
        data => {
          resolve(data);
          console.log('res', data);
        },
        err => {
          console.log(err);
        }
      );
    });
  }

  addTrans(trans) {
    console.log(trans);
    let data = {
      id: "",
      transNo: trans.id,
      grossTotal: trans.grossSales,
      remarks: ""
    }
    console.log(data);

    return new Promise(resolve => {
      this.http.post(this.link + '/api/addTrans', data).subscribe(
        data => {
          resolve(data);
          console.log('res', data);
          trans.products.filter(product => {
            if (!product.amount) {
              product.amount = 0;
            };
            product.transNo = trans.id;
            this.addItem(product)
          });
        },
        err => {
          console.log(err);
        }
      );
    });
  }

  addItem(item) {
    console.log(item);
    let data = {
      id: "",
      itemNo: item.id,
      transNo: item.transNo,
      name: "",
      quantity: item.quantity,
      amount: item.amount,
      remarks: ""
    }
    console.log(data);

    return new Promise(resolve => {
      this.http.post(this.link + '/api/addItem', data).subscribe(
        data => {
          resolve(data);
          console.log('res', data);
        },
        err => {
          console.log(err);
        }
      );
    });
  }
}
