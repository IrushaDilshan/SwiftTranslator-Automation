# IT3040 - ITPM Assignment 1: Automated Testing

This repository contains the Playwright automation scripts for Assignment 1 of the IT3040 (IT Project Management) module. The objective is to test the Singlish-to-Sinhala transliteration system available at [SwiftTranslator](https://www.swifttranslator.com/).

**Student ID:** IT23768758

---

## Project Structure
- `tests/IT23768758.spec.js`: Contains all Functional (Positive/Negative) and UI test cases.
- `IT23768758_TestCases.xlsx`: The detailed test case documentation.
- `playwright.config.js`: Playwright configuration file.

## Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [Git](https://git-scm.com/)

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/IrushaDilshan/SwiftTranslator-Automation.git
   cd SwiftTranslator-Automation
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Install Playwright browsers:**
   ```bash
   npx playwright install chromium
   ```

## Running Tests

### Run all tests
```bash
npx playwright test
```

### Run tests and open HTML report
```bash
npx playwright test --reporter=html
npx playwright show-report
```

### Run specific test project (e.g., Chromium)
```bash
npx playwright test --project=chromium
```

## Features Tested
- **Functional Testing**: 26 Positive and 11 Negative test scenarios covering transliteration accuracy, edge cases (scientific notation, URLs, email addresses), and long text handling.
- **UI Testing**: Real-time transliteration updates and text replacement verification.
- **API Mocking**: Ensuring reliable testing by mocking the transliteration API responses.

---
**Submitted by:** Vidanapthirana I.D.(IT23768758)
