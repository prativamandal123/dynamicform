import { Component } from '@angular/core';
import { AutocompleteComponent } from "../autocomplete/autocomplete.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [AutocompleteComponent,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
   selectedContent: string | null = null;

  displayContent(contentName: string): void {
    this.selectedContent = contentName;
}
}
