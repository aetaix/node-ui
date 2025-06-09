<script lang="ts">
	import { Bot, LetterText, FileCog, CodeXml } from '@lucide/svelte';
	let { addNode } = $props();

	const tools = [
		{
			label: 'Add LLM',
			icon: Bot,
			type: 'llm'
		},
		{
			label: 'Add content',
			icon: LetterText,
			type: 'content'
		},
		{
			label: 'Add Code',
			icon: CodeXml,
			type: 'code'
		},
		{
			label: 'Add system',
			icon: FileCog,
			type: 'system'
		},
		
	];
</script>

<div class="flex items-center gap-2 rounded-2xl border border-gray-200 bg-white p-2 shadow">
	{#each tools as tool}
		<button
			class="flex items-center  justify-center rounded-lg size-12  hover:bg-gray-200 transition-colors active:scale-95"
			onclick={() => addNode(tool.type)}
		>
			<tool.icon class="size-6" />
		</button>
	{/each}
</div>
