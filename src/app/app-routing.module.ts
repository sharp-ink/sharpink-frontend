import { AccessForbiddenComponent } from './access-forbidden/access-forbidden.component';
import { AccountManagementComponent } from './account-management/account-management.component';
import { ManageStoriesComponent } from './account-management/manage-stories/manage-stories.component';
import { PrivateProfileComponent } from './account-management/private-profile/private-profile.component';
import { SettingsComponent } from './account-management/settings/settings.component';
import { CommunityComponent } from './community/community.component';
import { ForumComponent } from './community/forum/forum.component';
import { ListMembersComponent } from './community/members/list-members/list-members.component';
import { MemberProfileComponent } from './community/members/member-profile/member-profile.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { SigninComponent } from './login/signin/signin.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './shared/service/guard/auth.guard';
import { CreateStoryComponent } from './story/create-story/create-story.component';
import { ListStoriesComponent } from './story/list-stories/list-stories.component';
import { PreviewStoryComponent } from './story/list-stories/preview-story/preview-story.component';
import { ReadRandomComponent } from './story/read-story/read-random/read-random.component';
import { ReadStoryComponent } from './story/read-story/read-story.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [

  { path: '', redirectTo: 'accueil', pathMatch: 'full' },

  { path: 'accueil', component: HomeComponent },

  { path: 'connexion', component: SigninComponent },

  { path: 'histoires', children: [
    { path: '', redirectTo: 'liste', pathMatch: 'full' },
    { path: 'liste', component: ListStoriesComponent, children: [
      { path: ':id/apercu', component: PreviewStoryComponent }
    ]
    },
    { path: 'creer', canActivate: [AuthGuard], component: CreateStoryComponent },
    { path: 'lire', children: [
      { path: 'au-hasard', component: ReadRandomComponent },
      { path: ':id', component: ReadStoryComponent }
    ]
    }
  ]
  },

  { path: 'mon-compte', canActivate: [AuthGuard], component: AccountManagementComponent, children: [
    { path: '', redirectTo: 'mon-profil', pathMatch: 'full' },
    { path: 'mon-profil', component: PrivateProfileComponent },
    { path: 'reglages', component: SettingsComponent },
    { path: 'mes-histoires', component: ManageStoriesComponent }
    ]
  },

  { path: 'communaute', component: CommunityComponent, children: [
    { path: '', redirectTo: 'membres', pathMatch: 'full' },
    { path: 'membres', component: ListMembersComponent, children: [
      { path: ':id', component: MemberProfileComponent }
    ]
    },
    { path: 'forum', component: ForumComponent }
  ]
  },

  { path: 'contact', component: ContactComponent },

  { path: '403-acces-interdit', component: AccessForbiddenComponent },
  { path: '404-page-inexistante', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/404-page-inexistante' }

];

@NgModule({
  declarations: [
    AccessForbiddenComponent,
    PageNotFoundComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {

}
