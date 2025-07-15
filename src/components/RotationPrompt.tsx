// components/RotationPrompt.tsx
import { Smartphone, RotateCcw } from 'lucide-react';

interface RotationPromptProps {
  show: boolean;
  onDismiss?: () => void;
}

const RotationPrompt = ({ show, onDismiss }: RotationPromptProps) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full text-center">
        {/* Animated Phone Icon */}
        <div className="mb-4 flex justify-center">
          <div className="relative">
            <Smartphone className="w-16 h-16 text-gray-400" />
            <div className="absolute -top-2 -right-2 animate-bounce">
              <RotateCcw className="w-8 h-8 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Message */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Better Experience in Landscape
        </h3>
        <p className="text-gray-600 mb-4">
          Please rotate your device to landscape mode for the best viewing experience.
        </p>

        {/* Visual Rotation Guide */}
        <div className="mb-4 flex justify-center items-center space-x-2">
          <div className="w-8 h-12 bg-gray-300 rounded-sm"></div>
          <div className="text-2xl">→</div>
          <div className="w-12 h-8 bg-blue-600 rounded-sm"></div>
        </div>

        {/* Optional dismiss button */}
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="text-sm text-gray-500 hover:text-gray-700 underline"
          >
            Continue in portrait mode
          </button>
        )}
      </div>
    </div>
  );
};

export default RotationPrompt;