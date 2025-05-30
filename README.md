# parth-gix-cli

> A custom CLI tool that mimics essential Git commands to interact with GitHub repositories. Built while learning full-stack development and diving deep into how Git + GitHub actually work behind the scenes.

## 📚 Table of Contents
- [About](#about)
- [Installation](#installation)
- [Usage](#usage)
- [Available Commands](#available-commands)
- [Examples](#examples)
- [Why I Built This](#why-i-built-this)
- [Contributing](#contributing)

## About
> Ever wondered what happens behind those git add, git commit, and git push commands?
I did.
So while learning full-stack development, I built this custom CLI to replicate core Git functionalities and see how version control tools interact with remote servers like GitHub.

### This CLI supports:
- Initializing a repo
- Adding files
- Committing changes
- Managing remotes
- Pushing and pulling code

## Installation
Install it globally using npm:
```bash
npm install -g npm i parth-gix-cli
```
Once installed, you can run parth-gix-cli commands right from your terminal.

## Usage
The syntax is:
```bash
gix <command> [options]
```

## Available Commands
| Command            | Description                                 |
| :----------------- | :------------------------------------------ |
| `init`             | Initialize a new Git repository             |
| `add <filePath>`   | Add a file to the staging area              |
| `commit <message>` | Commit staged changes with a commit message |
| `remote <link>`    | Add a remote repository URL                 |
| `push`             | Push changes to the remote repository       |
| `pull`             |Download all files and folders from the remote repository        |

## Examples

Initialize a new repository:
```bash
gix init
```

Add a file to staging:
```bash
gix add app.js
```

Commit your changes:
```bash
gix commit "Added app.js"
```

Add a remote repository:
```bash
gix remote https://github.com/username/repo.git
```

Push your changes:
```bash
gix push
```

Download all files and folders from the remote repository:
```bash
gix pull
```

## Why I Built This

As part of my journey into full-stack development, I wanted to understand not just how to use tools like Git and GitHub — but how they work internally.
This project started out of pure curiosity and quickly turned into a hands-on way to learn about:

- How command-line tools are built in Node.js

- How local repositories and remote servers communicate

- How full-stack applications are structured and distributed

And honestly, it made me love coding even more.


## Contributing
Got an idea to improve this tool? Found a bug?
PRs and issues are welcome! Fork the repo, make your changes, and let’s build cool stuff together.

## Parth’s Note:
> This was a curiosity-driven project for learning purposes, but who knows — maybe it’ll inspire someone else to peek under the hood too.
