import { Skeleton } from "@/components/ui/skeleton";

const HeroSectionSkeleton = () => (
    <section className="relative pt-32 md:pt-36 pb-2 md:pb-4 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
                <Skeleton className="h-8 w-32 mb-3 rounded-full" />
                <Skeleton className="h-12 md:h-16 lg:h-20 w-full max-w-4xl mb-4" />
                <Skeleton className="h-6 w-3/4 max-w-2xl" />
            </div>
        </div>
    </section>
);

const MostRecentBlogSkeleton = () => (
    <section className="py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="lg:order-1">
                    <Skeleton className="w-full aspect-video rounded-2xl" />
                </div>
                <div className="lg:order-2 space-y-4">
                    <div className="flex flex-wrap gap-2"><Skeleton className="h-6 w-20" /><Skeleton className="h-6 w-16" /><Skeleton className="h-6 w-24" /></div>
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-6 w-full" /><Skeleton className="h-6 w-3/4" />
                    <div className="flex items-center gap-3 pt-4">
                        <Skeleton className="h-10 w-10 rounded-full" />
                        <div><Skeleton className="h-4 w-24 mb-1" /><Skeleton className="h-4 w-20" /></div>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

const FilterSectionSkeleton = () => (
    <section className="bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
            <div className="hidden md:flex items-center justify-between">
                <Skeleton className="h-5 w-20" />
                <div className="flex items-center gap-3"><Skeleton className="h-10 w-44" /><Skeleton className="h-10 w-60" /></div>
            </div>
        </div>
    </section>
);

const OtherBlogsSkeleton = () => (
    <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array.from({ length: 6 }).map((_, index) => (
                    <div key={index} className="space-y-4"><Skeleton className="w-full aspect-video" /><Skeleton className="h-6 w-full" /><Skeleton className="h-4 w-3/4" /></div>
                ))}
            </div>
        </div>
    </section>
);

const Loading = () => (
    <main>
        <HeroSectionSkeleton />
        <MostRecentBlogSkeleton />
        <FilterSectionSkeleton />
        <OtherBlogsSkeleton />
    </main>
);

export default Loading;