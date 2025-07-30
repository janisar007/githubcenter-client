

export const  HEIGHT = "h-[calc(100vh-12rem)]";

export const alphabetBgColors :any = {
  A: "bg-[#FF5733]", // Red-Orange
  B: "bg-[#33FF57]", // Bright Green
  C: "bg-[#3357FF]", // Bright Blue
  D: "bg-[#F1C40F]", // Yellow
  E: "bg-[#8E44AD]", // Purple
  F: "bg-[#1ABC9C]", // Teal
  G: "bg-[#E67E22]", // Orange
  H: "bg-[#2ECC71]", // Soft Green
  I: "bg-[#3498DB]", // Sky Blue
  J: "bg-[#E74C3C]", // Soft Red
  K: "bg-[#9B59B6]", // Lavender Purple
  L: "bg-[#16A085]", // Greenish Teal
  M: "bg-[#2980B9]", // Deep Blue
  N: "bg-[#D35400]", // Burnt Orange
  O: "bg-[#27AE60]", // Dark Green
  P: "bg-[#5DADE2]", // Light Blue
  Q: "bg-[#AF7AC5]", // Light Purple
  R: "bg-[#F39C12]", // Mustard Yellow
  S: "bg-[#E84393]", // Pink
  T: "bg-[#1E8449]", // Forest Green
  U: "bg-[#C0392B]", // Deep Red
  V: "bg-[#7D3C98]", // Plum
  W: "bg-[#34495E]", // Slate Blue
  X: "bg-[#2C3E50]", // Charcoal Blue
  Y: "bg-[#F4D03F]", // Lemon
  Z: "bg-[#52BE80]", // Mint Green
};


export const alphabetColorPalette : any = {
  A: { bg_col_1: "#e89595", bg_col_2: "#db5656", border_col: "#bd2828" },
  B: { bg_col_1: "#e8a895", bg_col_2: "#db7556", border_col: "#bd4a28" },
  C: { bg_col_1: "#e8bc95", bg_col_2: "#db9356", border_col: "#bd6d28" },
  D: { bg_col_1: "#e8cf95", bg_col_2: "#dbb256", border_col: "#bd8f28" },
  E: { bg_col_1: "#e8e295", bg_col_2: "#dbd156", border_col: "#bdb128" },
  F: { bg_col_1: "#dbe895", bg_col_2: "#c6db56", border_col: "#a6bd28" },
  G: { bg_col_1: "#c8e895", bg_col_2: "#a8db56", border_col: "#83bd28" },
  H: { bg_col_1: "#b5e895", bg_col_2: "#89db56", border_col: "#61bd28" },
  I: { bg_col_1: "#a2e895", bg_col_2: "#6bdb56", border_col: "#3fbd28" },
  J: { bg_col_1: "#95e89c", bg_col_2: "#56db60", border_col: "#28bd33" },
  K: { bg_col_1: "#95e8af", bg_col_2: "#56db7f", border_col: "#28bd56" },
  L: { bg_col_1: "#95e8c2", bg_col_2: "#56db9e", border_col: "#28bd78" },
  M: { bg_col_1: "#95e8d5", bg_col_2: "#56dbbc", border_col: "#28bd9a" },
  N: { bg_col_1: "#95e8e8", bg_col_2: "#56dbdb", border_col: "#28bdbd" },
  O: { bg_col_1: "#95d5e8", bg_col_2: "#56bcdb", border_col: "#289abd" },
  P: { bg_col_1: "#95c2e8", bg_col_2: "#569edb", border_col: "#2878bd" },
  Q: { bg_col_1: "#95afe8", bg_col_2: "#567fdb", border_col: "#2856bd" },
  R: { bg_col_1: "#959ce8", bg_col_2: "#5660db", border_col: "#2833bd" },
  S: { bg_col_1: "#a295e8", bg_col_2: "#6b56db", border_col: "#3f28bd" },
  T: { bg_col_1: "#b595e8", bg_col_2: "#8956db", border_col: "#6128bd" },
  U: { bg_col_1: "#c895e8", bg_col_2: "#a856db", border_col: "#8328bd" },
  V: { bg_col_1: "#db95e8", bg_col_2: "#c656db", border_col: "#a628bd" },
  W: { bg_col_1: "#e895e2", bg_col_2: "#db56d1", border_col: "#bd28b1" },
  X: { bg_col_1: "#e895cf", bg_col_2: "#db56b2", border_col: "#bd288f" },
  Y: { bg_col_1: "#e895bc", bg_col_2: "#db5693", border_col: "#bd286d" },
  Z: { bg_col_1: "#e895a8", bg_col_2: "#db5675", border_col: "#bd284a" }
};

export const conclusionConstant:any = {
  success: {
    name: "success",
    border_color: "border-[#28a745]",    // green border
    bg_color: "bg-[#d4edda]",            // light green background
    text_color: "text-[#155724]"         // dark green text
  },
  failure: {
    name: "failure",
    border_color: "border-[#dc3545]",    // red border
    bg_color: "bg-[#f8d7da]",            // light red background
    text_color: "text-[#721c24]"         // dark red text
  },
  cancelled: {
    name: "cancelled",
    border_color: "border-[#6c757d]",    // gray border
    bg_color: "bg-[#e2e3e5]",            // light gray background
    text_color: "text-[#383d41]"         // dark gray text
  },
  skipped: {
    name: "skipped",
    border_color: "border-[#17a2b8]",    // cyan border
    bg_color: "bg-[#d1ecf1]",            // light cyan background
    text_color: "text-[#0c5460]"         // dark cyan text
  },
  timed_out: {
    name: "timed out",
    border_color: "border-[#fd7e14]",    // orange border
    bg_color: "bg-[#fff3cd]",            // light orange/yellow background
    text_color: "text-[#856404]"         // dark orange text
  },
  action_required: {
    name: "action required",
    border_color: "border-[#ffc107]",    // yellow border
    bg_color: "bg-[#fff8e1]",            // light yellow background
    text_color: "text-[#856404]"         // dark yellow text
  },
  neutral: {
    name: "neutral",
    border_color: "border-[#6c757d]",    // gray again
    bg_color: "bg-[#f5f5f5]",
    text_color: "text-[#4e4e4e]"
  },
  startup_failure: {
    name: "startup failure",
    border_color: "border-[#b21f2d]",
    bg_color: "bg-[#f9d6d5]",
    text_color: "text-[#611a15]"
  },
  stale: {
    name: "stale",
    border_color: "border-[#6610f2]",
    bg_color: "bg-[#e2d9f3]",
    text_color: "text-[#3f0071]"
  }
};


export const statusConstant:any = {
  queued: {
    name: "queued",
    border_color: "border-[#6f42c1]",    // purple border
    bg_color: "bg-[#ede7f6]",            // light purple
    text_color: "text-[#4a148c]"         // dark purple text
  },
  in_progress: {
    name: "in progress",
    border_color: "border-[#007bff]",    // blue border
    bg_color: "bg-[#cce5ff]",            // light blue background
    text_color: "text-[#004085]"         // dark blue text
  },
  completed: {
    name: "completed",
    border_color: "border-[#28a745]",    // green border
    bg_color: "bg-[#e6f4ea]",            // light green
    text_color: "text-[#155724]"         // dark green text
  },
  requested: {
    name: "requested",
    border_color: "border-[#6610f2]",
    bg_color: "bg-[#e3d9f7]",
    text_color: "text-[#3d0071]"
  },
  waiting: {
    name: "waiting",
    border_color: "border-[#ffc107]",
    bg_color: "bg-[#fff8e1]",
    text_color: "text-[#856404]"
  }
};
