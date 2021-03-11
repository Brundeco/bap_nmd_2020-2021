export default (date) => {
  const longEnUSFormatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const pluralRules = new Intl.PluralRules("en-US", {
    type: "ordinal",
  });
  const suffixes = {
    one: "st",
    two: "nd",
    few: "rd",
    other: "th",
  };
  const convertToOrdinal = (number) =>
    `${number}${suffixes[pluralRules.select(number)]}`;
  // At this point:
  // convertToOrdinal("1") === "1st"
  // convertToOrdinal("2") === "2nd"
  // etc.

  const extractValueAndCustomizeDayOfMonth = (part) => {
    if (part.type === "day") {
      return convertToOrdinal(part.value);
    }
    return part.value;
  };
  return longEnUSFormatter
    .formatToParts(date)
    .map(extractValueAndCustomizeDayOfMonth)
    .join("");

  //   console.log(
  //     longEnUSFormatter
  //       .formatToParts(date)
  //       .map(extractValueAndCustomizeDayOfMonth)
  //       .join("")
  //   );
};
