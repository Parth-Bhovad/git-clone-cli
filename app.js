#! /usr/bin/env node
const { program } = require('commander');

//importing commands functions
const {initRepo} = require("./commands/init");
const {addRepo} = require("./commands/add");
const {commitRepo} = require("./commands/commit");
const {pushRepo} = require("./commands/push");
const {pullRepo} = require("./commands/pull");
const {addRemoteRepo} = require("./commands/addRemoteRepo");


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