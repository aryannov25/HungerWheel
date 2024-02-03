const Shimmer = () => {
  return (
    <div className="animate-pulse p-2 m-2 flex flex-wrap justify-center">
      {Array(10)
        .fill("")
        .map((_, index) => (
          <div
            className="w-56 h-64 p-2 m-2 bg-stone-100 rounded flex animate-shimmer"
            key={index}
          >
            <div className="flex-1 space-y-4 py-1">
              <div className="h-24 bg-shimmer rounded bg-200% bg-no-repeat"></div>
              <div className="h-8 bg-shimmer rounded bg-200% bg-no-repeat"></div>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-2 bg-shimmer rounded col-span-1 bg-200% bg-no-repeat"></div>
                  <div className="h-2 bg-shimmer rounded col-span-1 bg-200% bg-no-repeat"></div>
                  <div className="h-2 bg-shimmer rounded col-span-1 bg-200% bg-no-repeat"></div>
                </div>
                <div className="h-2 bg-shimmer rounded bg-200% bg-no-repeat"></div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-2 bg-shimmer rounded col-span-2 bg-200% bg-no-repeat"></div>
                  <div className="h-2 bg-shimmer rounded col-span-1 bg-200% bg-no-repeat"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Shimmer;

export const MenuShimmer = () => {
  const shimmer_menu_card_unit = 4;

  return (
    <div className="animate-pulse p-2 m-2">
      <div className="rounded overflow-hidden animate-shimmer bg-shimmer bg-200% bg-no-repeat">
        <div className="h-48"></div>
        <div className="p-4 space-y-4">
          <div className="h-6 bg-shimmer rounded bg-200% bg-no-repeat"></div>
          <div className="h-4 bg-shimmer rounded bg-200% bg-no-repeat"></div>
          <div className="space-y-2">
            {Array(shimmer_menu_card_unit)
              .fill("")
              .map((_, index) => (
                <div className="grid grid-cols-3 gap-4" key={index}>
                  <div className="h-4 bg-shimmer rounded col-span-2 bg-200% bg-no-repeat"></div>
                  <div className="h-4 bg-shimmer rounded col-span-1 bg-200% bg-no-repeat"></div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
