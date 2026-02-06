import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-child',
  imports: [],
  templateUrl: './child.html',
  styleUrl: './child.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Child {

}
