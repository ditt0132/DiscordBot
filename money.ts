import { GuildMember, Snowflake } from "discord.js"
import fs from "fs"

export default { giveMoney, getMoney, takeMoney, snowflake }

const snowflake = {
    getMoney: (user: Snowflake)=> {
        try {
            moneydb[user]
        } catch (error) {
    moneydb[user] = 0;
    fs.writeFileSync("moneydb.json", JSON.stringify(moneydb, (key, value) => value, "    "))
}
return moneydb[user]
    },

giveMoney: (user: Snowflake, count: number)=> {
    try {
        moneydb[user]
    } catch (error) {
        moneydb[user] = count
        fs.writeFileSync("moneydb.json", JSON.stringify(moneydb, (key, value) => value, "    "))
    }
    return moneydb[user]
} ,

takeMoney: (user: Snowflake, count: number)=> {
    try {
        moneydb[user] -= count
        if (count <= 0) {
            moneydb[user] = 0
        }
    } catch (error) {
        moneydb[user] = 0
        fs.writeFileSync("moneydb.json", JSON.stringify(moneydb, (key, value) => value, "    "))
    }
    return moneydb[user]
}
}

let moneydb = JSON.parse(fs.readFileSync("moneydb.json").toString())

function getMoney(user: GuildMember) {
    try {
        moneydb[user.id]
    } catch (error) {
        moneydb[user.id] = 0;
        fs.writeFileSync("moneydb.json", JSON.stringify(moneydb, (key, value) => value, "    "))
    }
    return moneydb[user.id]
}

function giveMoney(user: GuildMember, count: number) {
    try {
        moneydb[user.id]
    } catch (error) {
        moneydb[user.id] = count
        fs.writeFileSync("moneydb.json", JSON.stringify(moneydb, (key, value) => value, "    "))
    }
    return moneydb[user.id]
}

function takeMoney(user: GuildMember, count: number) {
    try {
        moneydb[user.id] -= count
        if (count <= 0) {
            moneydb[user.id] = 0
        }
    } catch (error) {
        moneydb[user.id] = 0
        fs.writeFileSync("moneydb.json", JSON.stringify(moneydb, (key, value) => value, "    "))
    }
    return moneydb[user.id]
}