import { DndContext, closestCenter } from '@dnd-kit/core';
import { restrictToParentElement } from '@dnd-kit/modifiers';

export const DndProvider = ({ children }) => {
    return (
        <DndContext
            collisionDetection={closestCenter}
            modifiers={[restrictToParentElement]}
        >
            {children}
        </DndContext>
    );
};