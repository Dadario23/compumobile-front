import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-3">
      {/* Aumentar tamaño en 75% */}
      <Skeleton className="h-[218.75px] w-[437.5px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-7 w-[437.5px]" />
        <Skeleton className="h-7 w-[350px]" />
      </div>
    </div>
  );
}
