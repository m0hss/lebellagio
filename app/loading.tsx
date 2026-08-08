export default function Loading() {
  return (
    <div
      className="flex items-center justify-center min-h-screen bg-background"
      role="status"
      aria-label="Chargement…"
    >
      <div className="w-10 h-10 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
    </div>
  )
}
