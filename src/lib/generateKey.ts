import getRandomInt from "./getRandomInt";

export const generateKey = (type: string) => {
	// from so
	const sumDigits = (digits: string) =>
		[...digits].map((e) => parseInt(e)).reduce((a, b) => a + b);

	const getMod7 = (zero = false) => {
		let number = "";

		do {
			number =
				(zero ? "0" : getRandomInt(0, 9)) +
				getRandomInt(0, 9, 5) +
				getRandomInt(1, 7);
		} while (sumDigits(number) % 7 !== 0);

		return number;
	};

	const addedNumber = () => {
		const third = getRandomInt(0, 9);

		const fourth = (parseInt(third) + parseInt(getRandomInt(1, 2)))
			.toString()
			.slice(-1);

		return "" + third + fourth;
	};

	const dateNo = () => {
		// from epoch converter
		const today = new Date();
		const dayNo = (
			"00" +
			Math.ceil(
				(today.getTime() - new Date(today.getFullYear(), 0, 1).getTime()) /
					86400000
			)
		).slice(-3);

		const yearNo = (() => {
			const third = today.getFullYear().toString().slice(-1);

			if (Number(third) >= 5 && Number(third) <= 9) return "9" + third;
			if (Number(third) >= 0 && Number(third) <= 3) return "0" + third;
			return getRandomInt(1995, 2003).toString().slice(-2);
		})();

		return "" + dayNo + yearNo;
	};

	const key: string[] = [];

	// from https://gurney.dev/posts/mod7/
	switch (type) {
		case "10":
			// first part can be any positive 3-digit number up to 998, but can't consist of the same digit starting from 333
			key[0] = "" + getRandomInt(0, 9) + "54";
			// the second part can be any 7-digit number that is divisible by 7, with the last digit being 1-7
			key[1] = getMod7();
			break;
		case "11":
			// the first 3 digits can be any number
			// the 4th digit is the 3rd digit + 1 or 2 (if 3rd digit is e.g. 9, then 0 or 1)
			key[0] = "54" + addedNumber();
			// the second part is the same as in 10-digit codes
			key[1] = getMod7();
			break;
		case "20":
			// the first 3 digits are the day of the year (001-366)
			// the last 2 digits are the year (95-03)
			key[0] = dateNo();
			key[1] = "OEM";
			// the second part is the same as in the other codes, but must start with 0
			key[2] = getMod7(true);
			// the last part can be any 5-digit number
			key[3] = "54" + getRandomInt(0, 9, 3);
			break;
		default:
			key[0] = "ERROR";
			break;
	}

	return key;
};
