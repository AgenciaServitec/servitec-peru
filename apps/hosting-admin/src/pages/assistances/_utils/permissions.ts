export const LUNCH_APPROVERS = [
  "XfQXaMRZD7Gro2kPaIvU",
  "fRiTn5k6TP5TJvpXZeLS",
  "woc2g3M8EO4RYtXFap6n",
  "UXrpXFxJhVi5Tl1MTMu2",
  "U0kKdzTPY0rVgWcCY8dV",
];

export const canApproveLunch = (userId?: string) =>
  !!userId && LUNCH_APPROVERS.includes(userId);
