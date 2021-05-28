export const siteURL = "https://blaseball.com";
export const hexCharacter = "[a-fA-F0-9]";

let h = hexCharacter;
export const uuidRegex = new RegExp(`${h}{8}(-${h}{4}){3}${h}{8}`,'gi')
export function openURL(url) {location.assign(url)}
export async function attrs(obj) {
	return ["item", "perm", "game", "week", "seas", "tmPm", "tmGm", "tmWk", "tmSn"]
		.map(i => await obj[`${i}attr`] ?? [])
		.reduce((a,b) => a.concat(b));
}
export function arrayToObj(key, ...objs) {
	let e = {}
	objs.forEach(o => e[o[key]] = o);
	return e;
}
