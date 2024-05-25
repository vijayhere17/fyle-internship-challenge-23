import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CacheService } from './cache.service'; // Import CacheService
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient, private cacheService: CacheService) {}

  getRepos(username: string, page: number, perPage: number): Observable<any> {
    const cacheKey = `repos_${username}_${page}_${perPage}`;
    
    // Check if the response is cached
    const cachedResponse = this.cacheService.get(cacheKey);
    if (cachedResponse) {
      return of(cachedResponse); // Return cached response as Observable
    } else {
      // If not cached, make the API request
      return this.http.get<any[]>(`https://api.github.com/users/${username}/repos`, {
        params: { page: page.toString(), per_page: perPage.toString() }
      }).pipe(
        map(response => {
          // Cache the response
          this.cacheService.set(cacheKey, response);
          return response;
        })
      );
    }
  }
}

