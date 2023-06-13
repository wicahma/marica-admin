import axios, { seriesData, userData, videoData } from "@/store/actions";
import { setAlert, setLoading } from "@/store/slices/main";

export const getAllDataTable = async (dispatch) => {
  await dispatch(userData());
  await dispatch(videoData());
  await dispatch(seriesData());
};

export const setValue = (value, data) => {
  console.log(data);
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

export const deleteUser = async (id, dispatch, token) => {
  dispatch(setLoading(true));
  const res = await axios
    .delete(`/user/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      dispatch(
        setAlert({
          type: "success",
          message: `User dengan id ${id} berhasil dihapus!`,
          show: true,
        })
      );
      dispatch(userData());
      console.log(res);
    })
    .catch((err) => {
      dispatch(
        setAlert({
          type: "error",
          message: `User dengan id ${id} gagal dihapus!`,
          show: true,
        })
      );
      console.log(err);
    })
    .finally(() => dispatch(setLoading(false)));
  return res;
};

export const deleteVideo = async (id, dispatch, token) => {
  dispatch(setLoading(true));
  const res = await axios
    .delete(`/video/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      dispatch(
        setAlert({
          type: "success",
          message: `Video dengan id ${id} berhasil dihapus!`,
          show: true,
        })
      );
      dispatch(videoData());
      console.log(res);
    })
    .catch((err) => {
      dispatch(
        setAlert({
          type: "error",
          message: `Video dengan id ${id} gagal dihapus!`,
          show: true,
        })
      );
      console.log(err);
    })
    .finally(() => dispatch(setLoading(false)));
  return res;
};

export const deleteSeries = async (id, dispatch, token) => {
  dispatch(setLoading(true));
  const res = await axios
    .delete(`/series/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      dispatch(
        setAlert({
          type: "success",
          message: `Series dengan id ${id} berhasil dihapus!`,
          show: true,
        })
      );
      dispatch(seriesData());
      console.log(res);
    })
    .catch((err) => {
      dispatch(
        setAlert({
          type: "error",
          message: `Series dengan id ${id} gagal dihapus!`,
          show: true,
        })
      );
      console.log(err);
    })
    .finally(() => dispatch(setLoading(false)));
  return res;
};
