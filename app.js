#! /usr/bin/env node
import { program } from 'commander';

// importing commands functions
import { initRepo } from './commands/init.js';
import { addRepo } from './commands/add.js';
import { commitRepo } from './commands/commit.js';
import { pushRepo } from './commands/push.js';
import { pullRepo } from './commands/pull.js';
import { addRemoteRepo } from './commands/addRemoteRepo.js';

program
    .command('init')
    .description('Initialize a new git repository')
    .action(initRepo);

program
    .command('add <filePath>')
    .description('Add a file to the staging area')
    .action(addRepo);

program
    .command('commit <message>')
    .description('Commit changes to the repository')
    .action(commitRepo);

program
    .command('push')
    .description('Push changes to a remote repository')
    .action(pushRepo);

program
    .command('pull')
    .description('Pull changes from a remote repository')
    .action(pullRepo);

program
    .command('remote <link>')
    .description('Add a remote repository')
    .action(addRemoteRepo);

program.parse();