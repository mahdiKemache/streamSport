const MatchTabs = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <section className="mx-auto mt-6 max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex w-fit gap-1 rounded-lg border border-[#1e2a45] bg-[#0f1629] p-1.5">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 rounded-md px-5 py-2.5 text-sm font-semibold transition-all ${
              activeTab === tab.id ? 'bg-[#00e676] text-[#070b14]' : 'text-gray-400 hover:text-white'
            }`}
          >
            {tab.label}
            <span
              className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                activeTab === tab.id ? 'bg-[#070b14] text-[#00e676]' : 'bg-[#1e2a45] text-gray-400'
              }`}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
};

export default MatchTabs;
