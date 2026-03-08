export default function Loading() {
  return (
    <div className="w-full bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 flex flex-col">
      <div className="mb-8">
        <div className="h-9 w-56 bg-gray-100 rounded-xl" />
        <div className="mt-3 h-5 w-[520px] max-w-full bg-gray-100 rounded-xl" />
      </div>

      <div className="flex items-center gap-3 mb-8 overflow-x-auto pb-2">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="h-10 w-28 bg-gray-100 rounded-xl flex-shrink-0" />
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-gray-100">
            <div className="w-full aspect-video rounded-xl bg-gray-100" />
            <div className="mt-5 h-6 w-3/4 bg-gray-100 rounded-xl" />
            <div className="mt-3 h-4 w-full bg-gray-100 rounded-xl" />
            <div className="mt-2 h-4 w-5/6 bg-gray-100 rounded-xl" />
          </div>
        ))}
      </div>
    </div>
  );
}