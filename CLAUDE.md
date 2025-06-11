# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Backend (FastAPI)
```bash
cd backend
poetry install                    # Install dependencies
poetry shell                      # Activate virtual environment
poetry run uvicorn backend.main:app --reload --host 127.0.0.1 --port 8000  # Run dev server
poetry run pytest                 # Run tests
poetry run pytest tests/test_main.py::test_specific_function  # Run single test
```

### Frontend (React)
```bash
cd front
npm install                       # Install dependencies
npm start                         # Run dev server (localhost:3000)
npm test                          # Run tests
npm run build                     # Build for production
```

## Architecture Overview

This is a FastAPI + React sales management application with the following key architectural patterns:

### Backend Structure
- **Monolithic API**: All routes defined in `main.py` (not split into separate routers)
- **SQLModel + SQLite**: Database models in `models.py`, auto-creates tables on startup
- **CRUD Pattern**: Database operations centralized in `crud.py`
- **Schema Validation**: Pydantic schemas in `schemas.py` for request/response validation

### Frontend Architecture
- **Context-based Auth**: Global login state managed via `LoginUserProvider`
- **Custom Hooks Pattern**: API calls encapsulated in hooks (`useLogin`, `useCreateSales`, etc.)
- **Component Hierarchy**: `pages/` (routes) → `elements/` (reusable) → `templates/` (layout)
- **Material-UI Styling**: Consistent UI components throughout

### Data Flow
1. CSV files uploaded via `ReadCsv` component
2. Data processed and sent to FastAPI `/sales/` endpoint
3. SQLite database stores sales records (year + department composite key)
4. Charts rendered using Chart.js with data from `/sales/{year}` endpoint

### Key Integration Points
- **CORS**: Backend configured for `localhost:3000` (React dev server)
- **Authentication**: Simple name/password lookup (no JWT/sessions)
- **Database**: SQLite file at project root, tables auto-created via SQLModel

### Branch Strategy
- Main development branch: `develop` (not `main`)
- Auto-PR workflow from `develop` to `master` via GitHub Actions

### Security Notes
- Passwords stored in plain text (security issue noted in code)
- No password validation requirements
- Simple authentication without tokens

## Common File Patterns
- Backend imports use relative imports (e.g., `from .database import`)
- Frontend uses absolute imports from `src/`
- Database session dependency injected as `SessionDep` type annotation
- React components follow hooks pattern with `useCallback` for performance