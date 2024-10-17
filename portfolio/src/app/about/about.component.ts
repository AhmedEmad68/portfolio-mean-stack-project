import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  startDate: Date = new Date('2024-10-13');
  years: number = 0;
  months: number = 0;

  ngOnInit() {
    this.calculateExperience();
    setInterval(() => {
      this.calculateExperience();
    }, 1000);  
  }

  calculateExperience() {
    const now = new Date();
    const yearsDiff = now.getFullYear() - this.startDate.getFullYear();
    const monthsDiff = now.getMonth() - this.startDate.getMonth();

    if (monthsDiff < 0) {
      this.years = yearsDiff - 1;
      this.months = 12 + monthsDiff;
    } else {
      this.years = yearsDiff;
      this.months = monthsDiff;
    }
  }
}
