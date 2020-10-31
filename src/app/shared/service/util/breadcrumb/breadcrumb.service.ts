import { BreadcrumbSegment } from '../../../component/breadcrumb/breadcrumb-segment.model';
import { Injectable, Input } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class BreadcrumbService {
    readonly HOME_BREADCRUMB_SEGMENT: BreadcrumbSegment = { title: 'Sharpink', url: '/' };

    constructor(private router: Router) { }

    setBreadcrumbSegmentsForCurrentPage(breadcrumbSegments: BreadcrumbSegment[], currentUrl?: string) {
        breadcrumbSegments.splice(0);
        breadcrumbSegments.push(this.HOME_BREADCRUMB_SEGMENT);

        if (!currentUrl) {
            currentUrl = this.router.url;
        }

        const urlSegments = currentUrl.split('/');
        const rootPath = urlSegments[1]; // rootPath[0] is always ""
        const currentPagePath = urlSegments[urlSegments.length - 1];

        if (rootPath === 'mon-compte') {
            breadcrumbSegments.push({ title: 'Mon compte', url: '/mon-compte' });
            if (currentPagePath === 'mes-histoires') {
                breadcrumbSegments.push({ title: 'Mes histoires' });
            } else if (currentPagePath === 'mon-profil') {
                breadcrumbSegments.push({ title: 'Mon profil' });
            } else if (currentPagePath === 'reglages') {
                breadcrumbSegments.push({ title: 'Préférences' });
            }
        } else if (rootPath === 'communaute') {
            breadcrumbSegments.push({ title: 'Communauté', url: '/communaute' });
            if (currentPagePath === 'membres') {
                breadcrumbSegments.push({ title: 'Membres' });
            } else if (currentPagePath === 'forum') {
                breadcrumbSegments.push({ title: 'Forum' });
            } else if (urlSegments[2] === 'membres' && urlSegments[3]) {
                breadcrumbSegments.push({ title: 'Membres', url: '/communaute/membres' });
                breadcrumbSegments.push({ title: 'Consultation profil' });
            }
        // TODO other cases
        }
    }

    subscribeToRouterEvents(breadcrumbSegments: BreadcrumbSegment[]): Subscription {
        return this.router.events.subscribe((event: Event) => {
            if (event instanceof NavigationEnd) {
                this.setBreadcrumbSegmentsForCurrentPage(breadcrumbSegments, event.url);
            }
        });
    }
}
