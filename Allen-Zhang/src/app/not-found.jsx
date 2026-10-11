import NotFound from "../views/NotFound/NotFound";

export const metadata = {
  title: { absolute: "404 | Page Not Found" },
  robots: { index: false, follow: true },
};

export default function NotFoundPage() {
  return <NotFound />;
}
