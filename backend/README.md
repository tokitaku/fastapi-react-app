# Backend

## Running the FastAPI server

### Using Poetry

```bash
cd backend
poetry install
poetry run fastapi dev main.py --host 127.0.0.1 --port 8000
```

### Using Docker Compose

Ensure Docker and Docker Compose are installed, then from the project root run:

```bash
# Build and start the container
docker compose up --build

# Or run in detached mode (background)
docker compose up -d --build

# Stop the container
docker compose down
```

The API will be available at `http://localhost:8001`.

#### Docker Setup Details

- **Port**: The application runs on port 8001 (mapped from container port 8000)
- **Auto-reload**: File changes are automatically detected and the server reloads using `fastapi dev`
- **API Documentation**: Available at `http://localhost:8001/docs`
- **Volume Mounting**: Local backend directory is mounted for development
- **Command**: Uses `fastapi dev main.py --host 0.0.0.0 --port 8000` for development with hot reloading

#### Container vs Host Access

- **Container logs show**: `Server started at http://0.0.0.0:8000` (internal container address)
- **Actual access URL**: `http://localhost:8001` (mapped through Docker port forwarding)
- **API Documentation**: `http://localhost:8001/docs`

#### Troubleshooting

If you encounter port conflicts:
1. Check which process is using the port: `lsof -i :8001`
2. Stop conflicting containers: `docker compose down`
3. Or modify the port in `docker-compose.yml` if needed

