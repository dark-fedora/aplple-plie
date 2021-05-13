// ==UserScript==
// @name		Blaseball Data-handling
// @description	Loads some data into console for manipulation after creation.
// @grant		none
// @include		*blaseball.com/*
// @version		0.0.1 (1)
// @author		A Tacos Fan
// ==/UserScript==

const b = "https://www\\.blaseball\\.com";
const h = "[0-9a-fA-F]";
const uuid = `${h}{8}-${h}{4}-${h}{4}-${h}{12}`;
// const epAddr = new RegExp(`${b}/(database)|(events)|(api)/(.*/)*${uuid}`);
// XXX No longer necessary; can simply check for property language of html element
const plyrPg = new RegExp(`${b}/player/${uuid}`);
async function runScript() {
	if((document.doctype && false) ?? true) {
		return window.data = document.body.innerText;
	}
	if(document.location.match(plyrPg)) {
		let playerId = document.location.match(uuid)[0];
		return window.data = await fetch(`${b}/database/players?ids=${playerId}`)
			.then(response => {if (!response.ok) {throw new Error('')}})
			.then(data => data.json)
			.catch(err => console.error(`Error encountered while trying to read player data: ${err}`));
	}
}
