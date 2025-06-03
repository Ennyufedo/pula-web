"use client"

export default function Footer() {
  return (
    <footer className="border-t" style={{ borderColor: "#a2a9b1", backgroundColor: "#f8f9fa" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
          <p className="text-xs" style={{ color: "#72777d" }}>
            A WIKIMEDIA FOUNDATION PROJECT
          </p>
          <div className="flex items-center space-x-4 text-xs">
            <a
              href="#"
              className="transition-colors hover:underline"
              style={{ color: "#0645ad" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#0b0080")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#0645ad")}
            >
              Privacy Policy
            </a>
            <span style={{ color: "#a2a9b1" }}>•</span>
            <a
              href="#"
              className="transition-colors hover:underline"
              style={{ color: "#0645ad" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#0b0080")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#0645ad")}
            >
              Terms of Use
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
