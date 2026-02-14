import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})

export class Home {
  jobs: any[] = [];
  loading: boolean = true;

  constructor(private router: Router, private firebaseService: FirebaseService, private cdr: ChangeDetectorRef) {}
  
  async ngOnInit() {
    try {
      this.loading = true;
      console.log('Fetching jobs...');
      this.jobs = await this.firebaseService.getJobs();
      console.log('Jobs fetched:', this.jobs);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      this.loading = false;
      console.log('Loading complete. Jobs count:', this.jobs.length);
      this.cdr.detectChanges();
    }
  }

  apply(id: string) {
    this.router.navigate(['/job-details', id]);
  }
}
