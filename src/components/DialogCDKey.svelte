<script lang="ts">
	import { selectedKey, newKeyClicked } from "../store";
	import { generateKey } from "../lib/generateKey";

	let key = generateKey($selectedKey);

	$: if ($newKeyClicked) {
		key = generateKey($selectedKey);
		$newKeyClicked = false;
	}
</script>

<p>
	Your "{$selectedKey !== "20" ? "CD Key" : "Product ID"}" is located in the
	space below. It can be used as a replacement for the number found on
	{$selectedKey !== "20"
		? "the sticker on the back of your CD case"
		: "your Certificate of Authenticity"}.
</p>
<div id="keyContainer" class="field-row-stacked">
	<label for="keyTextBox" id="keyLabel"
		>{$selectedKey !== "20" ? "CD Key" : "Product ID"}:</label
	>
	<input type="text" readonly value={key.join("-")} />
</div>

<style>
	#keyLabel {
		margin-bottom: 7px;
	}
</style>
