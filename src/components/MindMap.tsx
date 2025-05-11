import React, { useEffect } from 'react';
import ReactFlow, { 
  Background, 
  Controls,
  useNodesState,
  useEdgesState,
  Node,
  Edge
} from 'reactflow';
import 'reactflow/dist/style.css';
import type { Enterprise } from '../lib/supabase';

interface MindMapProps {
  enterprises: Enterprise[];
  category: string;
}

const MindMap: React.FC<MindMapProps> = ({ enterprises, category }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  useEffect(() => {
    if (!enterprises.length) return;

    // Create a center node for the main category
    const centerNode: Node = {
      id: 'center',
      data: { label: category },
      position: { x: 0, y: 0 },
      style: {
        background: category === 'Capital Sources' ? '#1565C0' : 
                   category === 'Open Source Tools' ? '#4CAF50' : 
                   '#795548',
        color: 'white',
        borderRadius: '50%',
        width: 150,
        height: 150,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '14px',
        fontWeight: 'bold',
        textAlign: 'center',
      },
    };

    // Map the subcategories
    const uniqueSubcategories = new Set<string>();
    enterprises.forEach(e => e.subcategories.forEach(s => uniqueSubcategories.add(s)));
    
    const subcategoryNodes: Node[] = Array.from(uniqueSubcategories).map((subcategory, index) => {
      const angle = (2 * Math.PI * index) / uniqueSubcategories.size;
      const radius = 300;
      const x = radius * Math.cos(angle);
      const y = radius * Math.sin(angle);
      
      return {
        id: `subcategory-${index}`,
        data: { label: subcategory },
        position: { x, y },
        style: {
          background: '#f0f4f8',
          borderColor: category === 'Capital Sources' ? '#1565C0' : 
                       category === 'Open Source Tools' ? '#4CAF50' : 
                       '#795548',
          borderWidth: 2,
          borderRadius: '8px',
          padding: '10px',
          width: 150,
          fontSize: '12px',
          textAlign: 'center',
        },
      };
    });

    // Create edges from center to subcategories
    const subcategoryEdges: Edge[] = subcategoryNodes.map((node, index) => ({
      id: `edge-center-${index}`,
      source: 'center',
      target: node.id,
      style: {
        stroke: category === 'Capital Sources' ? '#1565C0' : 
                category === 'Open Source Tools' ? '#4CAF50' : 
                '#795548',
      },
    }));

    // Enterprise nodes connected to their subcategories
    const enterpriseNodes: Node[] = [];
    const enterpriseEdges: Edge[] = [];
    
    enterprises.forEach((enterprise, eIndex) => {
      // Position enterprises based on their subcategories
      const connectedSubcategories = enterprise.subcategories;
      if (connectedSubcategories.length === 0) return;
      
      // Find connected subcategory nodes
      const connectedNodes = subcategoryNodes.filter((node, index) => 
        connectedSubcategories.includes(node.data.label)
      );
      
      if (connectedNodes.length === 0) return;
      
      // Calculate position based on the average of connected subcategory positions
      const avgX = connectedNodes.reduce((sum, node) => sum + node.position.x, 0) / connectedNodes.length;
      const avgY = connectedNodes.reduce((sum, node) => sum + node.position.y, 0) / connectedNodes.length;
      
      // Add some randomness to avoid overlap
      const jitter = 50;
      const x = avgX + (Math.random() * jitter * 2 - jitter);
      const y = avgY + (Math.random() * jitter * 2 - jitter);
      
      const enterpriseNode: Node = {
        id: `enterprise-${eIndex}`,
        data: { 
          label: enterprise.name,
          id: enterprise.id,
        },
        position: { x, y },
        style: {
          background: 'white',
          border: '1px solid #e2e8f0',
          borderRadius: '4px',
          padding: '8px',
          width: 120,
          fontSize: '10px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        },
      };
      
      enterpriseNodes.push(enterpriseNode);
      
      // Connect enterprise to its subcategories
      connectedNodes.forEach((subNode, sIndex) => {
        enterpriseEdges.push({
          id: `edge-${eIndex}-${sIndex}`,
          source: subNode.id,
          target: enterpriseNode.id,
          style: { 
            stroke: '#cbd5e0',
            strokeWidth: 1,
            strokeDasharray: '3,3',
          },
        });
      });
    });

    setNodes([centerNode, ...subcategoryNodes, ...enterpriseNodes]);
    setEdges([...subcategoryEdges, ...enterpriseEdges]);
  }, [enterprises, category, setNodes, setEdges]);

  const handleNodeClick = (_: React.MouseEvent, node: Node) => {
    if (node.data.id) {
      window.location.href = `/enterprise/${node.data.id}`;
    }
  };

  if (!enterprises.length) {
    return (
      <div className="bg-white p-6 rounded-lg shadow text-center">
        <p className="text-gray-600">No enterprises available for visualization.</p>
      </div>
    );
  }

  return (
    <div className="h-[500px] rounded-lg overflow-hidden shadow-md bg-white">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={handleNodeClick}
        fitView
      >
        <Background color="#f0f4f8" gap={16} />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default MindMap;