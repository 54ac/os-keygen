// from mdn
export const getRandomInt = (min, max, no = 1) => {
	let number = "";

	for (let i = 0; i < no; i++) {
		number += Math.floor(
			Math.random() * (Math.floor(max) - Math.ceil(min) + 1) + Math.ceil(min)
		);
	}

	return number;
};
