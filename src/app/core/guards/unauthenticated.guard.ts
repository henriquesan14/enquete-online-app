import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { inject } from "@angular/core";
import { LocalstorageService } from "../../shared/services/local-storage.service";

export const UnauthenticadedGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
    const storageService = inject(LocalstorageService);
    const router = inject(Router);
    if (storageService.getUserStorage()) {
        router.navigateByUrl('/enquetes');
        return false;
    }
    return true;
}