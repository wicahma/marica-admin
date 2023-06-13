import {
  BanknotesIcon,
  UserIcon,
  PlayIcon,
  MusicalNoteIcon,
} from "@heroicons/react/24/solid";
import { Spinner } from "@material-tailwind/react";

const rp = Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
});
const num = Intl.NumberFormat("id-ID", {
  notation: "standard",
});

export const statisticsCardsData = ({ users, videos, serieses, balance }) => {
  return [
    {
      color: "light-green",
      icon: BanknotesIcon,
      title: "Total Saldo",
      value: balance,
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
      value: num.format(users.flat(1).length),
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
      value: num.format(videos.flat(1).length),
      footer: {
        color: "text-light-green-500",
        value: serieses.flat(1).length,
        label: "Series from video.",
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
};

export default statisticsCardsData;
