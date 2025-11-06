
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FirebaseService } from '../../../services/firebase.service';

@Component({
  selector: 'app-admin-portal',
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-portal.html',
  styleUrl: './admin-portal.scss'
})
export class AdminPortal {
  jobs: any[] = [];

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
  async ngOnInit() {
    this.jobs = await this.firebaseService.getJobs();

    
  }

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
