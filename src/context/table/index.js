import { seriesData, userData, videoData } from "@/store/actions";

export const getAllDataTable = (dispatch) => {
  dispatch(userData());
  dispatch(videoData());
  dispatch(seriesData());
};

export const setValue = (value, data) => {
  switch (value) {
    case "user":
      return data.user;
    case "video":
      return data.video;
    case "series":
      return data.series;
    default:
      return [];
  }
};
