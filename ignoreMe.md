
  #  Purpose: Test the backend API endpoints using Postman    
  #  Newman is Postman's CLI runner — same tests, no GUI.    

  api-tests:
    name: API Tests (Newman)
    runs-on: ubuntu-latest
    needs: lint

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}

      # Newman runs Postman collections from the command line.
      # htmlextra generates a nice HTML report we can download later.

      - name: Install Newman
        run: npm install -g newman newman-reporter-htmlextra

      - name: Run API tests
        run: |
          newman run postman/quickbook-api.postman_collection.json \
            -e postman/quickbook-render.postman_environment.json \
            -r cli,htmlextra \
            --reporter-htmlextra-export reports/api-report.html

      # Upload the HTML report as an "artifact" — a downloadable file
      # attached to the workflow run. You can grab it from the Actions tab.

      - name: Upload API test report
        if: always()           # Upload even if tests fail — you want the report!
        uses: actions/upload-artifact@v4
        with:
          name: api-test-report
          path: reports/api-report.html
          retention-days: 30   # Keep for 30 days, then auto-delete


 
  # │ Purpose: Test the full app like a real user would        
  # │ This spins up the frontend, then runs Cypress against it 

  e2e-tests:
    name: E2E Tests (Cypress)
    runs-on: ubuntu-latest
    needs: [unit-tests, api-tests]   # Wait for BOTH to pass first.
                                      # E2E tests are slow and expensive —
                                      # don't waste time if basics are broken.

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: "npm"



      # Cypress can save screenshots on failure and videos of test runs.
      # Upload them so you can watch what went wrong.
      - name: Upload Cypress screenshots
        if: failure()          # Only upload if tests FAILED
        uses: actions/upload-artifact@v4
        with:
          name: cypress-screenshots
          path: cypress/screenshots
          retention-days: 14

      - name: Upload Cypress videos
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: cypress-videos
          path: cypress/videos
          retention-days: 14

  
  #  Purpose: Verify the app can be built for production      
  #  "It works on my machine" doesn't cut it in fintech.     
  #  If it can't build in CI, it can't be deployed.          
  
  build:
    name: Production Build
    runs-on: ubuntu-latest
    needs: e2e-tests           # Only build if ALL tests pass

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: "npm"

      - name: Install frontend dependencies
        run: npm install
        working-directory: frontend

      # "npm run build" creates the optimised production bundle.
      # If this fails, there's a real problem (missing env vars,
      # import errors, TypeScript issues, etc.)
      
      - name: Build frontend for production
        run: npm run build
        working-directory: frontend
        env:
          VITE_API_BASE_URL: ${{ env.VITE_API_BASE_URL }}

      # Upload the build output so it can be used by a deploy job later.
      - name: Upload build artifact
        uses: actions/upload-artifact@v4
        with:
          name: frontend-build
          path: frontend/dist
          retention-days: 7
