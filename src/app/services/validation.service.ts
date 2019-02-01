import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';

import { jsonpCallbackContext } from '@angular/common/http/src/module';

interface myData {
  growersList: object;
}

@Injectable({
  providedIn: 'root'
})
export class ValidationService {
  link: any;
  link2: any;
  _value: any;
  _status: any;
  _from: any;
  _to: any;
  accountData: any;

  headers = new HttpHeaders()

    .set("Access-Control-Allow-Origin", "*")
    .set('Access-Control-Allow-Methods', 'GET, POST')
    // .set("x-access-token", this.token)
    .set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  set getSelectedData(value: any) {
    this._value = value;
  }

  get getSelectedData(): any {
    return this._value;
  }

  set getTabStatus(status: any) {
    this._status = status;
  }

  get getTabStatus(): any {
    return this._status;
  }

  set getFrom(status: any) {
    this._from = status;
  }

  get getFrom(): any {
    return this._from;
  }

  set getTo(status: any) {
    this._to = status;
  }

  get getTo(): any {
    return this._to;
  }

  constructor(private http: HttpClient) {
    this.link = "http://128.199.228.223:3000"
    // this.link = "http://192.168.43.202:3000"
    this.link2 = "http://localhost:3000"
  }

  loginAuth(info) {
    console.log(info);
    let data;
    data = {
      username: info.email,
      password: info.password
    }
    return new Promise(resolve => {
      this.http.post<myData>(this.link + '/api/login', data, { headers: this.headers }).subscribe(data => {
        // this.result = data;
        // this.token = this.result.token;
        this.accountData = data;
        localStorage.setItem('userid', this.accountData.id);
        this.setToken(this.accountData.token);
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  setToken(token: string): void {
    localStorage.setItem('TOKEN', token);
  }

  isLogged() {
    return localStorage.getItem('TOKEN') != null;
  }

  ngOnDestroy() {
    localStorage.removeItem('TOKEN');
  }

  getGrowersTrans(info) {
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

  getRetailerInfo(info) {
    console.log(info);
    return new Promise(resolve => {
      this.http.get<myData>(this.link + '/get/retailers/' + info).subscribe(
        data => {
          resolve(data);
          console.log('getRetailerInfo', data);
        },
        err => {
          console.log(err);
        }
      );
    });
  }

  getFieldforceInfo(id) {
    return new Promise(resolve => {
      this.http.get<myData>(this.link + '/get/fieldforces/' + id).subscribe(
        data => {
          resolve(data);
          console.log('getFieldforceInfo', data);
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

  getRetailersTrans(info) {
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

  addTransDetails(trans) {
    console.log(trans);
    trans.products.filter(product => {
      if (!product.amount) {
        product.amount = 0;
      };

    });
    let data = {
      id: 0,
      transid: trans.transid,
      userid: trans.userid,
      name: trans.name,
      retailer: trans.receipt_from ? trans.receipt_from : "",
      fieldforce: trans.fieldforce_id ? trans.fieldforce_id : 0,
      distributor: trans.distributor ? trans.distributor : 0,
      membershipid: trans.membershipid,
      invoice: trans.invoice,
      products: JSON.stringify(trans.products),
      receipt_photo: trans.receipt_photo,
      total_amt: trans.total_amt ? trans.total_amt : 0,
      total_points: trans.total_points ? trans.total_points : 0,
      status: trans.status,
      type: trans.type ? trans.type : "",
      modifieddate: trans.modifieddate,
      submitteddate: trans.submitteddate,
      invoicedate: trans.invoicedate ? trans.invoicedate : "",
      remarks: trans.remarks ? trans.remarks : "",
    }
    console.log(data);

    return new Promise(resolve => {
      this.http.post(this.link + '/api/addTransDetails', data).subscribe(
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

  checkAvailability(info) {
    console.log(info);
    let data;
    data = {
      type: info.type,
      transid: info.transid,
    }
    return new Promise(resolve => {
      this.http.get<myData>(this.link + '/api/checkTrans/' + data.type + '/' + data.transid).subscribe(
        data => {
          resolve(data);
          console.log('result', data);
        },
        err => {
          console.log(err);
        }
      );
    });
  }

  addSelected(trans) {
    console.log(trans);

    let data = {
      id: 0,
      transid: trans.transid,
      userid:  localStorage.getItem('userid'),
      type: trans.type,
      remarks: trans.remarks ? trans.remarks : "",
    }
    console.log(data);

    return new Promise(resolve => {
      this.http.post(this.link + '/api/addSelected', data).subscribe(
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
      id: 0,
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
      id: 0,
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

  gettransData(info) {
    let data;
    data = {
      status: info.status,
      type: info.type
    }
    // console.log(info);
    // console.log(data);
    return new Promise(resolve => {
      this.http.get(this.link + '/api/getTransDetails/' + info.type + '/' + info.status, data).subscribe(
        data => {
          resolve(data);
          // console.log('res', data);
        },
        err => {
          console.log(err);
        }
      );
    });
  }
}
