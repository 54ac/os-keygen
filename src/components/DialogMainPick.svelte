<script lang="ts">
	import { selectedKey } from "../store";

	const keyTypes = [
		{ id: "10", label: '10-digit "CD Key"' },
		{ id: "11", label: '11-digit "CD Key"' },
		{ id: "20", label: '20-digit "Product ID" (OEM)' },
		{ id: "beta", label: "Beta Site ID & Password" }
	];
</script>

<div class="field-row">
	<p>Which type of key do you need?</p>
</div>

{#each keyTypes as keyType}
	<div class="field-row">
		<input
			type="radio"
			id={keyType.id}
			value={keyType.id}
			bind:group={$selectedKey}
		/>
		<label for={keyType.id}>{keyType.label}</label>
	</div>
{/each}
