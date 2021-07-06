"use strict";

import "98.css";
import "./main.css";
import { generateKey } from "./js/generateKey";
import { generateBeta } from "./js/generateBeta";

const keyTextBox = document.querySelector("#keyTextBox");
const betaInput = document.querySelector("#beta");
const buildContainer = document.querySelector("#buildContainer");
const mainDialog = document.querySelector("#mainDialog");
const betaDialog = document.querySelector("#betaDialog");
const keyDialog = document.querySelector("#keyDialog");
const keyButtons = document.querySelector("#keyButtons");
const betaIdTextBox = document.querySelector("#betaIdTextBox");
const betaPasswordTextBox = document.querySelector("#betaPasswordTextBox");

const betaCheck = () => {
	buildContainer.style.visibility = betaInput.checked ? "" : "hidden";
};
for (const e of document.querySelectorAll("input")) {
	e.onclick = () => betaCheck();
}
betaCheck();

document.querySelector("#mainNextButton").onclick = () => {
	if (document.querySelector("input:checked").id !== "beta") {
		const selectedKey = document.querySelector("input:checked").id;
		const newKey = generateKey(selectedKey);
		keyTextBox.value = newKey.join("-");

		for (const e of document.querySelectorAll(".keyType"))
			e.textContent = selectedKey === "20" ? "Product ID" : "CD Key";

		document.querySelector("#keyLocation").textContent =
			selectedKey === "20"
				? "your Certificate of Authenticity"
				: "the sticker on the back of your CD case";

		document.querySelector("#newKeyButton").onclick = () =>
			(keyTextBox.value = generateKey(selectedKey).join("-"));

		mainDialog.style.display = "none";
		betaDialog.style.display = "none";
		keyDialog.style.display = "";
		keyButtons.style.display = "";
	} else {
		const selectedBuild = document.querySelector("#buildNo").value;

		[betaIdTextBox.value, betaPasswordTextBox.value] = generateBeta(
			selectedBuild
		);

		document.querySelector("#newKeyButton").onclick = () =>
			([betaIdTextBox.value, betaPasswordTextBox.value] = generateBeta(
				selectedBuild
			));

		mainDialog.style.display = "none";
		betaDialog.style.display = "";
		keyDialog.style.display = "none";
		keyButtons.style.display = "";
	}
};

document.querySelector("#keyBackButton").onclick = () => {
	mainDialog.style.display = "";
	betaDialog.style.display = "none";
	keyDialog.style.display = "none";
	keyButtons.style.display = "none";
};

for (const e of document.querySelectorAll(`input[type="text"]`))
	e.onclick = (el) => el.target.setSelectionRange(0, el.target.value.length);
