import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appRole]',
  standalone: true
})
export class RoleDirective {

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}

  @Input() set appRole(value: { requiredRole: string, currentRole: string }) {
    this.viewContainer.clear();

    if (value.currentRole === value.requiredRole) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }
}