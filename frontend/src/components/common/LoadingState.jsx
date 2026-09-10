const LoadingState = ({ message = 'Loading...' }) => (
  <div className="flex min-h-[220px] items-center justify-center rounded-xl border border-[#1e2a45] bg-[#0f1629]">
    <div className="flex items-center gap-3 text-gray-300">
      <div className="h-5 w-5 animate-spin rounded-full border-2 border-[#00e676] border-t-transparent" />
      <span className="text-sm font-medium">{message}</span>
    </div>
  </div>
);

export default LoadingState;
