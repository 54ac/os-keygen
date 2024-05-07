<script lang="ts">
	import DialogMainPick from "./components/DialogMainPick.svelte";
	import DialogCDKey from "./components/DialogCDKey.svelte";
	import DialogBetaPick from "./components/DialogBetaPick.svelte";
	import DialogBetaKey from "./components/DialogBetaKey.svelte";
	import Buttons from "./components/Buttons.svelte";
	import TitleBar from "./components/TitleBar.svelte";
	import Icon from "./components/Icon.svelte";

	import { dialogWindow } from "./store";
</script>

<main class="window">
	<TitleBar />
	<div class="window-body">
		<section class="field-row" id="body-container">
			<Icon />
			<section id="dialog-container">
				<div id="main-dialog">
					{#if $dialogWindow === "mainPick"}
						<DialogMainPick />
					{:else if $dialogWindow === "cdKey"}
						<DialogCDKey />
					{:else if $dialogWindow === "betaPick"}
						<DialogBetaPick />
					{:else if $dialogWindow === "betaKey"}
						<DialogBetaKey />
					{/if}
				</div>
				<Buttons />
			</section>
		</section>
	</div>
</main>

<style>
	.window {
		width: 360px;
		height: 240px;
		display: flex;
		flex-direction: column;
	}

	.window-body {
		height: 100%;
	}

	#dialog-container {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	#body-container {
		display: flex;
		height: 100%;
	}

	#main-dialog {
		flex: 1;
	}
</style>
