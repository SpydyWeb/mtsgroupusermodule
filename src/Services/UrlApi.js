export const CurrentUrl =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development"
    ? "https://localhost:44376/"
    : "http://pan.gipinfosystems.com/";
