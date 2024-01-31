import { HttpHeaders } from "@angular/common/http";
import { HttpMethod } from "src/shared/http-method";

export class Api {              
    constructor(){} ;           
    url: string;
    data?: any;
    methodType: HttpMethod;
    headers?: HttpHeaders;        
}
