const fs = require("fs");


(function readFile(data) {
    fs.readFile("data.json", 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return err;
        }
        try {
            printAccounts(JSON.parse(data));
            xFunction(JSON.parse(data));
            return lines;
        } catch (error) {
            //console.error('error parsing', error);
            return error;
        }
    });
})();

function xFunction(jsonFile) {
    const readline = require("readline").createInterface({
        input: process.stdin,
        output: process.stdout
    });

    readline.question(`\n-- Enter the name from the list. --\n`, (name) => {
        readline.close();
        printAccount(name, jsonFile);
    });

}

let accountsMap = new Map;
let printAccounts = function (jsonFile) {
    jsonFile.forEach(function (item) {
        accountsMap.set(item.id, item);
        console.log(item.firstName +" "+item.surname);
    });
}


function printAccount(name, jsonFile) {
    let account = jsonFile.find(function(item){
        return `${name}`.trim().toLowerCase() == `${item.firstName} ${item.surname}`.trim().toLowerCase()
    });
    console.log(`\n********* ${account.firstName} ${account.surname} ********* \n`);
    console.log(`--------- Age: ${account.age} --------- \n`);
    console.log(`--------- Gender: ${account.gender} --------- \n`);
    console.log(`\nFriends: ${printFriends(account)}\n`);
}

function printFriends(account) {
    let friendString = "";
    account.friends.forEach(function(itemKey){
        friend = accountsMap.get(itemKey);

        friendString += `\n--------- ${friend.firstName} ${friend.surname} --------with friend:\n`;
        friend.friends.forEach(function(item){
            friendFriends = accountsMap.get(item);
            console.log(accountsMap.get(item));
            console.log(friendFriends)

            friendString += `-${friendFriends.firstName} ${friendFriends.surname}----\n`
        });
    });
    return friendString;
}