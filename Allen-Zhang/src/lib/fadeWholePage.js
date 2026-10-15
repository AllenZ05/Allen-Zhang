// Runs a view transition that cross-fades the whole page (theme switch, project preview). Page
// navigations use React's <ViewTransition> instead, where the navbar and footer stay put; the
// data-fade flag tells globals.css which kind is running.
export function fadeWholePage(update) {
  const root = document.documentElement;
  root.setAttribute("data-fade", "");
  const transition = document.startViewTransition(update);
  transition.finished.finally(() => root.removeAttribute("data-fade"));
  return transition;
}
