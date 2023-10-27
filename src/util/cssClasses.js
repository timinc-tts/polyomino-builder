export function csx(...classes) {
  return classes.filter(e => e).join(" ")
}