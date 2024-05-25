import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  username: string = '';
  repositories: any[] = [];
  pageSize: number = 10;
  currentPage: number = 1;
  totalRepositories: number = 0;
  isLoading: boolean = false;
  errorMessage: string = ''; // Property to hold error message

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    // Initial repository fetch
    this.getRepositories();
  }

  getRepositories() {
    if (!this.username.trim()) {
      // If username is empty or contains only whitespace, return early
      this.repositories = [];
      this.totalRepositories = 0;
      this.errorMessage = ''; // Clear error message
      return;
    }

    this.isLoading = true;
    this.errorMessage = ''; // Clear error message

    this.apiService.getRepos(this.username, this.currentPage, this.pageSize)
      .subscribe(
        (response: any) => {
          this.repositories = response;
          this.totalRepositories = response.length;
          this.isLoading = false;
          if (this.totalRepositories === 0) {
            this.errorMessage = 'No repositories found for the given username.';
          } else {
            this.errorMessage = ''; // Clear error message if repositories are found
          }
        },
        (error: any) => {
          console.error('Error fetching repositories:', error);
          this.repositories = []; // Clear repositories array on error
          this.totalRepositories = 0;
          this.isLoading = false;
          this.errorMessage = 'Error fetching repositories. Please try again.'; // Set error message
        }
      );
  }

  onPageSizeChange() {
    this.currentPage = 1; // Reset current page to 1 when page size changes
    this.getRepositories();
  }

  nextPage() {
    if (this.repositories.length === this.pageSize) {
      this.currentPage++;
      this.getRepositories();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getRepositories();
    }
  }
}
