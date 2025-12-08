export const RangeLabel = ({ startDate, endDate }) => {
  if (!startDate || !endDate) return null;

  const s = startDate.locale("es");
  const e = endDate.locale("es");

  const sameMonth = s.month() === e.month();
  const sameYear = s.year() === e.year();

  let text;
  if (sameMonth && sameYear) {
    text = `Del ${s.format("dddd D")} al ${e.format("dddd D [de] MMMM [de] YYYY")}`;
  } else if (sameYear) {
    text = `Del ${s.format("dddd D [de] MMMM")} al ${e.format("dddd D [de] MMMM [de] YYYY")}`;
  } else {
    text = `Del ${s.format("dddd D [de] MMMM [de] YYYY")} al ${e.format("dddd D [de] MMMM [de] YYYY")}`;
  }

  return <p style={{ fontStyle: "italic", fontSize: "2em" }}>{text}</p>;
};
