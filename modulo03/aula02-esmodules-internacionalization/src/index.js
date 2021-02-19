import database from '../database.json'
import Person from './Person.js'
import TerminalController from './TerminalController.js'

const DEFAULT_LANG = 'pt-BR'
const STOP_TERM = ':q'

const terminalController = new TerminalController()
terminalController.initializeTerminal(database, DEFAULT_LANG)

async function mainLoop () {
    try {
        const answer = await terminalController.question()
        
        if (answer === STOP_TERM) {
            terminalController.closeTerminal()
            console.log('proccess finished!')
            return
        }

        const person = Person.generateInstanceFromString(answer)
        console.log('person', person.formatted(DEFAULT_LANG))

        return mainLoop()
    } catch (error) {
        console.log('SOMETHING CRASHED**', error)
        return mainLoop()
    }
}

await mainLoop()