import {
  CurrencyDollarIcon,
  DocumentIcon,
  PlayCircleIcon,
  UsersIcon,
} from "@heroicons/react/24/solid";
import authorsTableData from "./authors-table-data";
import { seriesValue, userValue, videoValue } from "./table-value-data";
import {
  seriesValidation,
  userValidation,
  videoValidation,
} from "./table-value-validation";
import UserForm from "@/widgets/forms/user-form";
import SeriesForm from "@/widgets/forms/series-form";
import VideoForm from "@/widgets/forms/video-form";

export const tableTab = [
  {
    label: "User",
    icon: UsersIcon,
    value: "user",
    titles: [
      "ID",
      "Nama",
      "Tipe User",
      "email",
      "ID Gambar",
      "Essentials",
      "Tervalidasi",
      "Waktu Dibuat",
      "Terakhir Update",
      "Version",
    ],
    initValue: userValue,
    validations: userValidation,
    form: UserForm,
  },
  {
    label: "Video",
    icon: PlayCircleIcon,
    value: "video",
    titles: [
      "ID",
      "Judul",
      "Deskripsi",
      "URL Video",
      "Thumbnail",
      "Tipe Video",
      "Jumlah Vote",
    ],
    initValue: videoValue,
    validations: videoValidation,
    form: VideoForm,
  },
  {
    label: "Series",
    icon: DocumentIcon,
    value: "series",
    titles: [
      "ID",
      "Judul",
      "Deskripsi",
      "Thumbnail",
      "Status",
      "ID Video",
      "Waktu Dibuat",
      "Terakhir Update",
      "Version",
    ],
    initValue: seriesValue,
    validations: seriesValidation,
    form: SeriesForm,
  },
];

export const paymentTable = {
  icon: CurrencyDollarIcon,
  value: "series",
  data: authorsTableData,
  titles: ["author", "function", "status", "employed", ""],
  initValue: {},
  validations: {},
};

export default tableTab;
