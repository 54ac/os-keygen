import md4 from "js-md4";
import getRandomInt from "./getRandomInt";

export const generateBeta = (build: string) => {
	// from https://github.com/dgurney/chicagokey/blob/master/pkg/generator/generate.go

	// site id is any 6-digit number
	const betaSiteId = "54" + getRandomInt(0, 9, 4);
	const betaPassword = (() => {
		// the first 4 characters are any positive number up to 65535 (unsigned 16-bit) in hex
		const first = ("000" + parseInt(getRandomInt(1, 65535)).toString(16)).slice(
			-4
		);

		// these strings are used for the md4 hash below
		const buildString = (() => {
			switch (build) {
				case "73f":
					return atob(
						"TWljcm9zb2Z0IENoaWNhZ28gUERLIFJlbGVhc2UsIE5vdmVtYmVyIDE5OTM="
					);
				case "73g":
					return atob(
						"TWljcm9zb2Z0IENoaWNhZ28gUERLMiBSZWxlYXNlLCBEZWNlbWJlciAxOTkz"
					);
				case "81":
					return atob(
						"Q2hpY2FnbyBQcmVsaW1pbmFyeSBQREsgUmVsZWFzZSwgSmFudWFyeSAxOTk0"
					);
				case "99":
					return atob(
						"Q2hpY2FnbyBQcmVsaW1pbmFyeSBCZXRhIDEgUmVsZWFzZSwgTWF5IDE5OTQ="
					);
				case "122":
					return atob("Q2hpY2FnbyBCZXRhIDEgUmVsZWFzZSwgTWF5IDE5OTQ=");
				case "216":
					return atob("V2luZG93cyA5NSBCZXRhIDIgUmVsZWFzZSwgT2N0b2JlciAxOTk0");
				default:
					return false;
			}
		})();
		if (!buildString) return "ERROR";

		// md4 hash is made from this concatenated string
		const hash = md4(betaSiteId + first + buildString);
		// the last 4 characters are the first 2 hex values of the resulting hash, in reverse
		const third = [hash.slice(0, 2), hash.slice(2, 4)].reverse().join("");

		// the middle character is mod 9 of the sum of ascii codes
		let second = 0;
		for (const n of betaSiteId) {
			second += n.charCodeAt(0);
		}
		for (const n of first) {
			second += n.charCodeAt(0);
		}
		for (const n of third) {
			second += n.charCodeAt(0);
		}

		// include leading zeroes just in case
		return ("00000000" + first + (second % 9) + third).slice(-9);
	})();

	return [betaSiteId, betaPassword];
};
