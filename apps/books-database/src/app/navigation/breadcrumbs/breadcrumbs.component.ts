import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BreadCrumb } from './breadcrumbs';
import { filter, distinctUntilChanged, map} from "rxjs/operators";
import { UtilitiesService } from "../../services/utilities.service";

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BreadcrumbsComponent implements OnInit {
  breadcrumbs$ = this.router.events.pipe(
    filter(event => event instanceof NavigationEnd),
    distinctUntilChanged(),
    map(event => this.buildBreadCrumb(this.activatedRoute.root)));

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private utilities: UtilitiesService) {
  }

  ngOnInit() {
  }

  buildBreadCrumb(route: ActivatedRoute, url: string = '', breadcrumbs: Array<BreadCrumb> = []): Array<BreadCrumb> {
    let name, breadcrumb, newBreadcrumbs = [...breadcrumbs], nextUrl;
    nextUrl = `${url}${route.routeConfig ? route.routeConfig.path : ''}/`;
    if (route.routeConfig) {
      if (route.routeConfig.data) {
        let breadcrumbStr = route.routeConfig.data['breadcrumb'];
        if (breadcrumbStr.indexOf("/") > -1) {
          let routes = breadcrumbStr.split('/');
          for (let i = 0; i < routes.length; i++) {
            nextUrl = `${url}${routes[i]}/`;

            if (routes[i] === "book-details") {
              breadcrumb = {
                name: (this.utilities.replaceAll(route.params["value"].author, '-', ' ') +
                  " / " +
                  this.utilities.replaceAll(route.params["value"].title, '-', ' ')),
                url: ""
              };
            } else if (routes[i] === "search-query") {
              breadcrumb = {
                name: route.params["value"].query,
                url: ""
              };
            } else if (routes[i] === "search") {
              breadcrumb = {
                name: "search",
                url: ""
              };
            }else {
              breadcrumb = {
                name: routes[i],
                url: nextUrl
              };
            }
            newBreadcrumbs = [...newBreadcrumbs, breadcrumb];
          }
        } else {
          name = breadcrumbStr;
          breadcrumb = {
            name: name,
            url: nextUrl
          };
          newBreadcrumbs = [...newBreadcrumbs, breadcrumb];
        }
    }
    } else {
      // name = 'Books';
      // breadcrumb = {
      //   name: name,
      //   url: '/'
      // };
      // newBreadcrumbs = [...newBreadcrumbs, breadcrumb];
    }
   
    if (route.firstChild) {
      return this.buildBreadCrumb(route.firstChild, nextUrl, newBreadcrumbs);
    }
    return newBreadcrumbs;
  }
}

