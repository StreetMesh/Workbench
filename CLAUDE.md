# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Unity 3D project with Needle Engine integration** for web deployment. The project combines Unity Editor development with TypeScript/JavaScript runtime components that run in web browsers.

### Key Architecture Components

- **Unity Project**: Located in root directory with standard Unity structure (`Assets/`, `ProjectSettings/`, etc.)
- **Needle Engine Web Project**: Located in `Needle/Workbench/` directory
- **Code Generation Bridge**: Unity C# components automatically generate TypeScript stubs via Needle's codegen system
- **Dual Component System**: Components exist as both Unity C# classes (for editor) and TypeScript classes (for runtime)

## Development Commands

All web development commands should be run from the `Needle/Workbench/` directory:

```bash
cd Needle/Workbench

# Start development server with hot reload
npm start

# Build for development
npm run build:dev

# Build for production
npm run build:production

# Transform GLTF assets
npm run gltf:transform
```

The development server runs on `https://localhost:3000` with SSL enabled.

## Project Structure

### Unity Side
- `Assets/Scenes/`: Unity scenes (Workbench.unity is main scene)
- `Assets/Needle/Components.codegen/`: Auto-generated C# stub components
- `Assets/Materials/`, `Assets/Prefabs/`: Standard Unity assets

### Web Runtime Side
- `Needle/Workbench/src/scripts/`: TypeScript component implementations
- `Needle/Workbench/src/generated/`: Auto-generated runtime code
- `Needle/Workbench/src/main.ts`: Application entry point
- `Needle/Workbench/dist/`: Built web application output

## Component Development Pattern

1. Create TypeScript components in `Needle/Workbench/src/scripts/`
2. Needle Engine automatically generates corresponding C# stubs in `Assets/Needle/Components.codegen/`
3. Attach C# stubs to GameObjects in Unity Editor
4. TypeScript implementations run at runtime in the browser

### Example Component Structure
- `TransformController.ts` (TypeScript implementation) ↔ `TransformController.cs` (generated C# stub)
- C# stubs contain method signatures but no implementation
- TypeScript classes extend `Behaviour` and implement actual functionality

## Key Dependencies

- **Needle Engine**: `@needle-tools/engine` (v4.7.4) - Core runtime framework
- **Three.js**: Custom Needle build for 3D graphics
- **Vite**: Build tool and development server
- **TypeScript**: For type-safe scripting

## Configuration Files

- `needle.config.json`: Needle Engine build configuration
- `vite.config.js`: Development server and build configuration with HTTPS
- `package.json`: Web project dependencies and scripts
- `tsconfig.json`: TypeScript compiler configuration

## Unity Integration

The project uses Unity 2022.3+ with these key packages:
- `com.needle.engine-exporter` (v4.7.4): Core Needle Engine Unity integration
- Standard Unity packages for UI, Timeline, TextMeshPro

## Development Workflow

1. **Unity Editor**: Design scenes, configure components, manage assets
2. **Code in TypeScript**: Implement component behavior in `src/scripts/`
3. **Auto-sync**: Needle Engine keeps Unity and web code synchronized
4. **Test in Browser**: Use `npm start` to preview with hot reload
5. **Build for Deploy**: Use `npm run build:production` for final output