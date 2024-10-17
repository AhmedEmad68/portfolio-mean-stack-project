import { Component } from '@angular/core'; 

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']  
})
export class HeaderComponent {
  isDarkMode: boolean = false;

  
  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;

    if (this.isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }

    const iconElement = document.getElementById('darkModeIcon');
    if (iconElement) {
      iconElement.classList.add('dark-mode-icon');

      setTimeout(() => {
        iconElement.classList.remove('dark-mode-icon');
      }, 500);
    }
  }

 
}
