export default function Footer() {
  return (
    <footer className="bg-background text-muted py-4 text-center">
      <p className="text-sm">
        &copy; {new Date().getFullYear()} Vinícius Barbosa. All rights reserved.
      </p>
    </footer>
  );
}
