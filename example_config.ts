import { ColorResolvable } from "discord.js"

type BotConfig = { color: { info: ColorResolvable, error: ColorResolvable }, token: string, name: string }
const config: BotConfig = {
    "token": "YOUR_BOT_TOKEN_HERE",
    "color": {
        "error": "#ff6257",
        "info": "#ffa200"
    },
    "name": "bot"
}
export default config

// Change this file to "config.ts" before using!!