<script lang="ts">
	import { buildNo, newKeyClicked } from "../store";
	import { generateBeta } from "../lib/generateBeta";

	let [betaId, betaPassword] = generateBeta($buildNo);

	$: if ($newKeyClicked) {
		[betaId, betaPassword] = generateBeta($buildNo);
		$newKeyClicked = false;
	}
</script>

<p>
	Your Beta Site ID &amp; Password are located in the space below. They can be
	used as a replacement for the credentials originally provided by the company.
</p>
<div class="field-row-stacked">
	<div class="field-row beta-text-box-container">
		<label for="betaIdTextBox">Beta Site ID:</label>
		<input id="betaIdTextBox" type="text" readonly value={betaId} />
	</div>
	<div class="field-row beta-text-box-container">
		<label for="betaPasswordTextBox">Password:</label>
		<input id="betaPasswordTextBox" type="text" readonly value={betaPassword} />
	</div>
</div>

<style>
	.beta-text-box-container {
		justify-content: space-between;
	}
</style>
