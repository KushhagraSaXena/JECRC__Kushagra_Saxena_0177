import { Directive, Input, ElementRef, OnChanges, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appTheme]',
  standalone: true
})
export class ThemeDirective implements OnChanges {

  @Input() appTheme: 'dark' | 'light' = 'light';

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnChanges() {
    if (this.appTheme === 'dark') {
      this.renderer.setStyle(this.el.nativeElement, 'background-color', '#121212');
      this.renderer.setStyle(this.el.nativeElement, 'color', '#ffffff');
    } else {
      this.renderer.setStyle(this.el.nativeElement, 'background-color', '#ffffff');
      this.renderer.setStyle(this.el.nativeElement, 'color', '#000000');
    }
  }
}