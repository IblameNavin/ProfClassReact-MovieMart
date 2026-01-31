const SkeletonCard = () => {
  return (
    <div className="border p-4 rounded animate-pulse">
      {/* Image */}
      <div className="h-60 w-full bg-gray-200 rounded" />

      {/* Title */}
      <div className="mt-3 h-4.25 w-3/4 bg-gray-200 rounded" />

      {/* Price */}
      <div className="mt-2 h-3.5 w-1/3 bg-gray-200 rounded" />

      {/* Buttons */}
      <div className="mt-4 flex justify-between">
        <div className="h-9 w-[45%] bg-gray-200 rounded" />
        <div className="h-9 w-[45%] bg-gray-200 rounded" />
      </div>
    </div>
  );
};

export default SkeletonCard;
