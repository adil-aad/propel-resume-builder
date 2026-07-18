import React, { createContext, useContext } from 'react'
import { GripVertical } from 'lucide-react'
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

// ------------------------------------------------------------------
// Context to pass listeners + attributes down to DragHandle
// ------------------------------------------------------------------
const SortableItemContext = createContext(null)

// ------------------------------------------------------------------
// DragHandle — a visible, always-ready grab button that users can
// place anywhere inside their card via the render prop.
// ------------------------------------------------------------------
export const DragHandle = ({ className = '' }) => {
  const ctx = useContext(SortableItemContext)
  if (!ctx) return null

  return (
    <button
      type='button'
      className={`cursor-grab touch-none text-slate-400 transition hover:text-slate-700 active:cursor-grabbing ${className}`}
      {...ctx.attributes}
      {...ctx.listeners}
      aria-label='Drag to reorder'
    >
      <GripVertical className='size-4.5' />
    </button>
  )
}

// ------------------------------------------------------------------
// SortableItem — wraps a single item, provides context for DragHandle
// ------------------------------------------------------------------
const SortableItem = ({ id, children }) => {
  const sortable = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(sortable.transform),
    transition: sortable.transition,
    opacity: sortable.isDragging ? 0.4 : 1,
    position: 'relative',
    zIndex: sortable.isDragging ? 10 : 'auto',
  }

  return (
    <div ref={sortable.setNodeRef} style={style}>
      <SortableItemContext.Provider
        value={{
          attributes: sortable.attributes,
          listeners: sortable.listeners,
        }}
      >
        {children}
      </SortableItemContext.Provider>
    </div>
  )
}

// ------------------------------------------------------------------
// DraggableList — wraps an array of items with DnD context
//
// Usage:
//   <DraggableList items={myList} onReorder={setMyList}>
//     {(item, index, { dragHandle }) => (
//       <div className='card'>
//         <div className='flex items-center gap-2'>
//           {dragHandle}
//           <span>Item {index + 1}</span>
//         </div>
//         ...
//       </div>
//     )}
//   </DraggableList>
// ------------------------------------------------------------------
const DraggableList = ({ items, onReorder, children }) => {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  )

  const handleDragEnd = ({ active, over }) => {
    if (!over || active.id === over.id) return

    const oldIndex = items.findIndex((_, i) => i === active.id)
    const newIndex = items.findIndex((_, i) => i === over.id)
    if (oldIndex === -1 || newIndex === -1) return

    const reordered = [...items]
    const [moved] = reordered.splice(oldIndex, 1)
    reordered.splice(newIndex, 0, moved)

    onReorder(reordered)
  }

  const itemIds = items.map((_, i) => i)

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={itemIds} strategy={verticalListSortingStrategy}>
        {items.map((item, index) => (
          <SortableItem key={index} id={index}>
            {children(item, index, { DragHandle: <DragHandle /> })}
          </SortableItem>
        ))}
      </SortableContext>
    </DndContext>
  )
}

export default DraggableList