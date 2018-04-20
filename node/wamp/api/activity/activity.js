const autobahn = require('autobahn')
const validate = require('validate.js')

const helpers = require('../../helpers')

async function register (conf) {

    /**
     * Creates a new activity
     * @param args
     * @param kwargs
     * @returns {Promise<boolean>}
     */
    async function createAktivitaet(args, kwargs) {
        const constraints = {
            von: {
                presence: { message: '^You must choose a from date' },
                datetime: true
            },
            bis: {
                presence: { message: '^You must choose a to date'},
                datetime: true
            },
            taetigkeit: {
                presence: { message: '^You must choose a activity'}
            }
        }
        await helpers.validate(kwargs, constraints)

        let aktivitaetInsert = {
            von: kwargs.von,
            bis: kwargs.bis,
            aktivitaet: kwargs.aktivitaet
        }

        await helpers.executeInsert('aktivitaet', aktivitaetInsert)

        return true
    }
    await helpers.s_register(conf.uri + '.create_aktivitaet', createAktivitaet())

    async function updateAktivitaet(args, kwargs){
        const constraints = {
            von: {
                presence: { message: '^You must choose a from date' },
                datetime: true
            },
            bis: {
                presence: { message: '^You must choose a to date'},
                datetime: true
            },
            taetigkeit: {
                presence: { message: '^You must choose a activity'}
            },
            id: {
                presence: { message: '^Internal Server Error'},
                numericality: {onlyInteger: true}
            }
        }
        await helpers.validate(kwargs, constraints)
        const {id, von, bis, taetigkeit} = kwargs
        helpers.executeUpdate('aktivitaet', {id}, {von, bis, taetigkeit})
        return true
    }
    await helpers.s_register(conf.uri + '.update_aktivitaet', updateAktivitaet())
}

module.exports = {register}