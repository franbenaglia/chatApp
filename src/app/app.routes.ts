import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'folder/chat',
    pathMatch: 'full',
  },
  {
    path: 'folder/chat',
    loadComponent: () => import('./chat/chat.page').then( m => m.ChatPage)
  },
  {
    path: 'folder/groups',
    loadComponent: () => import('./groups/groups.page').then( m => m.GroupsPage)
  },
  {
    path: 'folder/members',
    loadComponent: () => import('./members/members.page').then( m => m.MembersPage)
  },
  {
    path: 'folder/:id',
    loadComponent: () =>
      import('./folder/folder.page').then((m) => m.FolderPage),
  },

 
];
