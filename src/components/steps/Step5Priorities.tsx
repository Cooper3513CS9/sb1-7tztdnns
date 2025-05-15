import React from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { Star, TrendingUp, Sun, Flame, Droplet, Leaf, Shield, Home, GripVertical } from 'lucide-react';
import { useUserData } from '../../context/UserDataContext';
import Card from '../common/Card';
import StepNavigation from '../common/StepNavigation';
import StepProgress from '../common/StepProgress';
import InfoBox from '../common/InfoBox';

interface Priority {
  id: string;
  label: string;
  iconName: string;
  description: string;
  importance: number;
}

export default function Step5Priorities() {
  const { userData, updateUserData, colors } = useUserData();
  const [localPriorities, setLocalPriorities] = React.useState<Priority[]>([]);

  React.useEffect(() => {
    if (userData.priorities?.length > 0) {
      setLocalPriorities(userData.priorities);
    }
  }, [userData.priorities]);

  const getIconComponent = (iconName: string) => {
    const icons: Record<string, React.ReactNode> = { 
      TrendingUp: <TrendingUp size={24} className="mr-3 flex-shrink-0" style={{color: colors.secondary}} />,
      Sun: <Sun size={24} className="mr-3 flex-shrink-0" style={{color: colors.secondary}} />,
      Flame: <Flame size={24} className="mr-3 flex-shrink-0" style={{color: colors.secondary}} />,
      Droplet: <Droplet size={24} className="mr-3 flex-shrink-0" style={{color: colors.secondary}} />,
      Leaf: <Leaf size={24} className="mr-3 flex-shrink-0" style={{color: colors.secondary}} />,
      Shield: <Shield size={24} className="mr-3 flex-shrink-0" style={{color: colors.secondary}} />,
      Home: <Home size={24} className="mr-3 flex-shrink-0" style={{color: colors.secondary}} />
    };
    return icons[iconName] || <TrendingUp size={24} className="mr-3 flex-shrink-0" style={{color: colors.secondary}} />;
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination || !localPriorities) return;

    const items = Array.from(localPriorities);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const updatedItems = items.map((item, index) => ({
      ...item,
      importance: index === 0 ? 5 : index === 1 ? 3 : 2
    }));

    setLocalPriorities(updatedItems);
    setTimeout(() => {
      updateUserData('priorities', updatedItems);
    }, 0);
  };

  if (!localPriorities || localPriorities.length === 0) {
    return null;
  }

  const getImportanceStyles = (index: number) => {
    switch (index) {
      case 0:
        return {
          card: 'bg-slate-800 border-slate-700',
          text: 'text-white',
          description: 'text-slate-300',
          dragHandle: 'text-slate-500 hover:text-slate-400'
        };
      case 1:
        return {
          card: 'bg-slate-700 border-slate-600',
          text: 'text-slate-100',
          description: 'text-slate-300',
          dragHandle: 'text-slate-400 hover:text-slate-300'
        };
      case 2:
        return {
          card: 'bg-slate-600 border-slate-500',
          text: 'text-slate-100',
          description: 'text-slate-300',
          dragHandle: 'text-slate-400 hover:text-slate-300'
        };
      case 3:
        return {
          card: 'bg-slate-500 border-slate-400',
          text: 'text-white',
          description: 'text-slate-200',
          dragHandle: 'text-slate-300 hover:text-slate-200'
        };
      case 4:
        return {
          card: 'bg-slate-400 border-slate-300',
          text: 'text-slate-900',
          description: 'text-slate-700',
          dragHandle: 'text-slate-600 hover:text-slate-700'
        };
      case 5:
        return {
          card: 'bg-slate-300 border-slate-200',
          text: 'text-slate-900',
          description: 'text-slate-700',
          dragHandle: 'text-slate-600 hover:text-slate-700'
        };
      default:
        return {
          card: 'bg-slate-200 border-slate-100',
          text: 'text-slate-900',
          description: 'text-slate-600',
          dragHandle: 'text-slate-500 hover:text-slate-600'
        };
    }
  };

  return (
    <Card title="Stap 6: Wat Vindt U Belangrijk?" icon={<Star size={28} style={{color: colors.primary}}/>}>
      <p className="text-slate-600 mb-6">
        Sleep de opties naar boven of beneden om aan te geven wat u het belangrijkst vindt. 
        De bovenste optie wordt als meest belangrijk beschouwd.
      </p>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="priorities">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-3"
            >
              {localPriorities.map((priority: Priority, index: number) => {
                const styles = getImportanceStyles(index);
                return (
                  <Draggable key={priority.id} draggableId={priority.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className={`p-4 rounded-lg transition-all duration-200 ${
                          snapshot.isDragging
                            ? 'shadow-lg ring-2 ring-blue-500 bg-white'
                            : `${styles.card} shadow-sm`
                        } border`}
                      >
                        <div className="flex items-center">
                          <div
                            {...provided.dragHandleProps}
                            className={`mr-3 cursor-grab active:cursor-grabbing ${styles.dragHandle}`}
                          >
                            <GripVertical size={20} />
                          </div>
                          {getIconComponent(priority.iconName)}
                          <div className="flex-grow">
                            <h4 className={`font-semibold ${styles.text}`}>
                              {priority.label}
                            </h4>
                            <p className={`text-xs ${styles.description}`}>
                              {priority.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <InfoBox>
        Sleep de opties omhoog of omlaag om hun prioriteit aan te passen. De bovenste optie wordt als meest belangrijk beschouwd en zal extra aandacht krijgen in uw persoonlijke advies.
      </InfoBox>

      <StepNavigation prevStep="intake-step5" nextStep="summary-check" />
      <StepProgress step={6} stepTitle="Uw Prioriteiten" />
    </Card>
  );
}