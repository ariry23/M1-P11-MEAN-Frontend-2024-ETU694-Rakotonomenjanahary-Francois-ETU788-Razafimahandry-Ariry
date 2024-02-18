import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { TokenService } from 'src/app/core/services/token.service';
import { filter } from 'rxjs/operators';
import { from } from 'rxjs';
export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  function?: any;
  badge?: {
    title?: string;
    type?: string;
  };
  children?: Navigation[];
}

export interface Navigation extends NavigationItem {
  children?: NavigationItem[];
}
const navigationItems = [
    {
      id: 'services-list',
      title: 'Services',
      type: 'item',
      url: '/service/list',
      classes: 'nav-item',
      icon: 'feather icon-sidebar',
      roles : ['customer'] , 
    },
    {
      id: 'reservation-rendez-vous',
      title: 'Historique rendez vous',
      type: 'item',
      url: '/rendez-vous/historique',
      classes: 'nav-item',
      icon: 'feather icon-sidebar', 
      roles : ['customer'] , 
    },
    {
      id: 'profil-horaire',
      title: 'Profil ',
      type: 'item',
      url: '/profil-horaire',
      classes: 'nav-item',
      icon: 'feather icon-sidebar', 
      roles : ['employee'] , 
    },
    {
      id: 'reservation-rendez-vous',
      title: 'Liste des rendez vous',
      type: 'item',
      url: '/rendez-vous/liste',
      classes: 'nav-item',
      icon: 'feather icon-sidebar', 
      roles : ['employee'] , 
    },
    {
      id: 'Personnel',
      title: 'gestion du personnel',
      type: 'item',
      url: '/personnel',
      classes: 'nav-item',
      icon: 'feather icon-sidebar', 
      roles : ['admin'] , 
    },
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard',
      classes: 'nav-item',
      icon: 'feather icon-sidebar', 
      roles : ['admin'] , 
    },
    {
      id: 'dashboard-benefice',
      title: 'Dashboard Benefice',
      type: 'item',
      url: '/dashboard-benefice',
      classes: 'nav-item',
      icon: 'feather icon-sidebar', 
      roles : ['admin'] , 
    },
    
    
  
];
/*let NavigationItems = [] ; 
if(1 < 2 )
{
  NavigationItems = customerNavigationItems ; 
} */

 /*
const NavigationItems = [
  {
    id: 'navigation',
    title: 'Navigation',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'dashboard',
        title: 'Dashboard',
        type: 'item',
        url: '/dashboard',
        icon: 'feather icon-home',
        classes: 'nav-item',
      },
    ],
  },
  {
    id: 'ui-element',
    title: 'UI ELEMENT',
    type: 'group',
    icon: 'icon-ui',
    children: [
      {
        id: 'basic',
        title: 'Component',
        type: 'collapse',
        icon: 'feather icon-box',
        children: [
          {
            id: 'button',
            title: 'Button',
            type: 'item',
            url: '/basic/button',
          },
          {
            id: 'badges',
            title: 'Badges',
            type: 'item',
            url: '/basic/badges',
          },
          {
            id: 'breadcrumb-pagination',
            title: 'Breadcrumb & Pagination',
            type: 'item',
            url: '/basic/breadcrumb-paging',
          },
          {
            id: 'collapse',
            title: 'Collapse',
            type: 'item',
            url: '/basic/collapse',
          },
          {
            id: 'tabs-pills',
            title: 'Tabs & Pills',
            type: 'item',
            url: '/basic/tabs-pills',
          },
          {
            id: 'typography',
            title: 'Typography',
            type: 'item',
            url: '/basic/typography',
          },
        ],
      },
    ],
  },
  {
    id: 'forms',
    title: 'Forms & Tables',
    type: 'group',
    icon: 'icon-group',
    children: [
      {
        id: 'forms-element',
        title: 'Form Elements',
        type: 'item',
        url: '/forms/basic',
        classes: 'nav-item',
        icon: 'feather icon-file-text',
      },
      {
        id: 'tables',
        title: 'Tables',
        type: 'item',
        url: '/tables/bootstrap',
        classes: 'nav-item',
        icon: 'feather icon-server',
      },
    ],
  },
  {
    id: 'chart-maps',
    title: 'Chart',
    type: 'group',
    icon: 'icon-charts',
    children: [
      {
        id: 'apexChart',
        title: 'ApexChart',
        type: 'item',
        url: 'apexchart',
        classes: 'nav-item',
        icon: 'feather icon-pie-chart',
      },
    ],
  },
  {
    id: 'pages',
    title: 'Pages',
    type: 'group',
    icon: 'icon-pages',
    children: [
      {
        id: 'auth',
        title: 'Authentication',
        type: 'collapse',
        icon: 'feather icon-lock',
        children: [
          {
            id: 'signup',
            title: 'Sign up',
            type: 'item',
            url: '/auth/signup',
            target: true,
            breadcrumbs: false,
          },
          {
            id: 'signin',
            title: 'Sign in',
            type: 'item',
            url: '/auth/signin',
            target: true,
            breadcrumbs: false,
          },
        ],
      },
      {
        id: 'sample-page',
        title: 'Sample Page',
        type: 'item',
        url: '/sample-page',
        classes: 'nav-item',
        icon: 'feather icon-sidebar',
      },
      {
        id: 'disabled-menu',
        title: 'Disabled Menu',
        type: 'item',
        url: 'javascript:',
        classes: 'nav-item disabled',
        icon: 'feather icon-power',
        external: true,
      },
      {
        id: 'service',
        title: 'service',
        type: 'group',
        icon: 'icon-ui',
        children: [
          {
            id: 'basic',
            title: 'Component',
            type: 'collapse',
            icon: 'feather icon-box',
            children: [
              {
                id: 'button',
                title: 'Liste',
                type: 'item',
                url: 'service/list',
              },
             
            ],
          },
        ],
      },
      {
        id: 'buy_now',
        title: 'Buy Now',
        type: 'item',
        icon: 'feather icon-book',
        classes: 'nav-item',
        url: 'https://codedthemes.com/item/datta-able-angular/',
        target: true,
        external: true,
      },
    ],
  },
];*/

@Injectable()
export class NavigationItem {
  constructor(private tokenService: TokenService){}
   arrayContainsElement(arr: any[], element: any): boolean {
    return arr.includes(element);
  }
  get() {
    let roleName : string = "" ; 
    if(this.tokenService.hasToken())
    {
      let decoded : any = jwtDecode(this.tokenService.getToken());
      roleName = decoded.role.name ; 
    }
    console.log("role name: " + roleName);
    let filteredNavigationItems : any[] = [] ; 
    let source = from(navigationItems) ; 
    if(roleName != "")
    { 
        let filtered = source.pipe(filter(navItem => navItem.roles.includes(roleName) === true))  ; 
        filtered.subscribe(val => filteredNavigationItems.push(val)) ; 
    }
    console.log("filtered items size" + filteredNavigationItems.length);
    return filteredNavigationItems;
  }
}
