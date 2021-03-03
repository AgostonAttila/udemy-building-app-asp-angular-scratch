import {
  Directive,
  Input,
  ViewContainerRef,
  TemplateRef,
  OnInit
} from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Directive({
  selector: '[appHasRole]' // *appHasRole
})
export class HasRoleDirective implements OnInit {
  @Input() appHasRole: string[];
  inVisible = false;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const userRoles = this.authService.decodedToken.role as Array<string>;

    if (!userRoles) {
      // if no roles clear the viewContainerRef
      this.viewContainerRef.clear();
    }

    // if user has roleneed then render the element
    if (this.authService.roleMatch(this.appHasRole)) {
      if (!this.inVisible) {
        this.inVisible = true;
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      } else {
        this.inVisible = false;
        this.viewContainerRef.clear();
      }
    }
  }
}
