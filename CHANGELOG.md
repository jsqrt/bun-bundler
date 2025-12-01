# Changelog

## [Unreleased]

### Added
- **CLI Interface**: Complete command-line interface for terminal usage
  - `bun-bundler build` - Build for production
  - `bun-bundler watch` - Watch mode for development
  - `bun-bundler dev` - Development server with live-reload
  - `bun-bundler init` - Initialize bundler.config.js
  - `bun-bundler --help` - Show help
  - `bun-bundler --version` - Show version
- **Config File Support**: `bundler.config.js` for project configuration
- **Comprehensive Test Suite**:
  - Unit tests for all utility functions (30 tests)
  - Integration tests for bundler features (HTML includes, assembleStyles, error handling)
  - CLI command tests (init, build, watch)
  - Total: 48 tests with 100% pass rate

### Fixed
- **Server Port Issue**: Fixed BrowserSync port not being released when adding images/icons
  - Added proper server lifecycle management
  - Check for existing server instances before starting
  - Improved error handling in server start/stop/restart
- **Error Handling**: Better error callbacks in BrowserSync ready handler

### Improved
- **Documentation**: Updated README with CLI usage examples and configuration guide
- **Examples**: Added bundler.config.js to example projects
- **Code Quality**: Added extensive test coverage for critical functionality

## [0.2.2] - Previous Release

### Features
- Pug/HTML templating
- SCSS/CSS preprocessing  
- JavaScript bundling with Bun.build
- SVG Sprite generation
- Image optimization (WebP conversion)
- Static assets handling
- Watch mode with hot reload
- Programmatic API
