export default function DashboardCard() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-600 p-6">
      
      {/* CARD */}
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl p-6 md:p-8">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg md:text-xl font-semibold text-gray-800">
            Dashboard Maturity Level
          </h2>

          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-teal-500 text-white">
            MEA01
          </span>
        </div>

        {/* CHART AREA */}
        <div className="flex justify-center mb-8">
          <div className="w-64 h-64 bg-blue-50 rounded-xl flex items-center justify-center">
            {/* sementara placeholder */}
            <span className="text-sm text-blue-600">
              Radar / Bar Chart
            </span>
          </div>
        </div>

        {/* INFO TEXT */}
        <div className="space-y-3">
          <div className="h-3 bg-gray-200 rounded w-3/4" />
          <div className="h-3 bg-gray-200 rounded w-1/2" />
        </div>

      </div>
    </div>
  );
}
