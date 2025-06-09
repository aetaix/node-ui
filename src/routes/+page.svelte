<script lang="ts">
	import { SvelteFlow, Background, Panel, Controls, type Node } from '@xyflow/svelte';
	import '@xyflow/svelte/dist/style.css';
	import LlmNNode from '$lib/components/nodes/LlmNode.svelte';
	import ResponseNode from '$lib/components/nodes/ResponseNode.svelte';
	import ContentNode from '$lib/components/nodes/ContentNode.svelte';
	import CodeNode from '$lib/components/nodes/CodeNode.svelte';
	import SystemNode from '$lib/components/nodes/SystemNode.svelte';
	import Dock from '$lib/components/Dock.svelte';

	const nodeTypes = {
		content: ContentNode,
		llm: LlmNNode,
		response: ResponseNode,
		system: SystemNode,
		code: CodeNode
	};

	const initialNodes = [
		{
			id: 'initial-llm',
			type: 'llm',
			position: { x: 40, y: 0 },
			
			data: { label: 'llm', model: '', prompt: '', system: '' }
		}
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

<svelte:head>
	<title>nodeUI - AI Node Editor</title>
</svelte:head>

<div class="h-screen w-full">
	<SvelteFlow bind:nodes bind:edges fitView {nodeTypes}>
		<Background />
		<Controls />

		<Panel position="bottom-center">
			<Dock {addNode} />
		</Panel>
	</SvelteFlow>
</div>
