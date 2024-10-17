import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../project.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css']
})
export class DashboardComponent implements OnInit {
  projects: any[] = [];
  isEdit: boolean = false;  // Add this variable to track if you're editing
  currentProject: any = { title: '', description: '', link: '', imageUrl: '' };  // Store current project
  

  constructor(private projectService: ProjectService,private router: Router) {}

  ngOnInit(): void {
    this.projectService.getProjects().subscribe((projects) => {
      this.projects = projects;
    });
  }

  // Handle when you want to edit a project
  editProject(project: any) {
    this.isEdit = true;
    this.currentProject = { ...project };  // Load project data into currentProject
  }

  // Handle when you want to add a new project
  addProject() {
    this.isEdit = false;
    this.currentProject = { title: '', description: '', link: '', imageUrl: '' };  // Reset the form
  }

  // Save project (either add or update)
  saveProject() {
    if (this.isEdit) {
      if (this.currentProject._id) {
        this.projectService.updateProject(this.currentProject._id, this.currentProject).subscribe(
          (response) => {
            console.log('Project updated:', response);
            this.isEdit = false;
            this.refreshProjects(); 
          },
          (error) => {
            console.error('Error updating project:', error);
          }
        );
      }
    } else {
      this.projectService.addProject(this.currentProject).subscribe(() => {
        this.refreshProjects();
      });
    }
  }
  
  // Delete project
  deleteProject(id: string) {
    this.projectService.deleteProject(id).subscribe(() => {
      this.projects = this.projects.filter((project) => project._id !== id);
    });
  }

  refreshProjects() {
    this.projectService.getProjects().subscribe((projects) => {
      this.projects = projects;
    });
  }
  logout() {
    localStorage.removeItem('token');
    
    this.router.navigate(['/login']);
  }
}
