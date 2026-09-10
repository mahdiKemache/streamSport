const EmptyState = ({ message }) => (
  <div className="flex min-h-[180px] items-center justify-center rounded-xl border border-[#1e2a45] bg-[#0f1629] px-6 text-center text-gray-500">
    <p className="text-sm">{message}</p>
  </div>
);

export default EmptyState;
