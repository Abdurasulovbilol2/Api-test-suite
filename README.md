# 🧪 API Test Suite

A comprehensive **Playwright-based testing framework** with support for both **REST API testing** and **Frontend UI automation**. Tests run automatically via GitHub Actions with detailed HTML and Allure reports.

[![API Test Suite](https://github.com/Abdurasulovbilol2/Api-test-suite/actions/workflows/playwright.yml/badge.svg)](https://github.com/Abdurasulovbilol2/Api-test-suite/actions)

## ✨ Features

- ✅ **Dual HTTP Client Support**: Playwright request + Axios for flexible API testing
- ✅ **Schema Validation**: Zod for response validation
- ✅ **Frontend UI Tests**: Browser automation for web application testing
- ✅ **Performance Testing**: Response time assertions and latency monitoring
- ✅ **CI/CD Integration**: GitHub Actions runs tests on every push
- ✅ **Comprehensive Reports**: HTML and Allure test reports as artifacts
- ✅ **Tag-Based Filtering**: Run tests by client type (`@pw`, `@axios`) or functionality

## 📊 Test Coverage

| Category              | Count  | Command                    |
| --------------------- | ------ | -------------------------- |
| **API - Auth**        | 2      | `npm run test:auth`        |
| **API - Users**       | 2      | `npm run test:users`       |
| **API - Performance** | 2      | `npm run test:performance` |
| **Frontend - UI**     | 5      | `npm run test:frontend`    |
| **Total**             | **11** | `npm test`                 |

### Client Type Filtering

```bash
npm run test:pw      # Playwright request client only
npm run test:axios   # Axios client only
npm run test:api     # All API tests
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Abdurasulovbilol2/Api-test-suite.git
cd api-test-suite

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install
```

### Configuration

Create a `.env` file in the project root:

```env
BASE_URL=https://dummyjson.com
API_USERNAME=emilys
API_PASSWORD=emilyspass
```

Or copy from the example:

```bash
cp .env.example .env
```

## 🧪 Running Tests

### Run All Tests

```bash
npm test
```

### Run Specific Test Suites

```bash
npm run test:auth          # Authentication tests
npm run test:users         # Users endpoint tests
npm run test:performance   # Performance & latency tests
npm run test:frontend      # Frontend UI automation
npm run test:api           # All API tests
```

### Run by HTTP Client

```bash
npm run test:pw    # Playwright request tests
npm run test:axios # Axios tests
```

### Watch Mode (Live UI)

```bash
npx playwright test --ui --ui-host=127.0.0.1 --ui-port=9330
```

### View Reports

```bash
# Playwright HTML Report
npx playwright show-report

# Allure Report (requires allure-commandline)
npm run report:allure
```

## 📁 Project Structure

```
api-test-suite/
├── tests/
│   ├── auth/
│   │   └── auth.spec.ts              # Auth endpoint tests
│   ├── users/
│   │   └── users.spec.ts             # Users CRUD tests
│   ├── performance/
│   │   └── performance.spec.ts       # Performance & latency tests
│   └── frontend/
│       └── demo.spec.ts              # Frontend UI automation
├── utils/
│   ├── apiClient.ts                  # Playwright & Axios client factories
│   ├── auth.ts                       # Token retrieval helpers
│   ├── config.ts                     # Environment configuration
│   ├── logger.ts                     # Console logging utilities
│   └── schema.ts                     # Zod schema validation
├── schemas/
│   └── user.schema.ts                # User response schema
├── test-data/
│   └── users.json                    # Test data fixtures
├── playwright.config.ts              # Playwright configuration
├── package.json                      # Project dependencies
└── .github/
    └── workflows/
        └── playwright.yml            # GitHub Actions CI/CD
```

## 🔧 Key Test Examples

### API Testing with Playwright

```typescript
test("@pw POST /auth/login returns a token", async () => {
  const api = await createApiContext();
  const token = await getToken(api);

  expect(token).toBeTruthy();
  expect(typeof token).toBe("string");

  await api.dispose();
});
```

### API Testing with Axios

```typescript
test("@axios GET /users returns valid users", async () => {
  const api = createAxiosClient();
  const token = await getTokenAxios(api);
  const authApi = createAxiosClient(token);

  const response = await authApi.get("/users");
  expect(response.status).toBe(200);

  // Schema validation with Zod
  for (const user of response.data) {
    validateSchema(UserSchema, user);
  }
});
```

### Frontend UI Testing

```typescript
test("@pw should navigate to docs link", async ({ page }) => {
  await page.goto("https://playwright.dev");

  const docsLink = page.locator('a:has-text("Docs")');
  await expect(docsLink).toBeVisible();

  await docsLink.click();
  await expect(page).toHaveURL(/docs/);
});
```

### Performance Testing

```typescript
test("@pw GET /users responds under 2s", async () => {
  const api = await createApiContext();

  const startedAt = Date.now();
  const response = await api.get("/users");
  const durationMs = Date.now() - startedAt;

  expect(response.ok()).toBeTruthy();
  expect(durationMs).toBeLessThan(2000);

  await api.dispose();
});
```

## 🔄 GitHub Actions CI/CD

Tests run automatically on:

- `push` to `main` or `master` branches
- `pull_request` to `main` or `master` branches

### Setup GitHub Secrets

Add these secrets to your repository (Settings → Secrets and variables → Actions):

| Secret         | Value                 | Example                 |
| -------------- | --------------------- | ----------------------- |
| `BASE_URL`     | Your API base URL     | `https://dummyjson.com` |
| `API_USERNAME` | Test account username | `emilys`                |
| `API_PASSWORD` | Test account password | `emilyspass`            |

### View Results

1. Go to **Actions** tab in GitHub
2. Click any workflow run
3. Download artifacts:
   - `playwright-report/` - Interactive HTML test report
   - `allure-results/` - Allure test data (generate report locally with `npm run report:allure`)

## 📦 Dependencies

### Production

- **playwright** - Browser automation & API testing
- **axios** - HTTP client for API requests
- **zod** - TypeScript-first schema validation
- **dotenv** - Environment variable management

### Development

- **@playwright/test** - Testing framework
- **@types/node** - Node.js type definitions
- **allure-playwright** - Allure reporting integration
- **allure-commandline** - Allure report generation

## 🛠️ Development

### Install Dependencies

```bash
npm install
```

### Format & Lint

```bash
# Check code
npm run lint

# Format code (add if needed)
npx prettier --write .
```

### Add New Tests

1. Create a new file in `tests/<feature>/<feature>.spec.ts`
2. Use `@pw` or `@axios` tags for client filtering
3. Follow existing test patterns
4. Run tests: `npm test`

## 📊 Example Test Results

```
Running 11 tests using 8 workers

  ✓  Auth API › @pw POST /auth/login returns a token (553ms)
  ✓  Auth API › @axios POST /auth/login returns a token (510ms)
  ✓  Users API › @pw GET /users returns valid users (502ms)
  ✓  Users API › @axios GET /users returns valid users (488ms)
  ✓  Performance API › @pw GET /users responds under 2s (376ms)
  ✓  Performance API › @axios GET /users responds under 2s (303ms)
  ✓  Frontend › @pw should load homepage and verify title (2.9s)
  ✓  Frontend › @pw should navigate to docs link (5.3s)
  ✓  Frontend › @pw should perform search (5.3s)
  ✓  Frontend › @pw should verify getting started section (5.2s)
  ✓  Frontend › @pw page should have interactive elements (5.3s)

  11 passed (4.9s)
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-test`)
3. Commit changes (`git commit -m 'Add amazing test'`)
4. Push to branch (`git push origin feature/amazing-test`)
5. Open a Pull Request

## 📝 Environment Variables

| Variable       | Required | Example                 | Purpose                             |
| -------------- | -------- | ----------------------- | ----------------------------------- |
| `BASE_URL`     | Yes      | `https://dummyjson.com` | API base URL for requests           |
| `API_USERNAME` | Yes      | `emilys`                | Test account username               |
| `API_PASSWORD` | Yes      | `emilyspass`            | Test account password               |
| `CI`           | No       | `true`                  | Set by GitHub Actions automatically |

## 📄 License

MIT

## 🔗 Resources

- [Playwright Documentation](https://playwright.dev)
- [Axios Documentation](https://axios-http.com)
- [Zod Documentation](https://zod.dev)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

## 👤 Author

**Abdurasulov Bilol**

- GitHub: [@Abdurasulovbilol2](https://github.com/Abdurasulovbilol2)

---

Made with ❤️ using Playwright, Axios, and Zod
