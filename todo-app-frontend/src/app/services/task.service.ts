import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Task} from "../models/task";
import {API_URL} from "../app.component";

@Injectable({ providedIn: 'root' })
export class TaskService {

  constructor(private http: HttpClient) {}

  getTasks() {
    return this.http.get<Task[]>(API_URL + '/tasks');
  }

  createTask(title: string, deadline: string) {
    return this.http.post<Task>(API_URL + '/task', { title, deadline });
  }

  deleteTask(id: string) {
    return this.http.delete(`${API_URL}/task/${id}`);
  }
}
