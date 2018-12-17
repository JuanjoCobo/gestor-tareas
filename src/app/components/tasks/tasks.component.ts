import { Component, OnInit } from '@angular/core';

import { Task } from '../../interfaces/Task';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  animations: [
    trigger('fade', [

      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate(200, style({ opacity: 1, transform: 'translateY(0px)'}))
      ]),

      transition(':leave', [
        animate(200, style({ opacity: 0, transform:'translateY(30px)' }))
      ]),

    ])
  ]
})

export class TasksComponent implements OnInit {

	tasks: Task[];
	idTask: number;
	taskTitle: string;
	beforeEditCache: string;
  filter:string;

  constructor() { }

  ngOnInit() {

    this.filter = 'all';
  	this.beforeEditCache = '';
  	this.idTask = 4;
  	this.taskTitle = '';
  	this.tasks = [
  		{
  			'id': 1,
  			'title': 'Tarea ejemplo 1',
  			'completed': false,
  			'editing':false,
  		},
  		{
  			'id': 2,
  			'title': 'Tarea ejemplo 2',
  			'completed': false,
  			'editing':false,
  		},
  		{
  			'id': 3,
  			'title': 'Tarea ejemplo 3',
  			'completed': false,
  			'editing':false,
  		},
  	];

  }

  addTask(): void{

  	if(this.taskTitle.trim().length == 0){
  		return;
  	}

  	this.tasks.push({
  		id: this.idTask,
  		title: this.taskTitle,
  		completed: false,
  		editing: false
  	});

  	this.taskTitle = '';
  	this.idTask++;

  }

  editTask(task: Task):void{
  	this.beforeEditCache = task.title;
  	task.editing = true;
 }

 doneEdit(task: Task):void{

 	if(task.title.trim().length == 0){
 		task.title = this.beforeEditCache;
 	}

 	task.editing = false;
 }

 cancelEdit(task: Task):void{

 	task.title = this.beforeEditCache;
 	task.editing = false;
 }

  deleteTask(id:number): void{
  	this.tasks = this.tasks.filter(task => task.id !== id);
  }

  //muestra el numero de tareas que no están completas/pendientes
  remaining():number{
    return this.tasks.filter(task => !task.completed).length;
  }

  //permite mostrar boton limpiar completado siempre que haya al menos una tarea completada
  atLeastOneCompleted():boolean{
     return this.tasks.filter(task => task.completed).length > 0;
  }

  clearCompleted():void{
    this.tasks = this.tasks.filter(task => !task.completed);
  }

  checkAllTasks():void{
    this.tasks.forEach(task => task.completed = (<HTMLInputElement>event.target).checked);
  }

  tasksFiltered(): Task[] {
    if(this.filter == 'all'){
      return this.tasks;
    }else if(this.filter == 'active'){
      return this.tasks.filter(task => !task.completed);
    }else if(this.filter == 'completed'){
      return this.tasks.filter(task => task.completed);
    }

    return this.tasks;
  }

}


