import { Background, Position, ReactFlow, type Edge, type Node } from '@xyflow/react'
import '@xyflow/react/dist/base.css'
import { Box, Typography, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'

type MethodFlowDiagramProps = {
  labels: string[]
  title: string
  testId: string
}

export function MethodFlowDiagram({ labels, title, testId }: MethodFlowDiagramProps) {
  const theme = useTheme()
  const vertical = useMediaQuery(theme.breakpoints.down('sm'))
  const columns = vertical ? 1 : labels.length > 5 ? 4 : labels.length
  const rows = Math.ceil(labels.length / columns)
  const nodes: Node[] = labels.map((label, index) => ({
    id: `method-flow-node-${index}`,
    data: { label },
    position: {
      x: (index % columns) * 210,
      y: Math.floor(index / columns) * 110 + 40,
    },
    sourcePosition: vertical || (index + 1) % columns === 0 ? Position.Bottom : Position.Right,
    targetPosition: vertical || index % columns === 0 ? Position.Top : Position.Left,
    style: {
      background: 'var(--mui-palette-background-paper)',
      border: '3px solid var(--mui-palette-text-primary)',
      borderRadius: '8px',
      boxShadow: '4px 4px 0 var(--mui-palette-text-primary)',
      color: 'var(--mui-palette-text-primary)',
      fontWeight: 900,
      padding: '12px 16px',
      width: 164,
    },
  }))

  const edges: Edge[] = labels.slice(1).map((_, index) => ({
    id: `method-flow-edge-${index}`,
    source: `method-flow-node-${index}`,
    target: `method-flow-node-${index + 1}`,
    animated: false,
    style: { stroke: 'var(--mui-palette-text-primary)', strokeWidth: 3 },
  }))

  return (
    <Box component="figure" data-testid={testId} sx={{ m: 0 }}>
      <Typography component="figcaption" sx={{ fontWeight: 900, mb: 1.5 }}>
        {title}
      </Typography>
      <Box
        sx={{
          border: '3px solid',
          borderColor: 'text.primary',
          height: vertical ? Math.max(360, rows * 110 + 80) : Math.max(220, rows * 110 + 60),
          overflow: 'hidden',
          '& .react-flow__attribution': { display: 'none' },
          '& .react-flow__controls': { display: 'none' },
          '& .react-flow__edge-path': { strokeLinecap: 'square' },
        }}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          fitView
          fitViewOptions={{ padding: 0.18 }}
          nodesConnectable={false}
          nodesDraggable={false}
          elementsSelectable={false}
          panOnDrag={false}
          zoomOnDoubleClick={false}
          deleteKeyCode={null}
          selectionOnDrag={false}
          proOptions={{ hideAttribution: true }}
        >
          <Background gap={18} size={1} />
        </ReactFlow>
      </Box>
    </Box>
  )
}
