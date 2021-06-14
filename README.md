# Issue Tracker App on React+Redux, Express

## Introduction

This project demontrates an issue tracker app, built on React with Redux using REST API built on Express and MongoDB database.

Features:

- User sign in / sign up / logout
- Creating / editing / browsing boards
- Creating / editing / deleting lists on boards
- Creating tasks in board list

Features which are not done, but were in development:

- Board activity management (Implemented on server-side, but not on the client side)
- New task feature doesn't appear upon refresh, edit/delete methods are developed, but not implemented

Abandoned features:

- Task popup
- List/task drag-and-drop
- Board side menu
- User edit page

## Quick Start

### Setup

```bash
# Docker build
docker-compose build

```

## Startup

### Run Docker

```bash
# Docker up
docker-compose up
```

### Application

Open client at http://localhost:3000

Authorize with next credentials:

- Email: test@email.ru
- Password: 123
