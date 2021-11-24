import moment from "moment";

export default function dateformatter(date) {
  return moment(date).format("ll");
}
