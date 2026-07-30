export default function Footer() {
  return (
    <footer className="border-t border-emerald-950/20 bg-emerald-950/90 py-8 text-center text-sm text-emerald-100/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p>&copy; {new Date().getFullYear()} Proud of Pakistan. All rights reserved.</p>
        <p className="mt-2 text-xs text-emerald-100/40">
          Built to celebrate the history, achievements, and destinations of Pakistan.
        </p>
      </div>
    </footer>
  );
}
