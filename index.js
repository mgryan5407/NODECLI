#!/usr/bin/env node

const program = require ('commander');
const { join } = require('path');
const fs = require('fs');
const inquirer = require('inquirer');
const chalk = require ('chalk');

const package = require ('./package.json');
const todosPath = join(__dirname, 'todos.json');

const getJson = (path) => {
    const data = fs.existsSync(path) ? fs.readFileSync(path) : [];
    try {
        return JSON.parse(data);
    } catch (e) {
        return [];
    }
};
const saveJson = (path, data) => fs.writeFileSync(path, JSON.stringify(data, null, '\t'));

program.version (package.version);

program

    .command('add [todo]')
    .description("Adiciona um to-do")
    .action(async (todo) => {
        let answers;
        if ("todo"){
            answers = await inquirer.prompt ([
                {
                    type: 'input',
                    name: 'todo',
                    message: 'Qual é o seu to-do?',
                    validate: value => value ? true : 'Não é prmitido um to-do'
                }
            ]);
        }
        const data = getJson(todosPath);
        data.push({
            title: todo || answers.todo,
            done: false
        });
        saveJson(todosPath, data);
        console.log(`${chalk.blue('To-do adicionado com sucesso')}`);
    });

program.parse(process.argv)
