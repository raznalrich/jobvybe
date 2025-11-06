import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';


import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})

export class Home {
  jobs = [
    { title: 'Frontend Developer', company: 'Tech Solutions', location: 'Remote' },
    { title: 'Backend Engineer', company: 'InnovateX', location: 'New York, NY' },
    { title: 'UI/UX Designer', company: 'Creative Minds', location: 'San Francisco, CA' }
  ];

  constructor(private router: Router) {}

  apply(id: number) {
    this.router.navigate(['/job-details', id]);
  }
}
