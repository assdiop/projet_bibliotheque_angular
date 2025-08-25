import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.css'
})
export class AccueilComponent {

 books = [
    { image: 'assets/images/book1.jpg', title: 'Les Misérables', author: 'Victor Hugo', borrowed: false },
    { image: 'assets/images/book2.jpg', title: 'L’Alchimiste', author: 'Paulo Coelho', borrowed: true },
    { image: 'assets/images/book3.jpg', title: 'Le Petit Prince', author: 'Antoine de Saint-Exupéry', borrowed: false },
    { image: 'assets/images/book4.jpg', title: '1984', author: 'George Orwell', borrowed: true },
    { image: 'assets/images/book5.jpg', title: 'Hamlet', author: 'William Shakespeare', borrowed: false },
    { image: 'assets/images/book6.jpg', title: 'La Peste', author: 'Albert Camus', borrowed: false },

     { image: 'assets/images/book4.jpg', title: 'TEST', author: 'Abdallah', borrowed: true },
    { image: 'assets/images/book5.jpg', title: 'JUSTE', author: 'Shakespeare', borrowed: true },
    { image: 'assets/images/book6.jpg', title: 'DEMOCRATIE', author: 'Williams', borrowed: false },

    { image: 'assets/images/book6.jpg', title: 'DEMOCRATIE MODERNE', author: 'Williams 2', borrowed: false }
  ];

  chunkedBooks: any[] = [];

  ngOnInit(): void {
    this.chunkedBooks = this.chunkArray(this.books, 6);
  }

  chunkArray(arr: any[], size: number): any[] {
    return arr.reduce((acc, _, i) => {
      if (i % size === 0) acc.push(arr.slice(i, i + size));
      return acc;
    }, [] as any[]);
  }

}
