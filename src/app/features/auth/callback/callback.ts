import { Component } from '@angular/core';
import { LocalstorageService } from '../../../shared/services/local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-callback',
  imports: [],
  templateUrl: './callback.html',
  styleUrl: './callback.css'
})
export class Callback {
  constructor(
    private localStorageService: LocalstorageService,
    private router: Router, 
  ) {}

  ngOnInit(): void {
    const fragment = window.location.hash.substring(1);
    const params = new URLSearchParams(fragment);
    const base64Data = params.get('data');

    if (base64Data) {
      const json = atob(base64Data);
      const userResponse = JSON.parse(json);

      this.localStorageService.setUserStorage(userResponse);

      this.router.navigate(['/enquetes']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
