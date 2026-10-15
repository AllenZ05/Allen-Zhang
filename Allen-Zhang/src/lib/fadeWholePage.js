// Runs a view transition that cross-fades the whole page (theme switch, project preview). Page
// navigations use React's <ViewTransition> instead, where the navbar and footer stay put; the
// data-fade flag tells globals.css which kind is running, and stays on until every fade has ended.
let running = 0;

export function fadeWholePage(update) {
  const root = document.documentElement;
  running += 1;
  root.setAttribute("data-fade", "");
  const transition = document.startViewTransition(update);
  transition.finished.finally(() => {
    running -= 1;
    if (running === 0) root.removeAttribute("data-fade");
  });
  return transition;
}
