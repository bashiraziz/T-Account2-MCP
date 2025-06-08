"use client";

import React, { useState, useEffect } from "react";
import Joyride, {
  Step,
  CallBackProps,
  STATUS,
  EVENTS,
  ACTIONS,
  TooltipRenderProps,
  Status,
} from "react-joyride";

interface AppTourProps {
  steps: Step[];
  run?: boolean;
  continuous?: boolean;
  showProgress?: boolean;
  showSkipButton?: boolean;
  onTourEnd?: () => void;
  onTourStart?: () => void;
  styles?: any;
}

// Extend TooltipRenderProps to add your own props
interface CustomTooltipProps extends TooltipRenderProps {
  onTourEnd?: () => void;
  setTourState: React.Dispatch<
    React.SetStateAction<{ run: boolean; stepIndex: number }>
  >;
}

// Custom tooltip component for better styling and skip handling
const CustomTooltip: React.FC<CustomTooltipProps> = ({
  continuous,
  index,
  step,
  backProps,
  primaryProps,
  tooltipProps,
  size,
  onTourEnd,
  setTourState,
}) => (
  <div
    {...tooltipProps}
    className="bg-white rounded-lg shadow-2xl p-6 w-full max-w-sm mx-auto"
  >
    <div className="mb-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
      <div className="text-gray-600 text-sm leading-relaxed">
        {step.content}
      </div>
    </div>

    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
        {index > 0 && (
          <button
            {...backProps}
            className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800 transition-colors"
          >
            Back
          </button>
        )}
        <button
          onClick={() => {
            setTourState({ run: false, stepIndex: 0 });
            if (onTourEnd) {
              onTourEnd();
            }
          }}
          className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          Skip Tour
        </button>
      </div>

      <div className="flex items-center space-x-2">
        <span className="text-xs text-gray-400">
          {index + 1} of {size}
        </span>
        {continuous && (
          <button
            {...primaryProps}
            className="px-4 py-2 bg-primary text-white text-sm rounded-md"
          >
            {index === size - 1 ? "Finish" : "Next"}
          </button>
        )}
      </div>
    </div>
  </div>
);

const AppTour: React.FC<AppTourProps> = ({
  steps,
  run = false,
  continuous = true,
  showProgress = true,
  showSkipButton = true,
  onTourEnd,
  onTourStart,
  styles = {},
}) => {
  const [tourState, setTourState] = useState({
    run: false,
    stepIndex: 0,
  });

  useEffect(() => {
    setTourState((prev) => ({ ...prev, run }));
  }, [run]);

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status, type, index, action } = data;

    if (type === EVENTS.TOUR_START && onTourStart) {
      onTourStart();
    }

    if (([STATUS.FINISHED, STATUS.SKIPPED] as Status[]).includes(status)) {
      setTourState({ run: false, stepIndex: 0 });
      if (onTourEnd) {
        onTourEnd();
      }
    } else if (type === EVENTS.STEP_AFTER) {
      setTourState((prev) => ({
        ...prev,
        stepIndex: index + (action === ACTIONS.PREV ? -1 : 1),
      }));
    }
  };

  const defaultStyles = {
    options: {
      primaryColor: "#3b82f6",
      backgroundColor: "#ffffff",
      overlayColor: "rgba(0, 0, 0, 0.4)",
      spotlightShadow: "0 0 15px rgba(0, 0, 0, 0.5)",
      beaconSize: 36,
      zIndex: 10000,
    },
    tooltip: {
      fontSize: 14,
      padding: 0,
    },
    tooltipContainer: {
      textAlign: "left" as const,
    },
    spotlight: {
      borderRadius: 8,
    },
  };

  return (
    <Joyride
      callback={handleJoyrideCallback}
      continuous={continuous}
      run={tourState.run}
      stepIndex={tourState.stepIndex}
      steps={steps}
      showProgress={showProgress}
      showSkipButton={showSkipButton}
      styles={{
        ...defaultStyles,
        ...styles,
      }}
      tooltipComponent={(tooltipProps) => (
        <CustomTooltip
          {...tooltipProps}
          onTourEnd={onTourEnd}
          setTourState={setTourState}
        />
      )}
      disableOverlayClose
      disableScrollParentFix
      hideCloseButton
      scrollToFirstStep
      spotlightClicks
    />
  );
};

export default AppTour;
