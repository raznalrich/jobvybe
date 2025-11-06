import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-job-detail',
  imports: [],
  templateUrl: './job-detail.html',
  styleUrl: './job-detail.scss'
})
export class JobDetail {
  id: string | null = null;
 jobs = [
    { title: 'Frontend Developer', company: 'Tech Solutions', location: 'Remote' },
    { title: 'Backend Engineer', company: 'InnovateX', location: 'New York, NY' },
    { title: 'UI/UX Designer', company: 'Creative Minds', location: 'San Francisco, CA' }
  ];
  constructor(private route: ActivatedRoute) {
    this.id = this.route.snapshot.paramMap.get('id');
  }
}
