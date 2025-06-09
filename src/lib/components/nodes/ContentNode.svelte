<script lang="ts">
	import {
		Handle,
		Position,
		useSvelteFlow,
		NodeResizer,
		NodeResizeControl,
		type NodeProps
	} from '@xyflow/svelte';
	import NodeTypePicker from '../ui/node-type-picker/NodeTypePicker.svelte';
	let { id, type, selected }: NodeProps = $props();
	let { updateNodeData } = useSvelteFlow();
</script>

<div
	class="flex h-full w-full min-w-[300px] flex-col divide-y divide-gray-200 rounded-xl border border-gray-200 bg-white shadow-md"
>
	<div class="flex items-center justify-between p-3">
		<NodeTypePicker {id} {type} />
	</div>
	<div class="nodrag nowheel flex-grow">
		<textarea
			oninput={(e) => updateNodeData(id, { content: (e.target as HTMLTextAreaElement).value })}
			class="h-full w-full resize-none p-3 focus:outline-none"
			placeholder="Type your content here..."
		></textarea>
	</div>

	<Handle type="source" position={Position.Right} style="top:24px" class="custom-handle" />

	<NodeResizer isVisible={selected} minWidth={300} maxWidth={600} minHeight={140} maxHeight={400}  color="#4480FF" class="rounded-4xl" handleStyle="width: 14px; height: 14px; background: rgb(255, 64, 0); border-radius: 8px; border: 2px solid white;" />
	
</div>
