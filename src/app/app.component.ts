import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,AutocompleteComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
 
}
