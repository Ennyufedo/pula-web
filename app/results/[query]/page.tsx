import Header from "@/components/header"
import Footer from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"

export default function ResultsPage({ params }: { params: { query: string } }) {
  const query = decodeURIComponent(params.query)

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#ffffff" }}>
      <Header />
      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <h1 className="text-2xl font-normal mb-4" style={{ color: "#222222" }}>
              Translation Results
            </h1>
            <div
              className="border rounded p-6"
              style={{
                backgroundColor: "#f8f9fa",
                borderColor: "#a2a9b1",
              }}
            >
              <div className="mb-4">
                <h2 className="text-lg font-medium mb-2" style={{ color: "#222222" }}>
                  Your search:
                </h2>
                <p className="text-lg" style={{ color: "#222222" }}>
                  {query}
                </p>
              </div>
              <div className="border-t pt-4" style={{ borderColor: "#a2a9b1" }}>
                <p className="text-sm" style={{ color: "#72777d" }}>
                  Translation results would appear here. This is a placeholder for the actual translation API
                  implementation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <Toaster />
    </div>
  )
}
