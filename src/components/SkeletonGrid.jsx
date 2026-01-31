import SkeletonCard from "./SkeletonCard";

const SkeletonGrid = () => {
  return (
    <div className="p-8 grid grid-cols-4 gap-10">
      {Array.from({ length: 8 }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
};

export default SkeletonGrid;
