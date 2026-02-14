import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../../../../services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-job-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './job-detail.html',
  styleUrl: './job-detail.scss'
})
export class JobDetail {
  id: string | null = null;
  currentJob: any = null;
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute, 
    private firebaseService: FirebaseService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  async ngOnInit() {
    console.log('Job Detail Init - ID:', this.id);
    if (this.id) {
      await this.getJob(this.id);
    } else {
      this.loading = false;
    }
  }

 goBack(): void {
    this.router.navigateByUrl('/');
    console.log("nabiagatiinf");
  }


  async getJob(id: string) {
    try {
      this.loading = true;
      console.log('Fetching jobs for ID:', id);
      const jobs = await this.firebaseService.getJobs();
      console.log('All jobs:', jobs);
      this.currentJob = jobs.find(job => job.id === id);
      console.log('Current job found:', this.currentJob);
    } catch (error) {
      console.error('Error fetching job:', error);
    } finally {
      this.loading = false;
      this.cdr.detectChanges();
      console.log('Loading complete. Current job:', this.currentJob);
    }
  }
}
