# Sudoku Solver API

A small historical NestJS exercise that solves a 9 x 9 Sudoku board with recursive backtracking and renders the result as an HTML table.

## What it demonstrates

- A depth-first backtracking solver
- Row, column, and 3 x 3 subgrid validation
- A minimal NestJS controller and service
- HTML rendering of the solved board

## Run locally

Requirements:

- Node.js 18 or newer
- npm

```bash
npm ci
npm run build
npm run start:dev
```

The server listens on `http://localhost:3000`.

Pass the board through the `data` query parameter as 81 characters. Use digits for fixed cells and `.` for empty cells:

```text
GET /?data=53..7....6..195....98....6.8...6...34..8..6...6...28....419..5....8..79
```

The response is an HTML table containing the solved board.

## How it works

1. The service converts the 81-character input into a two-dimensional board.
2. The solver finds the next empty cell.
3. It tries the digits 1 through 9 and rejects values already present in the row, column, or subgrid.
4. When a choice leads to a dead end, it restores the empty cell and tries the next digit.
5. A complete board is rendered as HTML.

## Current limitations

- The endpoint does not validate input length or allowed characters.
- Invalid or unsolvable boards do not receive a structured error response.
- The HTML response is assembled directly in the service.
- No automated tests are committed.
- The dependencies are historical and currently have known audit findings.
- The project is an educational sample and is not production ready.

## Verification

The current source compiles with `npm run build`. The configured Jest command completes with `--passWithNoTests` because the repository contains no test files.

## Status

This repository is retained as a historical algorithms and backend-framework exercise. It is not a featured portfolio project.
