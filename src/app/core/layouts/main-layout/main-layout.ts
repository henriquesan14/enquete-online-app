import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NzDropdownMenuComponent, NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { AuthService } from '../../../shared/services/auth.service';
import { LocalstorageService } from '../../../shared/services/local-storage.service';

@Component({
  selector: 'app-main-layout',
  imports: [NzLayoutModule, CommonModule, NzIconModule, NzMenuModule, RouterModule, NzDropdownMenuComponent, NzDropDownModule,
    NzSpinModule
  ],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css'
})
export class MainLayout {
  isLoggingOut = false;
  private router = inject(Router);
  private localStorageService = inject(LocalstorageService);
  private authService = inject(AuthService);
  
  goToProfile() {
    this.router.navigateByUrl('/account/update-password');
  }

  logout() {
    this.isLoggingOut = true;
    this.authService.logout().subscribe({
      next: () => {
        this.localStorageService.removeUsertorage();
        this.router.navigateByUrl('/login');
        this.isLoggingOut = false;
      }
    })
  }

  get nomeUsuario(){
    const response = this.localStorageService.getUserStorage();
    return response?.nome;
  }

  get avatar(){
    const response = this.localStorageService.getUserStorage();
    if(response && response.avatarUrl){
      return response.avatarUrl;
    }
    return '/images/icon-lol.png';
  }
}
