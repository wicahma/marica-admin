import {
  BanknotesIcon,
  UserIcon,
  PlayIcon,
  MusicalNoteIcon,
} from "@heroicons/react/24/solid";

const rp = Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
});
const num = Intl.NumberFormat("id-ID", {
  notation: "standard",
});

export const statisticsCardsData = [
  {
    color: "light-green",
    icon: BanknotesIcon,
    title: "Total Saldo",
    value: rp.format(1231231),
    footer: {
      color: "text-green-500",
      value: "+55%",
      label: "than last week",
    },
  },
  {
    color: "pink",
    icon: UserIcon,
    title: "Total User",
    value: num.format(1785),
    footer: {
      color: "text-green-500",
      value: "+3%",
      label: "than last month",
    },
  },
  {
    color: "green",
    icon: PlayIcon,
    title: "Total Video",
    value: num.format(1826),
    footer: {
      color: "text-red-500",
      value: "-2%",
      label: "than yesterday",
    },
  },
  {
    color: "orange",
    icon: MusicalNoteIcon,
    title: "Total Musik",
    value: num.format(1785),
    footer: {
      color: "text-green-500",
      value: "+5%",
      label: "than yesterday",
    },
  },
];

export default statisticsCardsData;
