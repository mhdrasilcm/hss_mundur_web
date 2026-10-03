// Re-mounts on every navigation, so each page gets a soft fade-in
// (pure CSS — see .page in globals.css).
export default function Template({ children }) {
  return <div className="page">{children}</div>;
}
