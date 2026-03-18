import { Directive, Input, HostListener, HostBinding, OnChanges } from '@angular/core';

@Directive({
  selector: '[appClickBlock]',
  standalone: true
})
export class ClickBlockDirective implements OnChanges {

  @Input() appClickBlock: boolean = true;

  @HostBinding('style.opacity') opacity = '1';
  @HostBinding('style.pointerEvents') pointerEvents = 'auto';

  constructor() {}

  ngOnChanges() {
    this.opacity = this.appClickBlock ? '1' : '0.5';
    this.pointerEvents = this.appClickBlock ? 'auto' : 'none';
  }

  @HostListener('click', ['$event'])
  onClick(event: Event) {
    if (!this.appClickBlock) {
      event.preventDefault();
      event.stopImmediatePropagation();
      console.log('❌ Click Blocked');
    }
  }
}