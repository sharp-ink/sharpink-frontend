import { AccountManagementComponent } from './account-management/account-management.component';
import { CreateStoryButtonsGroupComponent } from './account-management/manage-stories/create-story/create-story-buttons-group/create-story-buttons-group.component';
import { CreateStoryComponent } from './account-management/manage-stories/create-story/create-story.component';
import { StepMiscInfoComponent } from './account-management/manage-stories/create-story/step-misc-info/step-misc-info.component';
import { StepSummaryComponent } from './account-management/manage-stories/create-story/step-summary/step-summary.component';
import { StepThumbnailComponent } from './account-management/manage-stories/create-story/step-thumbnail/step-thumbnail.component';
import { StepTitleComponent } from './account-management/manage-stories/create-story/step-title/step-title.component';
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
import { LoadingComponent } from './shared/component/loading/loading.component';
import { AuthGuard } from './shared/service/guard/auth.guard';
import { MemberService } from './shared/service/member.service';
import { StoryService } from './shared/service/story.service';
import { ListStoriesComponent } from './story/list-stories/list-stories.component';
import { PreviewStoryComponent } from './story/list-stories/preview-story/preview-story.component';
import { ReadRandomComponent } from './story/read-story/read-random/read-random.component';
import { ReadStoryComponent } from './story/read-story/read-story.component';
import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import localeFr from '@angular/common/locales/fr';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { AlertModule } from 'ngx-bootstrap/alert';
import { DisplayPaginatedChapterComponent } from './story/read-story/display-paginated-chapter/display-paginated-chapter.component';
import { SelectChapterComponent } from './story/read-story/select-chapter/select-chapter.component';
import { PaginationComponent } from './shared/component/pagination/pagination.component';

// locale for french language
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
    PrivateProfileComponent,
    AccountManagementComponent,
    StepTitleComponent,
    CreateStoryButtonsGroupComponent,
    StepMiscInfoComponent,
    StepSummaryComponent,
    StepThumbnailComponent,
    LoadingComponent,
    DisplayPaginatedChapterComponent,
    SelectChapterComponent,
    PaginationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CKEditorModule,
    AlertModule.forRoot()
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr-FR' },
    StoryService,
    MemberService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
