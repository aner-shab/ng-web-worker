import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { WebWorkerService } from './web-worker.service';
@Injectable()
export class HttpWorker extends WebWorkerService {
	constructor(){
		super();
	}
	
	public get(url: string, token: string = null): Observable<any> {
		return Observable.create((observer) => { 
		this.run(this.httpGetter,[url,token]).then((response) => {
				let data;
				try {
					data = JSON.parse(response);
				}
				catch(ex) {
					data = response;
				}
				observer.next(data);
				this.terminate(response);
			});
		});	
	}

	private httpGetter(data: any){
		let xhr = new XMLHttpRequest();	
		const url = data[0];
		const token = data[1];
		try{
			xhr.open('GET', url, false);
			if (token) {
				xhr.setRequestHeader("Authorization","Bearer "+token);
			}
			xhr.send();
			if (xhr.readyState === XMLHttpRequest.DONE) {
				return xhr.responseText;
			}
		}
		catch(ex){
			console.error(ex);
			return ex;
		}
	}
}