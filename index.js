#!/usr/bin/env node

const program = require ('commander');
const { join } = require('path');
const fs = require('fs');

const package = require ('./package.json');
const todosPath = join(__dirname, 'todos.json');

const getJson = (path) => {
    const data = fs.existsSync(path) ? 
}

program.version (package.version);

program

    .command('add [todo]')
    .description("Adiciona um to-do")
    .action((todo) => {
        console.log(todo);
    });

program.parse(process.argv)
