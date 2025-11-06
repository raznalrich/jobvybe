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

  constructor(private router: Router,private firebaseService: FirebaseService,private cdr: ChangeDetectorRef) {}
  async ngOnInit() {
    this.jobs = await this.firebaseService.getJobs();
    this.loading = false;
    this.cdr.detectChanges();
  }

  apply(id: number) {
    this.router.navigate(['/job-details', id]);
  }
}
