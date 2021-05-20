import { HttpService, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AppService {

  private readonly daprPort: number;

  constructor(private readonly config: ConfigService, private readonly http: HttpService) {
    this.daprPort = config.get<number>('DAPR_HTTP_PORT', 3500);
    this.subscribe();
  }

  private subscribe(): void {
    this.http.get(`http://localhost:${this.daprPort}/dapr/subscribe`)
      .toPromise()
      .then(data => console.error(data))
      .catch(error => console.error(error));
  }
}
