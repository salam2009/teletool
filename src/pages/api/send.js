import { IncomingForm } from 'formidable'
// you might want to use regular 'fs' and not a promise one
import { promises as fs } from 'fs'
const TelegramBot = require('node-telegram-bot-api')

import CONFIG from '../../config'

// first we need to disable the default body parser
export const config = {
    api: {
        bodyParser: false
    }
}

const bot = new TelegramBot(CONFIG.TELEGRAM_BOT_TOKEN)

function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

export default async (req, res) => {
    const form = new IncomingForm()

    form.parse(req, async (err, fields, files) => {
        console.log(files)
        console.log(fields)

        if (!files || !fields) res.status(400).send('Insufficient data sent to API.')

        const { message, password } = fields
        const { file } = files

        if (password !== CONFIG.PASSWORD) {
            res.status(400).send('The password you entered is incorrect.')
            return
        }

        CONFIG.CHAT_IDS.forEach(async (id, index) => {
            setTimeout(() => {
                bot.getChat(id).then(function (chat) {
                    bot.sendMessage(chat.id, message)
                    bot.sendDocument(
                        chat.id,
                        file.path,
                        {},
                        {
                            filename: file.name,
                            contentType: file.type
                        }
                    )
                })
            }, 2500 * index)
        })
    })
}
