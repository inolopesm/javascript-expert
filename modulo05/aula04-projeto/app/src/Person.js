'use strict';

const { evaluateRegex } = require('./util')

class Person {

    constructor ([
        name,
        nationality,
        maritalStatus,
        document,
        street,
        number,
        neighborhood,
        city
    ]) {
        // Overengineer, mas com Regex :P
        //
        // ^ -> começo da string
        // + -> um ou mais ocorrências
        // (\w{1}) -> pega a primeira letra e deixa em um grupo
        // (a-zA-Z) -> encontra letras minúsculas ou maiúsculas, adicionamos o + para ele pegar todas as letras até o caracter especial
        // g -> todas as ocorrências que encontrar
        //
        const firstLetterExp = evaluateRegex(/^(\w{1})([a-zA-Z]+$)/)
        const formatFirstLetter = (prop) => {
            return prop.replace(firstLetterExp, (fullMatch, group1, group2, index) => {
                // console.log({ fullMatch, group1, group2, index })
                return `${group1.toUpperCase()}${group2.toLowerCase()}`
            })
        }

        this.name = name
        this.nationality = formatFirstLetter(nationality)
        this.maritalStatus = formatFirstLetter(maritalStatus)
        this.document = document.replace(evaluateRegex(/\D/g), '')
        this.street = street.match(evaluateRegex(/(?<=\sa\s).*$/)).join()
        this.number = number
        this.neighborhood = neighborhood.match(evaluateRegex(/(?<=\s).*$/)).join()
        this.city = city.replace(/\.$/, '')
    }
}

module.exports = Person
