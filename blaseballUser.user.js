// ==UserScript==
// @name		Blaseball Data-handling
// @description	Loads some data into console for manipulation after creation.
// @grant		none
// @include		*blaseball.com*
// @version		0.0.1 (1)
// @author		A Tacos Fan
// ==/UserScript==

// MODULE: BlaseballUserscript
// COMPONENT: Point of Entry
// PURPOSE: Determine which module/script is necessary for obtaining extra data.

const h = "[0-9a-fA-F]";
const uuid = `${h}{8}-${h}{4}-${h}{4}-${h}{12}`;
// XXX No longer necessary; can simply check for property contentType of html element
const isEndpoint = () => document.contentType == "application/json";

const plyrPg = new RegExp(`/player/${uuid}`);
const teamPg = new RegExp(`/team/${uuid}`);
const shopPg = new RegExp('/shop');
const votePg = new RegExp('/election');

