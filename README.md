# Fyle Internship Challenge

This project is created for the Fyle Internship Challenge. It is an Angular application that fetches and displays GitHub repositories for a given username. The project includes features like pagination, caching of API responses, and error handling. It also includes unit tests for one component and one service with 100% code coverage.

## Table of Contents
- [Getting Started](#getting-started)
- [Features](#features)
- [Running the Application](#running-the-application)
- [Running Tests](#running-tests)
- [Deployment](#deployment)
- [Technologies Used](#technologies-used)

## Getting Started

To get a local copy of the project up and running, follow these steps.

### Prerequisites

- [Node.js](https://nodejs.org/en/download/) (which includes npm)
- [Angular CLI](https://cli.angular.io/)

### Installation

1. Clone the repository
2. Navigate to the project directory
3. Install dependencies

## Features

- Fetch GitHub repositories for a given username
- Pagination to navigate through repositories
- Dynamic page size selection
- Caching to avoid duplicate API calls
- Error handling for invalid usernames or failed API calls

## Running the Application

1. Start the development server
2. Open your browser and navigate to `http://localhost:4200/`

## Running Tests

This project includes unit tests for the `AppComponent` and `ApiService` with 100% code coverage.

1. Run the tests
2. Open the coverage report
3. Ensure all tests pass and the coverage is 100%.

## Deployment

To deploy this project as a static website:

1. Build the project
2. The build artifacts will be stored in the `dist/` directory. You can serve these files using any static file server.

## Technologies Used

- Angular
- TypeScript
- HTML
- SCSS
- RxJS

## Project Structure

```plaintext
src/
│
├── app/
│   ├── app.component.ts
│   ├── app.component.html
│   ├── app.component.scss
│   ├── app.component.spec.ts
│   ├── api.service.ts
│   ├── api.service.spec.ts
│   ├── cache.service.ts
│   ├── cache.service.spec.ts
│   └── app.module.ts
│
├── assets/
│
├── environments/
│
├── styles.scss
│
├── index.html
│
├── main.ts
│
└── polyfills.ts


## API Caching

The project includes a simple caching mechanism to avoid making duplicate API calls. The `CacheService` is used to store API responses in-memory and retrieve them when needed.

### CacheService

```typescript
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  private cache = new Map<string, any>();

  get(key: string): any {
    return this.cache.get(key);
  }

  set(key: string, value: any): void {
    this.cache.set(key, value);
  }
}

ApiService with Caching
typescript
Copy code
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CacheService } from './cache.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient, private cacheService: CacheService) {}

  getRepos(username: string, page: number, perPage: number): Observable<any> {
    const cacheKey = `repos_${username}_${page}_${perPage}`;

    const cachedResponse = this.cacheService.get(cacheKey);
    if (cachedResponse) {
      return of(cachedResponse);
    } else {
      return this.http.get<any[]>(`https://api.github.com/users/${username}/repos`, {
        params: { page: page.toString(), per_page: perPage.toString() }
      }).pipe(
        map(response => {
          this.cacheService.set(cacheKey, response);
          return response;
        })
      );
    }
  }
}
License
Distributed under the MIT License. See LICENSE for more information.

Contact
Vijay Sharma - [officialsharma.vijay@gmail.com] 

Project Link: https://github.com/vijayhere17/fyle-internship-challenge-23
