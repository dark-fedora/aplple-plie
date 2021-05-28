import {miniPlayer as Player} from 'player';
import {attrs, openURL, siteURL} from 'global';

export default function Team(thisArg) {
	thisArg.goToPage = function () {openURL(`${siteURL}/team/${thisArg.id}`)}
	thisArg.goToEndpoint = function () {openURL(`${siteURL}/database/team?id=${thisArg.id}`)}
	thisArg.currentPitcher = get function() {return thisArg.rotation[thisArg.rotationSlot % thisArg.rotation.length]}
	thisArg.attrs = attrs(thisArg);
	for (i in ["bullpen", "bench", "rotation", "lineup"]) {
		thisArg[i].map(Player)
	}
	thisArg.getBatter = function() {}
	thisArg.getLineupPlayer = thisArg.getBatter

	return thisArg;
}

export function miniTeam(thisArg) {
	thisArg = {"id": thisArg}
	thisArg.goToPage = function () {openURL(`${siteURL}/team/${thisArg.id}`)}
	thisArg.goToEndpoint = function() {
		openURL(`${siteURL}/database/team?id=${thisArg.id}`)
	}	
	return thisArg;
}
