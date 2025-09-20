import { Component, HostListener } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet,RouterModule, FormsModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  isMenuOpen = false; // mobile sidebar
  isSidebarHidden = true; // PC sidebar complètement masquée
  profileMenuOpen = false;
  screenWidth: number = window.innerWidth;

  submenuOpen: { [key: string]: boolean } = {};

  constructor(public authService: AuthService, private router:Router){}

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
  }

  isSmallScreen(): boolean {
    return this.screenWidth < 992;
  }

  toggleMenu() {
    if (this.isSmallScreen()) {
      this.isMenuOpen = !this.isMenuOpen;
    }
  }

  toggleSidebar() {
    if (!this.isSmallScreen()) {
      this.isSidebarHidden = !this.isSidebarHidden;
    }
  }

  toggleProfileMenu() {
    this.profileMenuOpen = !this.profileMenuOpen;
  }

  toggleSubmenu(menuName: string) {
    this.submenuOpen[menuName] = !this.submenuOpen[menuName];
  }

  isSubmenuOpen(menuName: string): boolean {

    return !!this.submenuOpen[menuName];
  }


}
