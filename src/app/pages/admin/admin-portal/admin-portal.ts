
import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FirebaseService } from '../../../services/firebase.service';

@Component({
  selector: 'app-admin-portal',
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-portal.html',
  styleUrl: './admin-portal.scss'
})
export class AdminPortal {
  jobs = signal<any[]>([]);

  showAddModal = signal(false);
  isEditMode = signal(false);
  editingIndex = signal(-1);
  
  // Use regular object for ngModel binding
  newJob = {
    title: '',
    company: '',
    location: '',
    type: '',
    image: '',
    description: ''
  };

  constructor(private firebaseService: FirebaseService) {}
  
  async ngOnInit() {
    await this.loadJobs();
  }

  async loadJobs() {
    const jobsList = await this.firebaseService.getJobs();
    this.jobs.set(jobsList);
  }

  openAddModal() {
    this.isEditMode.set(false);
    this.editingIndex.set(-1);
    this.newJob = {
      title: '', company: '', location: '', type: '', image: '', description: ''
    };
    this.showAddModal.set(true);
  }

  editJob(index: number) {
    this.isEditMode.set(true);
    this.editingIndex.set(index);
    const job = this.jobs()[index];
    this.newJob = { ...job };
    this.showAddModal.set(true);
  }

  closeModal() {
    this.showAddModal.set(false);
    this.isEditMode.set(false);
    this.editingIndex.set(-1);
    this.newJob = {
      title: '', company: '', location: '', type: '', image: '', description: ''
    };
  }

  async saveJob() {
    const job = this.newJob;
    if (
      job.title &&
      job.company &&
      job.location &&
      job.type &&
      job.description
    ) {
      if (this.isEditMode()) {
        // Update existing job
        const jobId = this.jobs()[this.editingIndex()].id;
        await this.firebaseService.updateJob(jobId, job);
        await this.loadJobs();
      } else {
        // Add new job
        await this.firebaseService.addJob(job);
        await this.loadJobs();
      }
      this.closeModal();
    }
  }

  async deleteJob(index: number) {
    if (confirm('Are you sure you want to delete this job?')) {
      const jobId = this.jobs()[index].id;
      await this.firebaseService.deleteJob(jobId);
      await this.loadJobs();
    }
  }
}
