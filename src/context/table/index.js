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

export const validateUser = async (id, status, dispatch, token) => {
  dispatch(setLoading(true));
  const response = await axios
    .put(
      `/user/validate/${id}`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((res) => {
      dispatch(
        setAlert({
          type: "success",
          message: `User dengan nama ${res.data.data.nama} berhasil di${res.data.data.validated ? "validasi":"un-validasi"}!`,
          show: true,
        })
      );
      dispatch(userData());
    })
    .catch((err) => {
      dispatch(
        setAlert({
          type: "error",
          message: `User dengan ID-${id.toUpperCase()} gagal divalidasi! siahkan lihat error di konsol`,
          show: true,
        })
      );
      dispatch(setLoading(false));
      console.log(err);
    });
  return response;
};

export const deleteUser = async (id, dispatch, token) => {
  dispatch(setLoading(true));
  const response = await axios
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
  return response;
};

export const deleteVideo = async (id, dispatch, token) => {
  dispatch(setLoading(true));
  const response = await axios
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
  return response;
};

export const deleteSeries = async (id, dispatch, token) => {
  dispatch(setLoading(true));
  const response = await axios
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
  return response;
};

//SECTION - Create Data Section

const createUser = async (data, dispatch, token) => {
  dispatch(setLoading(true));
  const response = await axios
    .post(`/user`, data)
    .then((res) => {
      dispatch(
        setAlert({
          type: "success",
          message: `User dengan nama ${res.data.nama} berhasil dibuat!`,
          show: true,
        })
      );
      dispatch(userData());
    })
    .catch((err) => {
      dispatch(
        setAlert({
          type: "error",
          message: `User gagal dibuat!, silahkan lihat error pada konsol`,
          show: true,
        })
      );
      console.log(err);
    })
    .finally(() => dispatch(setLoading(false)));
  return response;
};

const createVideo = async (data, dispatch, token) => {
  dispatch(setLoading(true));
  const formData = new FormData();

  Object.keys(data).forEach((key) => {
    formData.append(key, data[key]);
  });

  const response = await axios
    .post(`/video`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      dispatch(
        setAlert({
          type: "success",
          message: `Video dengan judul ${res.data.judul} berhasil dibuat!`,
          show: true,
        })
      );
      dispatch(videoData());
    })
    .catch((err) => {
      dispatch(
        setAlert({
          type: "error",
          message: `Video gagal dibuat!, silahkan lihat error pada konsol`,
          show: true,
        })
      );
      console.log(err);
    })
    .finally(() => dispatch(setLoading(false)));
  return response;
};

//SECTION - End of Create Data Section

//SECTION - Update Data Section

const updateUser = async (data, dispatch, token) => {
  dispatch(setLoading(true));
  const response = await axios
    .put(`/user`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      dispatch(
        setAlert({
          type: "success",
          message: `Query sukses! ${res.data.message}`,
          show: true,
        })
      );
      dispatch(userData());
    })
    .catch((err) => {
      dispatch(
        setAlert({
          type: "error",
          message: `User gagal diupdate!, silahkan lihat error pada konsol`,
          show: true,
        })
      );
      console.log(err);
    })
    .finally(() => dispatch(setLoading(false)));
  return response;
};

export const submitHandler = async ({
  values,
  actions,
  dispatch,
  adminToken,
  identifier,
}) => {
  if (values.fetchType === "create") {
    switch (identifier) {
      case "user":
        await createUser(values, dispatch, actions);
        break;
      case "video":
        await createVideo(values, dispatch, adminToken);
        break;
      case "series":
        break;
      default:
        alert("Fetching data belum diatur untuk data ini!");
        break;
    }
  } else if (values.fetchType === "update") {
    switch (identifier) {
      case "user":
        await updateUser(values, dispatch, adminToken);
        break;
      case "video":
        break;
      case "series":
        break;
      default:
        alert("Fetching data belum diatur untuk data ini!");
        break;
    }
  }
};
