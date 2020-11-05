import { BreadcrumbSegment } from '../shared/component/breadcrumb/breadcrumb-segment.model';
import { BreadcrumbService } from '../shared/service/util/breadcrumb/breadcrumb.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.css']
})
export class CommunityComponent implements OnInit, OnDestroy {
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
