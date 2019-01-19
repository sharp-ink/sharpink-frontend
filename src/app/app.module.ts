import { ManageStoriesComponent } from './account-management/manage-stories/manage-stories.component';
import { PrivateProfileComponent } from './account-management/private-profile/private-profile.component';
import { SettingsComponent } from './account-management/settings/settings.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommunityComponent } from './community/community.component';
import { ForumComponent } from './community/forum/forum.component';
import { LastActivityComponent } from './community/last-activity/last-activity.component';
import { ListMembersComponent } from './community/members/list-members/list-members.component';
import { MemberProfileComponent } from './community/members/member-profile/member-profile.component';
import { ContactComponent } from './contact/contact.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { LoginStatusComponent } from './login/login-status.component';
import { SigninComponent } from './login/signin/signin.component';
import { NavComponent } from './nav/nav.component';
import { AuthService } from './shared/service/auth.service';
import { AuthGuard } from './shared/service/guard/auth-guard.service';
import { MemberService } from './shared/service/member.service';
import { StoryService } from './shared/service/story.service';
import { CreateStoryComponent } from './story/create-story/create-story.component';
import { ListStoriesComponent } from './story/list-stories/list-stories.component';
import { PreviewStoryComponent } from './story/list-stories/preview-story/preview-story.component';
import { ReadRandomComponent } from './story/read-story/read-random/read-random.component';
import { ReadStoryComponent } from './story/read-story/read-story.component';
import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import localeFr from '@angular/common/locales/fr';
import { LOCALE_ID, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

// locale pour le français
registerLocaleData(localeFr);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    NavComponent,
    ContactComponent,
    CreateStoryComponent,
    ListStoriesComponent,
    ReadStoryComponent,
    ReadRandomComponent,
    ManageStoriesComponent,
    SettingsComponent,
    MemberProfileComponent,
    ListMembersComponent,
    PreviewStoryComponent,
    CommunityComponent,
    LoginStatusComponent,
    SigninComponent,
    ForumComponent,
    LastActivityComponent,
    PrivateProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr-FR' },
    StoryService,
    MemberService,
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
