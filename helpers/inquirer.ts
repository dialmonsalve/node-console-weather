
import colors from 'colors';
import inquirer from 'inquirer';

import { Place } from '../interfaces/interfaces.js';

const { rainbow, green, cyan } = colors

const questions = [
  {
    type: 'list',
    name: 'option',
    message: 'What do you want to do?',
    choices: [
      {
        value: 1,
        name: `${green('1 -')} Search city`
      },
      {
        value: 2,
        name: `${green('2 -')} History`
      },
      {
        value: 0,
        name: `${green('0 -')} Exit`
      },
    ]
  }
]

const inquirerMenu = async () => {
  console.clear();
  console.log(rainbow('===================='))
  console.log(cyan('    Select Option'))
  console.log(rainbow('===================='))

  const { option } = await inquirer.prompt(questions)

  return option
}

const pausa = async () => {
  await inquirer.prompt([{
    type: 'input',
    name: 'pausa',
    message: `\nPress ${green('ENTER')} to continue`
  }])
}

const readInput = async (message:string) => {
  const question = [
    {
      type: 'input',
      name: 'description',
      message,
      validate(value:string) {
        if (value.length === 0) {
          return 'Please inserte a value';
        }
        return true
      }
    }
  ];

  const { description } = await inquirer.prompt(question);

  return description;
}

const listCities = async (cities:Place[]) => {

  const choices = cities.map((city, i) => {
    const idx = `${i + 1}.`.green;

    return {
      value: city.id,
      name: `${idx} ${city.name}`
    };
  });

  choices.unshift({
    value: '0',
    name: '0'.green + ' Cancel'
  })

  const questions = [
    {
      type: 'list',
      name: 'id',
      message: 'Select place',
      choices
    }
  ];

  const { id } = await inquirer.prompt(questions)

  return id
}

export {
  inquirerMenu,
  pausa,
  readInput,
  listCities,
}
