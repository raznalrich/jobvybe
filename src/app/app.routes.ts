import { Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { JobDetail } from './pages/home/pages/job-detail/job-detail';

export const routes: Routes = [
	{ path: '', component: Home },
	{
		path: 'job-details/:id',
		component: JobDetail
	},
	{
		path: 'admin',
		loadChildren: () => import('./pages/admin/admin-module').then(m => m.AdminModule)
	}
];
