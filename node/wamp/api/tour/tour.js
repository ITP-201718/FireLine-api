const autobahn = require('autobahn')
const validate = require('validate.js')

const helpers = require('../../helpers')

async function register (conf){

    const baseCfg = {
        table: 'fahrt',
        elements: [
            {name: 'id', column: 'faid'},
            {name: 'km_anfang', column: 'km_anfang'},
            {name: 'km_ende', column: 'km_ende'},
            {name: 'zweck', column: 'zweck'},
            {name: 'datum', column: 'datum'},
            {name: 'eid', column: 'eid'},
            {name: 'mid', column: 'mid'},
            {name: 'fid', column: 'fid'}
        ],
    }

    /**
     * Generates get
     */
    await helpers.generateGet({
        ...baseCfg,
        uri: conf.uri + '.get',
    })

    await helpers.generateUpdate({
        ...baseCfg,
        uri: conf.uri + '.update',
        constraint: {},
    })

    await helpers.generateDelete({
        ...baseCfg,
        uri: conf.uri + '.delete',
    })

    await helpers.generateCreate({
        ...baseCfg,
        uri: conf.uri + '.create',
        constraint: {
            faid: {
                presence: { message: '^Internal Server Error (2018)' },
                numericality: {onlyInteger: true}
            },
            km_anfang: {
                presence: { message: '^You must choose a start mileage' },
                numericality: {onlyInteger: true}
            },
            km_ende: {
                presence: { message: '^You must choose a start mileage' },
                numericality: {onlyInteger: true}
            },
            zweck: {
                presence: { message: '^You must choose a purpose' }
            },
            datum: {
                presence: { message: '^You must choose a date' },
                datetime: true
            },
            eid: {
                presence: { message: '^Internal Server Error (2019)' },
                numericality: {onlyInteger: true}
            },
            mid: {
                presence: { message: '^Internal Server Error (2020)' },
                numericality: {onlyInteger: true}
            },
            fid: {
                presence: { message: '^Internal Server Error (2021)' },
                numericality: {onlyInteger: true}
            }
        }
    })
}

module.exports = {register}