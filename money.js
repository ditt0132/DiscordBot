const fs = require("fs");

const moneydb = JSON.parse(fs.readFileSync("moneydb.json").toString());

const snowflake = {
    getMoney: (user) => {
        try {
            moneydb[user];
        } catch (error) {
            moneydb[user] = 0;
            fs.writeFileSync("moneydb.json", JSON.stringify(moneydb, (key, value) => value, "    "));
        }
        return moneydb[user];
    },
    giveMoney: (user, count) => {
        try {
            moneydb[user];
        } catch (error) {
            moneydb[user] = count;
            fs.writeFileSync("moneydb.json", JSON.stringify(moneydb, (key, value) => value, "    "));
        }
        return moneydb[user];
    },
    takeMoney: (user, count) => {
        try {
            moneydb[user] -= count;
            if (count <= 0) {
                moneydb[user] = 0;
            }
        } catch (error) {
            moneydb[user] = 0;
            fs.writeFileSync("moneydb.json", JSON.stringify(moneydb, (key, value) => value, "    "));
        }
        return moneydb[user];
    }
};

function getMoney(user) {
    try {
        moneydb[user.id];
    } catch (error) {
        moneydb[user.id] = 0;
        fs.writeFileSync("moneydb.json", JSON.stringify(moneydb, (key, value) => value, "    "));
    }
    return moneydb[user.id];
}

function giveMoney(user, count) {
    try {
        moneydb[user.id];
    } catch (error) {
        moneydb[user.id] = count;
        fs.writeFileSync("moneydb.json", JSON.stringify(moneydb, (key, value) => value, "    "));
    }
    return moneydb[user.id];
}

function takeMoney(user, count) {
    try {
        moneydb[user.id] -= count;
        if (count <= 0) {
            moneydb[user.id] = 0;
        }
    } catch (error) {
        moneydb[user.id] = 0;
        fs.writeFileSync("moneydb.json", JSON.stringify(moneydb, (key, value) => value, "    "));
    }
    return moneydb[user.id];
}

module.exports = { giveMoney, getMoney, takeMoney, snowflake };
