<script lang="ts">
	import { SvelteFlow, Background, Panel, Controls, type Node } from '@xyflow/svelte';
	import '@xyflow/svelte/dist/style.css';
	import LlmNNode from '$lib/components/nodes/LlmNode.svelte';
	import ResponseNode from '$lib/components/nodes/ResponseNode.svelte';
	import ContentNode from '$lib/components/nodes/ContentNode.svelte';
	import SystemNode from '$lib/components/nodes/SystemNode.svelte';

	const nodeTypes = { content: ContentNode, llm: LlmNNode, response: ResponseNode, system: SystemNode  };

	const initialNodes = [
		{
			id: 'initial-llm',
			type: 'llm',
			position: { x: 450, y: 0 },
			data: { label: 'llm', model: '', prompt: '', system: '' }
		},
		
	];

	let nodes = $state.raw<Node[]>(initialNodes);

	let edges = $state.raw([]);

	function addNode(type: string) {
		const newNode = {
			id: crypto.randomUUID(),
			type,
			position: {
				x: 200,
				y: 200
			},
			data: { label: 'llm', content: '' }
		};
		nodes = [...nodes, newNode];
	}
</script>

<div class="h-screen w-full">
	<SvelteFlow bind:nodes bind:edges fitView {nodeTypes}>
		<Background />
		<Controls />

		<Panel position="bottom-center">
			<div class="rounded-2xl border border-gray-200 bg-white p-3 shadow">
				<button class="rounded-lg bg-black px-4 py-3 text-white" onclick={() => addNode('llm')}
					>Add LLM</button
				>
				<button class="rounded-lg bg-black px-4 py-3 text-white" onclick={() => addNode('content')}
					>Add Prompt</button
				>
				<button class="rounded-lg bg-black px-4 py-3 text-white" onclick={() => addNode('system')}
					>Add System</button
				>
			
			</div>
		</Panel>
	</SvelteFlow>
</div>
