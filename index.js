import * as fs from "fs";
import fetch from "node-fetch";

run();

const result = [];

async function run() {
    const jsonData = fs.readFileSync("./family-hubs.json", {
        encoding: "utf-8"
    });

    const json = JSON.parse(jsonData);
    for (let fh of json) {
        const name = fh["Family hub name"];
        const postcode = fh["Postcode"];

        const res = await fetch(`https://api.postcodes.io/postcodes/${postcode}`);
        const resJson = await res.json();

        result.push({
            name,
            postcode,
            lookup: resJson
        });

        console.log(`Got ${name} @ ${postcode}...`);
        
        await delay(500);
    }

    fs.writeFileSync("result.json", JSON.stringify(result));
}

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
} 

