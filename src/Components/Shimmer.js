const ShimmerCard = () => (
  <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
    <div className="h-44 bg-shimmer bg-200% animate-shimmer" />
    <div className="p-4 space-y-2.5">
      <div className="h-4 bg-shimmer bg-200% animate-shimmer rounded-lg w-3/4" />
      <div className="h-3 bg-shimmer bg-200% animate-shimmer rounded-lg w-1/2" />
      <div className="h-3 bg-shimmer bg-200% animate-shimmer rounded-lg w-2/3" />
      <div className="flex gap-2 pt-1">
        <div className="h-5 w-16 bg-shimmer bg-200% animate-shimmer rounded-full" />
        <div className="h-5 w-12 bg-shimmer bg-200% animate-shimmer rounded-full" />
      </div>
    </div>
  </div>
);

const Shimmer = () => (
  <div className="max-w-7xl mx-auto px-6 py-8">
    <div className="h-4 bg-shimmer bg-200% animate-shimmer rounded-lg w-40 mb-6" />
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array(8).fill("").map((_, i) => <ShimmerCard key={i} />)}
    </div>
  </div>
);

export default Shimmer;

export const MenuShimmer = () => (
  <div className="flex-grow">
    {/* Hero shimmer */}
    <div className="h-64 bg-shimmer bg-200% animate-shimmer" />
    <div className="max-w-screen-md mx-auto px-4 py-6 space-y-4">
      <div className="bg-white rounded-2xl border border-gray-100 p-4 space-y-2">
        <div className="h-4 bg-shimmer bg-200% animate-shimmer rounded-lg w-1/3" />
        <div className="h-3 bg-shimmer bg-200% animate-shimmer rounded-lg w-2/3" />
      </div>
      <div className="h-4 bg-shimmer bg-200% animate-shimmer rounded-lg w-24 mt-4" />
      {Array(4).fill("").map((_, i) => (
        <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4 flex gap-4">
          <div className="w-20 h-20 bg-shimmer bg-200% animate-shimmer rounded-xl shrink-0" />
          <div className="flex-grow space-y-2 py-1">
            <div className="h-4 bg-shimmer bg-200% animate-shimmer rounded-lg w-3/4" />
            <div className="h-3 bg-shimmer bg-200% animate-shimmer rounded-lg w-full" />
            <div className="h-4 bg-shimmer bg-200% animate-shimmer rounded-lg w-1/4" />
          </div>
        </div>
      ))}
    </div>
  </div>
);
