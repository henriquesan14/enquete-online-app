import {
  Directive,
  Input,
  OnInit,
  ElementRef,
  Renderer2
} from '@angular/core';
import { LocalstorageService } from '../services/local-storage.service';

@Directive({
  selector: '[isOwner]',
  standalone: true
})
export class IsOwnerDirective implements OnInit {
  @Input('isOwner') criadorId!: string;

  constructor(private elementRef: ElementRef, private renderer: Renderer2, private localStorageService: LocalstorageService) { }

  ngOnInit() {
    const usuarioLogado = this.localStorageService.getUserStorage();
    if (usuarioLogado.id != this.criadorId) {
      this.renderer.setStyle(this.elementRef.nativeElement, 'display', 'none');
      this.renderer.removeChild(this.elementRef.nativeElement.parentElement, this.elementRef.nativeElement);
    }
  }
}