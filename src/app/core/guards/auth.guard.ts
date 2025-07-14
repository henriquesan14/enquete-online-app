import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { LocalstorageService } from "../../shared/services/local-storage.service";

export const AuthGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
    const storageService = inject(LocalstorageService);
    const router = inject(Router);
    if (storageService.getUserStorage()) {
        return true;
    }
    router.navigate(['/login']);
    return false;
}