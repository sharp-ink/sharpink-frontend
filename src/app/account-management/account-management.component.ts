import { BreadcrumbSegment } from '../shared/component/breadcrumb/breadcrumb-segment.model';
import { BreadcrumbService } from '../shared/service/util/breadcrumb/breadcrumb.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-account-management',
  templateUrl: './account-management.component.html',
  styleUrls: ['./account-management.component.scss']
})
export class AccountManagementComponent implements OnInit, OnDestroy {
  breadcrumbSegments: BreadcrumbSegment[];
  subscription: Subscription;

  constructor(private breadcrumbService: BreadcrumbService) { }

  ngOnInit() {
    this.breadcrumbService.breadcrumbSegmentsSubject.subscribe((breadcrumbSegments: BreadcrumbSegment[]) => {
      this.breadcrumbSegments = breadcrumbSegments;
    });

    this.breadcrumbService.setBreadcrumbSegmentsForCurrentPage();
    this.subscription = this.breadcrumbService.subscribeToRouterEvents();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
