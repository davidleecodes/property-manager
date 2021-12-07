import moment from "moment";

export default function dateFormatter(date) {
  return moment(date).format("ll");
}
