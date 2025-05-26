import { Injectable } from "@angular/core";
import { Message } from "../models/message.model";
import { delay, map, Observable, of } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { DtoMessage, toDtoMessage, toMessage } from "../components/dto/message.dto";
import { environment } from "../../environments/environment";


@Injectable({
  providedIn: 'root',
})
export abstract class MessagesService {

    private baseUrl = environment.apiBaseUrl + '/messages';

    constructor(private http: HttpClient) {}

    getMessages(): Observable<Message[]> {
        return this.http.get<DtoMessage[]>(this.baseUrl).pipe(
            map((dtoMessages) => dtoMessages.map((msg) => toMessage(msg)))
        )
    }

    addMessage(message: Message): Observable<Message> {
        const apiMsg = toDtoMessage(message);
        return this.http.post<DtoMessage>(this.baseUrl, apiMsg).pipe(
            map((msg) => toMessage(msg))
        );
    }
}