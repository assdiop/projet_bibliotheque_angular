import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-forbidden',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './forbidden.component.html',
  styleUrl: './forbidden.component.css'
})
export class ForbiddenComponent {

   private router = inject(Router);
  private route = inject(ActivatedRoute);
  private location = inject(Location);

  private returnUrl: string | null = null;

  ngOnInit(): void {
    // Récupère returnUrl si ton guard la fournit en query param
    this.returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
  }

  goBack(): void {
    if (this.returnUrl) {
      this.router.navigateByUrl(this.returnUrl);
      return;
    }
    if (window.history.length > 1) {
      this.location.back();
    } else {
      this.router.navigate(['/']);
    }
  }

  contact(): void {
    // Remplace par ton flux réel (page contact, mailto, modal, etc.)
    this.router.navigate(['/contact']);
  }

}
