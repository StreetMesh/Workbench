# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with the Colyseus multiplayer server in this repository.

## Project Overview

This is a **Colyseus multiplayer server** that provides real-time multiplayer functionality for the Unity 3D + Needle Engine web application. The server handles client connections, room management, and synchronized state across multiple players.

### Key Architecture Components

- **Colyseus Framework**: TypeScript-based multiplayer game server framework
- **Room-based Architecture**: Clients join specific rooms with shared state
- **Schema-based State Sync**: Automatic state synchronization using @colyseus/schema
- **Express Integration**: HTTP server with monitoring and playground tools

## Development Commands

All server development commands should be run from the `Needle/Server/` directory:

```bash
cd Needle/Server

# Start development server with hot reload
npm start

# Run tests
npm test

# Run load testing with 2 clients
npm run loadtest

# Build for production
npm run build

# Clean build directory
npm run clean
```

The development server runs on port `2567` by default (configurable via PORT environment variable).

## Project Structure

### Core Files
- `src/index.ts`: Main entry point, starts the Colyseus server using app.config
- `src/app.config.ts`: Server configuration, room definitions, and Express routes
- `package.json`: Dependencies and npm scripts configuration
- `tsconfig.json`: TypeScript compiler configuration

### Room System
- `src/rooms/MyRoom.ts`: Main room handler implementation (max 4 clients)
- `src/rooms/schema/MyRoomState.ts`: Room state schema definition
- Room handlers manage client lifecycle (join/leave/messages)

### Testing & Monitoring
- `test/MyRoom_test.ts`: Unit tests for room functionality
- `loadtest/example.ts`: Load testing script for performance validation
- Built-in monitoring dashboard at `/monitor` endpoint
- Development playground at `/` endpoint (non-production only)

### Deployment
- `ecosystem.config.cjs`: PM2 configuration for production deployment
- Configured for multi-process deployment using all CPU cores

## Component Development Pattern

1. **Room State Schema**: Define synchronized properties in `MyRoomState.ts` using `@type()` decorators
2. **Room Logic**: Implement game logic in room handler (`MyRoom.ts`)
3. **Client Messages**: Handle client-to-server messages in `onCreate()` method
4. **Lifecycle Events**: Use `onJoin()`, `onLeave()`, and `onDispose()` for client management

### Example Room Handler Structure
```typescript
export class MyRoom extends Room<MyRoomState> {
  maxClients = 4;
  state = new MyRoomState();

  onCreate(options: any) {
    // Handle messages from clients
    this.onMessage("message_type", (client, data) => {
      // Process client message
    });
  }

  onJoin(client: Client, options: any) {
    // Client joined the room
  }

  onLeave(client: Client, consented: boolean) {
    // Client left the room
  }
}
```

## Key Dependencies

- **@colyseus/core**: Core Colyseus server framework (v0.16.0)
- **@colyseus/schema**: State synchronization system
- **@colyseus/tools**: Server configuration and utilities
- **@colyseus/monitor**: Web-based monitoring dashboard
- **@colyseus/playground**: Development client testing interface
- **Express**: HTTP server framework
- **TypeScript**: Type-safe server development

## Configuration Files

- `tsconfig.json`: TypeScript compilation settings with decorators enabled
- `ecosystem.config.cjs`: PM2 process manager configuration for production
- `package.json`: Project metadata, dependencies, and build scripts

## Integration with Unity/Needle Engine

The server integrates with the Unity + Needle Engine client through:
1. **WebSocket connections** for real-time communication
2. **Room-based sessions** where multiple clients can interact
3. **Synchronized state** that automatically updates all connected clients
4. **Message passing** for custom game events and interactions

## Development Workflow

1. **Define State Schema**: Add synchronized properties to `MyRoomState.ts`
2. **Implement Room Logic**: Add game mechanics to `MyRoom.ts`
3. **Handle Messages**: Process client events in message handlers
4. **Test Locally**: Use `npm start` for development with hot reload
5. **Run Tests**: Use `npm test` to validate room functionality
6. **Load Test**: Use `npm run loadtest` to test with multiple clients
7. **Deploy**: Use `npm run build` and PM2 for production deployment

## Security & Production Notes

- Monitor dashboard (`/monitor`) should be password-protected in production
- Playground interface (`/`) is automatically disabled in production
- Server validates all client messages and maintains authoritative state
- Use environment variables for sensitive configuration
- PM2 configuration enables clustering for high availability