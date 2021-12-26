import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ValidateService {
  private pan_Url: string = 'http://lab.thinkoverit.com/api/verify-pan.php';
  private postcode_Url: string = 'http://lab.thinkoverit.com/api/get-postcode-details.php';
  constructor(private httpclient:HttpClient) { }
  
  getPostCode(postcode:any){
    return this.httpclient.post(this.postcode_Url, {"postcode":postcode},{responseType: 'text' as const});
  }
  getPan(pan:any){
    return this.httpclient.post(this.pan_Url,  {"panNumber":pan});
  }
 
}
