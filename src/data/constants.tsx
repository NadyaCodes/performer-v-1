import { ObjectList } from "./types";

export const styles = ["pt", "ft"];
export const disciplines = ["act", "sing", "dance", "mt"];
export const provinces = [
  "bc",
  "ab",
  "sk",
  "mb",
  "on",
  "qc",
  "nb",
  "ns",
  "nl",
  "pe",
  "yt",
  "nu",
  "nt",
];

export const provincesFull: ObjectList = {
  bc: "british columbia",
  ab: "alberta",
  sk: "saskatchewan",
  mb: "manitoba",
  on: "ontario",
  qc: "québec",
  nb: "new brunswick",
  ns: "nova scotia",
  nl: "newfoundland",
  pe: "prince edward island",
  yt: "yukon",
  nu: "nunavut",
  nt: "northwest territories",
};

export const provincesFullReverse: ObjectList = {
  "british columbia": "bc",
  alberta: "ab",
  saskatchewan: "sk",
  manitoba: "mb",
  ontario: "on",
  québec: "qc",
  "new brunswick": "nb",
  "nova scotia": "ns",
  newfoundland: "nl",
  "prince edward island": "pe",
  yukon: "yt",
  nunavut: "nu",
  "northwest territories": "nt",
};
