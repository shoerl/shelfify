# Contributing to Shelfify

Thank you for your interest in contributing to Shelfify! We welcome contributions of all kinds, from bug fixes to new features and documentation improvements.

Before you start, please take a moment to review this document.

## How to Contribute

1.  **Fork the Repository:** Start by forking the Shelfify repository on GitHub.
2.  **Clone Your Fork:** Clone your forked repository to your local machine:
    ```bash
    git clone <your_fork_url>
    cd shelfify
    ```
3.  **Set up the Development Environment:** Follow the [Setup instructions in the README.md](./README.md) to install dependencies and get the project running locally.
4.  **Create a New Branch:** Create a new branch for your feature or bug fix:
    ```bash
    git checkout -b feature/your-feature-name
    # or
    git checkout -b bugfix/your-bugfix-name
    ```
    Please use descriptive branch names (e.g., `feat/add-item-sorting`, `fix/resolve-login-issue`).
5.  **Make Your Changes:** Implement your feature or fix the bug. Ensure your code adheres to the project's coding standards.
6.  **Code Standards:** Shelfify uses ESLint and Prettier to maintain code consistency. Before committing, run the linting and formatting commands:
    ```bash
    yarn lint
    yarn lint:fix
    ```
    Please ensure these commands pass with no errors or warnings before submitting a pull request.
7.  **Testing:** Currently, there are no automated tests configured for this project. If you are adding new features or fixing complex bugs, consider adding relevant tests (e.g., unit tests, integration tests) in a `src/__tests__` directory or alongside the code they test. Information on how to run tests will be added here once a testing framework is set up.
8.  **Commit Your Changes:** Commit your changes with a clear and concise commit message. We encourage following the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification (e.g., `feat: add user authentication`, `fix: correct item display bug`). This helps in generating changelogs and understanding the nature of changes.
9.  **Push to Your Fork:** Push your changes to your fork on GitHub:
    ```bash
    git push origin feature/your-feature-name
    ```
10. **Submit a Pull Request:** Open a pull request from your branch on your fork to the `main` branch of the original Shelfify repository. Provide a clear description of your changes, explaining the problem solved or the feature added, and reference any related issues by including keywords like `Closes #123` or `Fixes #456` in your pull request description.

## Reporting Bugs

If you find a bug, please open an issue on GitHub. Provide a clear description of the bug, steps to reproduce it, and information about your environment (OS, browser, etc.).

## Suggesting Enhancements

If you have an idea for a new feature or improvement, please open an issue on GitHub to discuss it before starting work. This helps prevent duplicate efforts. 