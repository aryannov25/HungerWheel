const Shimmer = () => {
  return (
    <div className="restaurant-list " >
      {Array(10)
        .fill("")
        .map((e, index) => (
          <div key={index} className="shimmer-card flex flex-wrap w-60 p-2 mt-2 m-2 h-full bg-purple-50"></div>
        ))}
    </div>
  );
};

export default Shimmer;
