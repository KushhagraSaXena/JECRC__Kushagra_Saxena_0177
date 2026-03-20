import { 
  Component,
  Input,
  OnChanges,
  DoCheck,
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked,
  OnDestroy,
  SimpleChange,
  SimpleChanges
} from '@angular/core';

import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-order-child',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './order-child.component.html',
  styleUrls: ['./order-child.component.css']
})
export class OrderChildComponent implements 
OnChanges, 
DoCheck, 
AfterContentInit, 
AfterContentChecked, 
AfterViewInit, 
AfterViewChecked, 
OnDestroy {
  @Input() orderData: any;

  logs : string[] =[];

  log(message: string) {
    this.logs.push(`${new Date().toLocaleTimeString()} - ${message}`);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.log('💹 ngOnChanges - Input data Changed');
  }

  ngDoCheck() {
    this.log('🔍 ngDoCheck - Component Initialized or Change Detected');
  }

  ngAfterContentInit() {
    this.log('📦 ngAfterContentInit - Content Initialized');
  }

  ngAfterContentChecked() {
    this.log('✅ ngAfterContentChecked - Content Checked');
  }

  ngAfterViewInit() {
    this.log('👁️ ngAfterViewInit - View Initialized');
  }

  ngAfterViewChecked() {
    this.log('✅ ngAfterViewChecked - View Checked');
  }

  ngOnDestroy() {
    this.log('💥ngOnDestroy - Component Destroyed');
  }

}

