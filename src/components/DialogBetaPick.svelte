<script lang="ts">
	import { buildNo } from "../store";

	const builds = ["73f", "73g", "81", "99", "122", "216"];
</script>

<div class="field-row">
	<p>Which beta build?</p>
</div>

{#each builds as build}
	<div class="field-row">
		<input type="radio" id={build} value={build} bind:group={$buildNo} />
		<label for={build}>{build}</label>
	</div>
{/each}
