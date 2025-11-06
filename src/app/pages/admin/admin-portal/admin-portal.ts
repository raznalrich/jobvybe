
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FirebaseService } from '../../../services/firebase.service';

@Component({
  selector: 'app-admin-portal',
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-portal.html',
  styleUrl: './admin-portal.scss'
})
export class AdminPortal {
  jobs = [
    { title: 'Frontend Developer', company: 'Tech Solutions', location: 'Remote' },
    { title: 'Backend Engineer', company: 'InnovateX', location: 'New York, NY' },
    { title: 'UI/UX Designer', company: 'Creative Minds', location: 'San Francisco, CA' }
  ];

  showAddModal = false;
  newJob: any = {
    title: '',
    company: '',
    location: '',
    type: '',
    image: '',
    description: ''
  };

  constructor(private firebaseService: FirebaseService) {}

  async addJob() {
    if (
      this.newJob.title &&
      this.newJob.company &&
      this.newJob.location &&
      this.newJob.type &&
      this.newJob.description
    ) {
      await this.firebaseService.addJob(this.newJob);
      this.showAddModal = false;
      this.newJob = {
        title: '', company: '', location: '', type: '', image: '', description: ''
      };
      // Optionally, refresh jobs from Firebase here
    }
  }
}
