# Parts

Demonstration of clean architecture in the frontend. This is a small example project that follows good practices suitable for larger codebases. I wrote an [article](https://blog.alexeykarpov.com/clean-architecture-in-frontend) to explain the main concepts I use here.

![GitHub Workflow Status](https://img.shields.io/github/workflow/status/greetclock/parts/CI?style=flat-square)
![Netlify](https://img.shields.io/netlify/72dae1a2-06a4-40dc-be5f-5aa2654f0965?style=flat-square)

## Running locally

This project was generated using [Nx](https://nx.dev). That's a usefull tool for managing large-scale frontend applications. At the same time, it's suitable for smaller projects too. It supports Angular, React, and several backend frameworks too. You can install nx CLI or use it by calling `yarn nx ...`.

- `yarn install` to install dependencies
- `yarn nx serve parts` to run the main app from `apps/parts`

You can run tests with `yarn nx run <lib or app name>:test`. For example: `yarn nx run todos:test` or `yarn nx run todos-data:test`.

## Project structure

There are `apps` and `libs`. Apps aren't supposed to contain almost any logic, and their main job is to bring features or libs together. Libs contain all the fun. It can be almost everything:

- Full feature for an application like `todos` library
- Headless data library that can be re-used by several features: `todos-data`
- Very small helper library to handle basic initialization logic for a feature: `todos-registry`
- There even can be code that doesn't go to the build. It still can help with testing: `test-helpers`.

Other typical packages are UI libraries, utility functions, and classic libraries if you build them in-house.

## What's next?

If you are interested in learning more, I encourage you to read the source code, run it locally and perhaps play with the code. You can also read the [article](https://blog.alexeykarpov.com/clean-architecture-in-frontend) where I explain the approach.

Author: [Alexey Karpov](https://alexeykarpov.com).
