import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  // Redirect
  { path: '', redirectTo: 'upload-file', pathMatch: 'full' },

   {
    path: 'upload-file',
    loadChildren: () =>
      import('./modules/uploads/uploads.module').then((m) => m.UploadsModule),
  },

  // Auth (login, register) – without layout
  // {
  //   path: 'auth',
  //   loadChildren: () =>
  //     import('./modules/auth/auth.module').then((m) => m.AuthModule),
  // },

  // Layout wrapped section
  // {
  //   path: '',
  //   loadComponent: () =>
  //     import('./layout/layout.component').then((m) => m.LayoutComponent),
  //   canActivate: [authGuard],
  //   children: [
  //     {
  //       path: 'upload-file',
  //       loadChildren: () =>
  //         import('./modules/uploads/uploads.module').then(
  //           (m) => m.UploadsModule
  //         ),
  //       title: 'Upload File',
  //     },
  //     {
  //       path: 'dashboard',
  //       loadChildren: () =>
  //         import('./modules/dashboard/dashboard.module').then(
  //           (m) => m.DashboardModule
  //         ),
  //       title: 'Dashboard',
  //     },
  //     {
  //       path: 'settings',
  //       loadChildren: () =>
  //         import('./modules/settings/settings.module').then(
  //           (m) => m.SettingsModule
  //         ),
  //       title: 'Dashboard',
  //     },
  //   ],
  // },

  // Wildcard
  { path: '**', redirectTo: 'upload-file' },
];
