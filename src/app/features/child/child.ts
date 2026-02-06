import { ChangeDetectionStrategy, Component, contentChild } from '@angular/core';

@Component({
  selector: 'app-child',
  imports: [],
  templateUrl: './child.html',
  styleUrl: './child.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Child {

  // headerContent = contentChild('header');
  bodyContent = contentChild('body');
  // aditionalInfoContent = contentChild('aditionalInfo');
}
