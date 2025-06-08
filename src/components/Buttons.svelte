<script lang="ts">
	import { selectedKey, dialogWindow, newKeyClicked } from "../store";

	import Url from "./Url.svelte";

	const handleNextButton = () => {
		if ($dialogWindow === "mainPick" && $selectedKey !== "beta")
			$dialogWindow = "cdKey";
		else if ($dialogWindow === "mainPick" && $selectedKey === "beta")
			$dialogWindow = "betaPick";
		else if ($dialogWindow === "betaPick") $dialogWindow = "betaKey";
	};

	const handleBackButton = () => {
		if ($dialogWindow === "betaKey") $dialogWindow = "betaPick";
		else if ($dialogWindow !== "mainPick") $dialogWindow = "mainPick";
	};

	const handleNewKeyButton = () => ($newKeyClicked = true);
</script>

<section class="field-row">
	<Url />
	<button disabled={$dialogWindow === "mainPick"} on:click={handleBackButton}
		>&lt; Back</button
	>
	{#if $dialogWindow === "mainPick" || $dialogWindow === "betaPick"}<button
			on:click={handleNextButton}>Next &gt;</button
		>
	{:else}
		<button on:click={handleNewKeyButton}>New Key</button>
	{/if}
</section>
