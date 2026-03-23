import { Component ,
    OnInit,
  AfterViewInit,
  ElementRef,
  ViewChild
} from '@angular/core';

import { CommonModule } from '@angular/common';
import {HttpClient} from '@angular/common/http';
import { fromEvent, of, BehaviorSubject } from 'rxjs';
import { switchMap, map, filter, mergeMap, debounceTime, } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs-demo-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rxjs-demo-component.component.html',
  styleUrl: './rxjs-demo-component.component.css'
})
export class RxjsDemoComponent implements OnInit, AfterViewInit {

  @ViewChild('clickBtn') clickBtn!: ElementRef;
  @ViewChild('searchBox') searchBox!: ElementRef;

  observableOutput: any[] = [];
  mapOutput: any[] = [];
  filterOutput: any[] = [];
  behaviorOutput: any[] = [];
  clickOutput: any[] = [];
  searchOutput: any[] = [];
  mergeMapOutput: any[] = [];
  multiMapOutput: any[] = [];

  loading = false;
  
  constructor(private http: HttpClient) { } 
  

  //✅NON DOM Logic
  ngOnInit(): void {
    // Example of creating an observable from an array
    const observable$ = of(1, 2, 3, 4, 5);

    //observable
    observable$.subscribe(val=> {
      this.observableOutput.push(val);
    });

    //map
    observable$.pipe(
      map(val => val * 10)
    ).subscribe(res => {
      this.mapOutput.push(res);
    });

    //Filter + Map
    observable$.pipe(
      filter(val => val % 2 === 0),
      map(val => val * 100)
    ).subscribe(res => {
      this.filterOutput.push(res);
    });

    //Multiple Observables map
    observable$.pipe(
      map(x => x+1),
      map(x => x+2),
      map(x => `Final: ${x}`)
    ).subscribe(res => {
      this.multiMapOutput.push(res);
    });

    //MergeMap (Parallel API calls)
    of(1,2,3).pipe(
      mergeMap(id => this.http.get(`https://jsonplaceholder.typicode.com/posts/${id}`))
    ).subscribe(res => {
      this.mergeMapOutput.push(res);
    }); 
  }

  ngAfterViewInit(): void {
    // Click button event listener
    fromEvent(this.clickBtn.nativeElement, 'click')
      .pipe(
        map(() => Math.random())
      )
      .subscribe(val => {
        this.clickOutput.push(val);
      });

    // Search box input with filter + debounceTime + switchMap
    fromEvent(this.searchBox.nativeElement, 'input')
      .pipe(
        
        // ⏳ wait for typing to stop 
        debounceTime(500),

        //🎯get input value
        map((event: any) => event.target.value.trim()),

        // allow only 3+ chars
        filter(text => text.length >= 3),

        //cancel prevous request and make new API call
        switchMap(text => {
          this.loading = true;
          return this.http.get<any[]>(`https://jsonplaceholder.typicode.com/posts?title_like=${text}`);
        })
      )
      .subscribe({
        next: (res) => {
          this.searchOutput = res;
          this.loading = false;
        },
        error: (err) => {
          console.error('Search API error:', err);
          this.searchOutput = [];
          this.loading = false;
        },
        complete: () => {
          console.log('Search stream completed');
        }
     });
  }
}