import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../project.service';  

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  projects: any[] = [];

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.projectService.getProjects().subscribe(
      (data) => {
        this.projects = data;
      },
      (error) => {
        console.error('Error fetching projects:', error);
        if (error.status === 0) {
          console.error('Connection error. Check if Node.js server is running and CORS is enabled.');
        }
      }
    );
    
  }

  
}

