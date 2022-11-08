import { Component, DoCheck } from '@angular/core';
import { TaskList } from '../../model/task-list';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements DoCheck {

  public TaskList: Array<TaskList> = JSON.parse( localStorage.getItem('list') || "[]");

  constructor() { }

  ngDoCheck(): void {
    this.setLocalStorage();
  }


  public deleteItemTaskList(event: number){
    this.TaskList.splice(event, 1);
  }

  setEmitTaskList(event: string){
    this.TaskList.push({Task: event, checked: false});
  }

  public deleteAllTaskList(){
    const confirm = window.confirm("Você realmente deseja Deletar tudo?");

    if(confirm){
      this.TaskList = [];
    }
  }

  public validationInput(event: string, index: number){

    if(!event.length){
      const confirm = window.confirm("Task está vazia, deseja Deletar?");

      if(confirm){
        this.deleteItemTaskList(index)
      }
    }
  }

  public setLocalStorage(){
    if(this.TaskList){
      this.TaskList.sort( (first, last) => Number(first.checked) - Number(last.checked))
      localStorage.setItem('list', JSON.stringify(this.TaskList))
    }
  }
}
