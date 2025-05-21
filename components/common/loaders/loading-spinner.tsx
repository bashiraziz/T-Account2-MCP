interface LoadingSpinnerProps {
  className?: string;
  borderColor?: string;
}
export const LoadingSpinner = ({
  className,
  borderColor = "border-secondary",
}: LoadingSpinnerProps) => {
  return (
    <div
      className={`w-6 h-6 rounded-full animate-spin border-2 border-solid ${borderColor} border-t-transparent ${className}`}
    ></div>
  );
};
