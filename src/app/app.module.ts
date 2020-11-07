import { AccountManagementComponent } from './account-management/account-management.component';
import { CreateStoryButtonsGroupComponent } from './account-management/manage-stories/create-story/create-story-buttons-group/create-story-buttons-group.component';
import { CreateStoryComponent } from './account-management/manage-stories/create-story/create-story.component';
import { StepMiscInfoComponent } from './account-management/manage-stories/create-story/step-misc-info/step-misc-info.component';
import { StepSummaryComponent } from './account-management/manage-stories/create-story/step-summary/step-summary.component';
import { StepThumbnailComponent } from './account-management/manage-stories/create-story/step-thumbnail/step-thumbnail.component';
import { StepTitleComponent } from './account-management/manage-stories/create-story/step-title/step-title.component';
import { EditChapterComponent } from './account-management/manage-stories/edit-chapter/edit-chapter.component';
import { EditStoryComponent } from './account-management/manage-stories/edit-story/edit-story.component';
import { ManageStoriesHomeComponent } from './account-management/manage-stories/manage-stories-home/manage-stories-home.component';
import { ManageStoriesComponent } from './account-management/manage-stories/manage-stories.component';
import { PrivateProfileComponent } from './account-management/private-profile/private-profile.component';
import { SettingsComponent } from './account-management/settings/settings.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommunityHomeComponent } from './community/community-home/community-home.component';
import { CommunityComponent } from './community/community.component';
import { ForumComponent } from './community/forum/forum.component';
import { ReadThreadComponent } from './community/forum/read-thread/read-thread.component';
import { LastActivityComponent } from './community/last-activity/last-activity.component';
import { ListMembersComponent } from './community/members/list-members/list-members.component';
import { MemberProfileComponent } from './community/members/member-profile/member-profile.component';
import { ContactComponent } from './contact/contact.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { LoginStatusComponent } from './login/login-status.component';
import { SigninComponent } from './login/signin/signin.component';
import { NavComponent } from './nav/nav.component';
import { BreadcrumbComponent } from './shared/component/breadcrumb/breadcrumb.component';
import { LoadingComponent } from './shared/component/loading/loading.component';
import { PaginationComponent } from './shared/component/pagination/pagination.component';
import { AuthGuard } from './shared/service/guard/auth.guard';
import { CreateStoryStepsFormGuard } from './shared/service/guard/create-story-steps-form.guard';
import { StoryService } from './shared/service/story.service';
import { UserService } from './shared/service/user.service';
import { ListStoriesComponent } from './story/list-stories/list-stories.component';
import { PreviewStoryComponent } from './story/list-stories/preview-story/preview-story.component';
import { DisplayPaginatedChapterComponent } from './story/read-story/display-paginated-chapter/display-paginated-chapter.component';
import { ReadRandomComponent } from './story/read-story/read-random/read-random.component';
import { ReadStoryComponent } from './story/read-story/read-story.component';
import { SelectChapterComponent } from './story/read-story/select-chapter/select-chapter.component';
import { TestComponent } from './test/test.component';
import { CommonModule } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import localeFr from '@angular/common/locales/fr';
import { LOCALE_ID, NgModule, SecurityContext } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ImageCropperModule } from 'ngx-image-cropper';
import { MarkdownModule } from 'ngx-markdown';
import { ToastrModule } from 'ngx-toastr';

// locale for french language
registerLocaleData(localeFr);

const toastrConfig = {
  closeButton: true,
  enableHtml: true,
  newestOnTop: false,
  timeOut: 4000
};

@NgModule({
  declarations: [
    // main component
    AppComponent,
    // application components
    AccountManagementComponent,
    BreadcrumbComponent,
    CommunityComponent,
    CommunityHomeComponent,
    ContactComponent,
    CreateStoryButtonsGroupComponent,
    CreateStoryComponent,
    DisplayPaginatedChapterComponent,
    EditChapterComponent,
    EditStoryComponent,
    ForumComponent,
    HomeComponent,
    HeaderComponent,
    LastActivityComponent,
    ListMembersComponent,
    ListStoriesComponent,
    LoadingComponent,
    LoginStatusComponent,
    ManageStoriesComponent,
    ManageStoriesHomeComponent,
    MemberProfileComponent,
    NavComponent,
    PaginationComponent,
    PreviewStoryComponent,
    PrivateProfileComponent,
    ReadRandomComponent,
    ReadStoryComponent,
    ReadThreadComponent,
    SelectChapterComponent,
    SettingsComponent,
    SigninComponent,
    StepMiscInfoComponent,
    StepSummaryComponent,
    StepThumbnailComponent,
    StepTitleComponent,
    TestComponent
  ],
  entryComponents: [
    PreviewStoryComponent
  ],
  imports: [
    // main modules
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    CommonModule,
    FormsModule, ReactiveFormsModule,
    HttpClientModule,
    // vendor modules
    MarkdownModule.forRoot({ loader: HttpClient }), // ngx-markdown (Markdown parser)
    ModalModule.forRoot(), // ngx-bootstrap
    PaginationModule.forRoot(), // ngx-bootstrap
    CKEditorModule, // WYSIWYG editor
    ToastrModule.forRoot(toastrConfig), // ngx-toastr (Toastr notifications)
    ImageCropperModule // ngx-image-cropper (image cropper)
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr-FR' },
    StoryService,
    UserService,
    AuthGuard,
    CreateStoryStepsFormGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
