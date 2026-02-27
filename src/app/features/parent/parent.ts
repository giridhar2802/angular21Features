import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Child } from '../child/child';

@Component({
  selector: 'app-parent',
  imports: [Child],
  templateUrl: './parent.html',
  styleUrl: './parent.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Parent {

}
