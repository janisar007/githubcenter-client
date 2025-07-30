import { format } from "date-fns";

export function formatDate(isoString: any) {
  return format(new Date(isoString), "MMM d, yyyy h:mm a");
}
