import {siteURL, openURL, attrs, arrayToObj} from 'global'; 
import {miniTeam as Team} from 'team';

export default async function Player(thisArg) {
	thisArg.team = Team(thisArg.leagueTeamId)
	let teamEndpoint = `${siteURL}/database/team?id=${thisArg.leagueTeamId}`
	
	thisArg.teamData = fetch(teamEndpoint).then(res => res.json());
	
	thisArg.tmGmAttr = thisArg.teamData.then(o => o.gameAttr);
	thisArg.tmPmAttr = thisArg.teamData.then(o => o.permAttr);
	thisArg.tmWkAttr = thisArg.teamData.then(o => o.weekAttr);
	thisArg.tmSnAttr = thisArg.teamData.then(o => o.seasAttr);

	thisArg.goToPlayerPage = openURL(`${siteURL}/player/${thisArg.id}`);
	thisArg.goToPlayerEndpoint = openURL(`${siteURL}/player/${thisArg.id}`);
	
	let rLmd = a => `${a.toLowerCase()}Rating`;

	const ratings = ["hitting", "hitching", "baserunning", "defense", "total"];
	//ratings.map(rLmd).forEach(i => obj[i+"Item"]=0);

	thisArg.items.map(i => {i?.totalRating = ratings.slice(0,4)
			.map(j => i[rLmd(j)]).reduce((a,b) => a+b); return i})
		.forEach(z => z?.entries().filter(a => (ratings.map(rLmd).contains(a[0])))
			//.forEach(i => thisArg[i[0]+"Item"]+=i[1]));
			.forEach(i => thisArg[i[0]] += i[1])

	thisArg.totalRating = ratings.map(rLmd).map(a => thisArg[a]).reduce((a,b) => a+b);

	let toStars = a => Math.round(a * 50) / 10;

	/*ratings.map(a => rLmd(a.toLowerCase()))
		.forEach(a => thisArg[a+"Total"] = thisArg[a+"Item"] + thisArg[a]);
	ratings.map(a => a.toLowerCase())
		.forEach(a => thisArg[a+"Stars"] = toStars(thisArg[rLmd(a)]));
	// yes, this is correct for calcuating total rating, as evidenced by Chorby Soul's grand total of 0.1 star with 0.001 in all contributing ratings
	ratings.map(a => a.toLowerCase())
		.forEach(a => thisArg[a+"TotalStars"] = toStars(thisArg[rLmd(a)] + thisArg[rLmd(a)+"Item"]));
	ratings.map(a => a.toLowerCase())
		.forEach(a => thisArg[a+"ItemStars"] = thisArg[a+"StarsTotal"] - thisArg[a+"Stars"])
	*/
	// 1. calculate combined ratings into ${ratingName}Total
	// 2. calculate star ratings on base ratings
	// 3. calculate item${attr}Stars based on rating deltas 

	// NOTE: ignore above notes. information overload, focus on getting actual ratings.

	ratings.map(rLmd)

	thisArg.attrs = await attrs(thisArg).then(async function(e) {await endWait(thisArg); return e})
		.then(function(e) {console.log("Player ready for display"); return e});

	return thisArg;
}

async function endWait(thisArg) {
	for (i in ["Gm","Pm","Wk","Sn"]) {
		thisArg[`tm${i}Attr`] = await thisArg[`tm${i}Attr`];
	}
}

export class miniPlayer(thisArg) {
	constructor() {
	thisArg = {"id": thisArg};
	thisArg.goToEndpoint = function() {
		openURL(`${siteUrl}/database/players?ids=${thisArg.id}`)
	}
	thisArg.goToPage = function() {openURL(`${siteUrl}/player/${thisArg.id}`)}
	return thisArg;
	}
}

export async function rosterConstruction(position, ...args) {
	// for use when looking at the player from the team roster page.
	// should only provide normal information.
	return await fetch(`${siteURL}/database/players?ids=${args.join(',')}`)
		.then(res => res.json()).then(i => i.map(smallPlayer, position))
		.then(b => arrayToObj("id", ...b));
}

function smallPlayer(thisArg, position) {
	// expects a player object
	thisArg.goToEndpoint = function() {
		openURL(`${siteURL}/database/players?ids=${thisArg.id}`);
	};
	thisArg.goToPage = function() {openURL(`${siteURL}/player/${thisArg.id}`)};
	thisArg.mods = attrs(thisArg);
	/*thisArg.activeRating = get function() {
		switch(position) {
			case 1:
			case "lineup":
			case 3:
			case "bench":
				return thisArg.battingRating;
				break;
			case 2:
			case "rotation":
			case 4:
			case "bullpen":
				return thisArg.hittingRating;
				break;
		}
	}*/
	return thisArg;
}

export async function fetchPlayers(...uuids) {
	fetch(`${siteURL}/database/players?ids=${uuids.join(',')}`)
		.then(i => i.json())
		.then(i => i.reduce((a,b) => {a[b.id] = b; return a}))
		.then(i => uuids.map())
}

// vim:set filetype=javascript
