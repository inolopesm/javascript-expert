'use strict';

// O objetivo do Fluent API é executar tarefas, como um pipeline, step by step.
// E no fim, chama o build. MUITO similar ao padrão Builder, mas a diferença é
// que aqui é sobre processos, e o Builder é sobre construção de objetos.
class TextProcessorFluentAPI {
    #content

    constructor(content) {
        this.#content = content
    }

    extractPeopleData() {
        // ?<= fala que vai extrair os dados que virão depois desse grupo
        // [contratante|contratada] ou um ou outro, (e tem a flag no fim da
        // expressão pra pegar maiúsculo e minusculo)
        // :\s{1} vai procurar o caractere literal do dois pontos seguindo de
        // um espaço
        // tudo acima fica dentro de um parênteses para falar "vamos pegar daí
        // pra frente"

        // (?!s) negative look arround, onde vai ignorar os contratantes no fim
        // do documento (que só tem espaço a frente deles)
        // .*\n pega qualquer coisa até o primeiro \n
        // .*? non greety, esse ? faz com que ele pare na primeira recorrência,
        // assim ele evita ficar em loop.

        // $ informar que a pesquisa acaba no fim da linha
        // g -> global
        // m -> multiline
        // i -> case insensitive

        const matchPerson = /(?<=[contratante|contratada]:\s{1})(?!\s)(.*\n.*)$/gmi

        // faz o match com a string inteira que contém os dados que precisamos
        this.#content = this.#content.match(matchPerson)

        return this
    }

    build() {
        return this.#content
    }
}

module.exports = TextProcessorFluentAPI