import { Component, OnInit } from '@angular/core';

import { Task } from '../../interfaces/Task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

	tasks: Task[];
	idTask: number;
	taskTitle: string;
	beforeEditCache: string;

  constructor() { }

  ngOnInit() {

  	this.beforeEditCache = '';
  	this.idTask = 4;
  	this.taskTitle = '';
  	this.tasks = [
  		{
  			'id': 1,
  			'title': 'Finish Web App with Angular7',
  			'completed': false,
  			'editing':false,
  		},
  		{
  			'id': 2,
  			'title': 'Send email to Juan',
  			'completed': false,
  			'editing':false,
  		},
  		{
  			'id': 3,
  			'title': 'Shut up my mouth',
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

}


