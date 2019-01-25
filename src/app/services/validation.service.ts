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
  link2:any;
  _value: any;

  set getSelectedData(value: any) {
    this._value = value;
  }

  get getSelectedData(): any {
    return this._value;
  }

  constructor(private http: HttpClient) {
    this.link = "http://128.199.228.223:3000"
    // this.link = "http://192.168.43.202:3000"
    // this.link = "http://localhost:3000"
  }

  getGrowersData(info) {
    let status = info;
    return new Promise(resolve => {
      this.http.get<myData>(this.link + '/get/grower/claim/' + status).subscribe(

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

  getGrowerProduct(id) {
    return new Promise(resolve => {
      this.http.get<myData>(this.link + '/get/grower/trans/items/' + id).subscribe(
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

  getRetailersData(info) {
    let status = info;
    return new Promise(resolve => {
      this.http.get<myData>(this.link + '/get/retailer/claim/' + status).subscribe(
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

  getRetailerProduct(id) {
    return new Promise(resolve => {
      this.http.get<myData>(this.link + '/get/retailer/trans/items/' + id).subscribe(
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
        remarks: info.remarks
      };
    } else {
      data = {
        status: info.status
      };
    }

    console.log(info);
    console.log(data);
    return new Promise(resolve => {
      this.http.patch(this.link + '/api/rewards/growers/claim/' + info.transid + '', data).subscribe(
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
      this.http.patch(this.link + '/api/rewards/retailers/claim/' + info.transid + '', data).subscribe(
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
      transNo: trans.transid,
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
            product.transNo = trans.transid;
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
      itemNo: item.prodid,
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
