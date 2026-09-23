# Simple Sandbox Lab

A minimal local cybersecurity training lab for understanding how the HTML `<iframe sandbox>` attribute restricts JavaScript execution and browser capabilities.

The lab allows you to provide HTML/JavaScript payloads and observe how different sandbox permissions affect their behavior.

> ⚠️ **Warning:** This project is intentionally vulnerable and designed for local security training. It should not be deployed to a production or publicly accessible environment.

## Features

- Run arbitrary HTML/JavaScript inside a sandboxed iframe
- Toggle iframe sandbox permissions
- Observe how JavaScript behavior changes with different sandbox configurations
- Demonstrate restrictions on:
  - JavaScript execution
  - Same-origin access
  - Parent-frame interaction
  - Top-level navigation
  - Other browser capabilities controlled by sandbox tokens
- Simple Node.js/Express backend
- Payload stored only in memory
- Designed for local cybersecurity experimentation

## Project Structure

```text
simple-sandbox-lab/
├── public/
│   └── index.html
├── package.json
├── package-lock.json
├── server.js
└── README.md
```

## Requirements

- Node.js
- npm

Check your installation:

```bash
node --version
npm --version
```

## Installation

Clone the repository:

```bash
git clone <YOUR-GITHUB-REPOSITORY-URL>
```

Enter the project directory:

```bash
cd simple-sandbox-lab
```

Install dependencies:

```bash
npm install
```

## Running the Lab

Start the server:

```bash
npm start
```

The application runs locally at:

```text
http://127.0.0.1:3000
```

Open the URL in your browser.

## How It Works

The application consists of a simple Express server and a frontend interface.

The server provides three main functions:

### `/`

Serves the main lab interface.

### `/store`

Accepts the HTML/JavaScript payload supplied by the user and stores it in memory.

The lab intentionally does not sanitize or validate the payload because the purpose is to demonstrate browser sandbox behavior.

### `/render`

Returns the stored payload as a standalone HTML document.

The document is loaded by the frontend inside a sandboxed iframe.

Conceptually:

```text
User Payload
     |
     v
  /store
     |
     v
Server Memory
     |
     v
  /render
     |
     v
Sandboxed iframe
     |
     v
Browser Security Restrictions
```

## Understanding iframe Sandbox

An iframe can be sandboxed using:

```html
<iframe sandbox="..."></iframe>
```

Without sandbox permissions, the browser applies a restrictive set of security controls to the framed document.

Specific capabilities can be selectively enabled using sandbox tokens.

For example:

```html
<iframe sandbox="allow-scripts"></iframe>
```

allows scripts to execute while keeping other sandbox restrictions in place.

Other commonly used sandbox tokens include:

```text
allow-scripts
allow-same-origin
allow-forms
allow-popups
allow-modals
allow-downloads
allow-top-navigation
allow-top-navigation-by-user-activation
```

The lab allows these behaviors to be explored experimentally.

## Security Learning Objectives

This project can be used to understand:

- iframe sandboxing
- JavaScript execution in sandboxed documents
- Same-origin policy interactions
- Cross-window communication
- `window.parent`
- `postMessage`
- Top-level navigation restrictions
- Browser security boundaries
- Why JavaScript execution does not automatically mean XSS is exploitable
- The security implications of combining sandbox permissions

## Example Experiment

Start the application:

```bash
npm start
```

Open:

```text
http://127.0.0.1:3000
```

Try a simple payload:

```html
<script>
document.body.innerHTML = "<h2>Hello from the sandbox</h2>";
</script>
```

Then experiment with different sandbox configurations and observe what changes.

## Important Security Note

This application intentionally accepts unsanitized HTML/JavaScript.

It is intended **only for local security education and controlled testing**.

Do not:

- Deploy it to a production server
- Expose it to the public internet
- Use it to process untrusted users' data
- Host it on an internet-facing system

The application binds to:

```text
127.0.0.1
```

so that it is intended to remain accessible only from the local machine.

## Technology Stack

- HTML
- JavaScript
- Node.js
- Express
- iframe Sandbox API
- `postMessage`


