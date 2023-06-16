import axios, {
  paymentData,
  seriesData,
  userData,
  videoData,
} from "@/store/actions";
import { setAlert, setLoading } from "@/store/slices/main";

export const getAllDataTable = async (dispatch) => {
  await dispatch(userData());
  await dispatch(videoData());
  await dispatch(seriesData());
  await dispatch(paymentData());
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

export const activateSeries = async (id, data, dispatch, token) => {
  dispatch(setLoading(true));
  const response = await axios
    .put(`/series/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      dispatch(
        setAlert({
          type: "success",
          message: `Series dengan judul ${res.data.data.judul} berhasil di${
            !res.data.data.active ? "aktifkan" : "non-aktifkan"
          }!`,
          show: true,
        })
      );
      dispatch(seriesData());
    })
    .catch((err) => {
      dispatch(
        setAlert({
          type: "error",
          message: `Series dengan ID-${id.toUpperCase()} gagal di${
            data.active ? "aktifkan" : "non-aktifkan"
          }! siahkan lihat error di konsol`,
          show: true,
        })
      );
      dispatch(setLoading(false));
    });
  return response;
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
          message: `User dengan nama ${res.data.data.nama} berhasil di${
            res.data.data.validated ? "validasi" : "un-validasi"
          }!`,
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
      dispatch(setLoading(false));
      dispatch(
        setAlert({
          type: "error",
          message: `User dengan id ${id} gagal dihapus!`,
          show: true,
        })
      );
    });
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
      dispatch(setLoading(false));
      dispatch(
        setAlert({
          type: "error",
          message: `Video dengan id ${id} gagal dihapus!`,
          show: true,
        })
      );
    });
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
      dispatch(setLoading(false));
      dispatch(
        setAlert({
          type: "error",
          message: `Series dengan id ${id} gagal dihapus!`,
          show: true,
        })
      );
    });
  return response;
};

//SECTION - Create Data Section

const createUser = async (data, dispatch, token, action) => {
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
    })
    .finally(() => {
      dispatch(setLoading(false));
      action.resetForm();
    });
  return response;
};

const createVideo = async (data, dispatch, token, action) => {
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
          message: `Video dengan judul ${res.data.title} berhasil dibuat!`,
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
    })
    .finally(() => {
      dispatch(setLoading(false));
      action.resetForm();
    });
  return response;
};

const createSeries = async (data, dispatch, token, action) => {
  dispatch(setLoading(true));
  const formData = new FormData();

  Object.keys(data).forEach((key) => {
    formData.append(key, data[key]);
  });

  const response = await axios
    .post(`/series`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      dispatch(
        setAlert({
          type: "success",
          message: `Series dengan judul ${res.data.data.judul} berhasil dibuat!`,
          show: true,
        })
      );
      action.resetForm();
      dispatch(seriesData());
    })
    .catch((err) => {
      dispatch(
        setAlert({
          type: "error",
          message: "Series gagal dibuat!, silahkan lihat error pada konsol",
          show: true,
        })
      );
      dispatch(setLoading(false));
    });
  return response;
};

//SECTION - End of Create Data Section

//SECTION - Update Data Section

const updateUser = async (data, dispatch, token, action) => {
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
      action.resetForm();
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
    })
    .finally(() => dispatch(setLoading(false)));
  return response;
};

export const updateVideo = async (data, dispatch, token, action) => {
  dispatch(setLoading(true));
  const response = await axios
    .put(`/video/${data.id}`, data, {
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
      action.resetForm();
      dispatch(videoData());
    })
    .catch((err) => {
      dispatch(
        setAlert({
          type: "error",
          message: `Video gagal diupdate!, silahkan lihat error pada konsol`,
          show: true,
        })
      );
      dispatch(setLoading(false));
    });
  return response;
};

const updateImageVideo = async (values, dispatch, token, action) => {
  dispatch(setLoading(true));
  const formData = new FormData();
  formData.append("thumbnail", values.thumbnail);

  const response = await axios
    .put(`/video/image/${values.id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
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
      action.resetForm();
      dispatch(videoData());
    })
    .catch((err) => {
      dispatch(
        setAlert({
          type: "error",
          message: `Gambar Video gagal diupdate!, silahkan lihat error pada konsol`,
          show: true,
        })
      );
      dispatch(setLoading(false));
    });

  return response;
};

const updateSeries = async (values, dispatch, token, action) => {
  dispatch(setLoading(true));
  const response = await axios
    .put(`/series/${values.id}`, values, {
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
      action.resetForm();
      dispatch(seriesData());
    })
    .catch((err) => {
      dispatch(
        setAlert({
          type: "error",
          message: `Series gagal diupdate!, silahkan lihat error pada konsol`,
          show: true,
        })
      );
      dispatch(setLoading(false));
    });
  return response;
};

const updateImageSeries = async (values, dispatch, token, action) => {
  dispatch(setLoading(true));
  const formData = new FormData();
  formData.append("thumbnail", values.thumbnail);

  const response = await axios
    .put(`/series/image/${values.id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
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
      action.resetForm();
      dispatch(seriesData());
    })
    .catch((err) => {
      dispatch(
        setAlert({
          type: "error",
          message: `Gambar Series gagal diupdate!, silahkan lihat error pada konsol`,
          show: true,
        })
      );
      dispatch(setLoading(false));
    });
  return response;
};

export const submitHandler = async ({
  values,
  actions,
  dispatch,
  adminToken,
  identifier,
}) => {
  actions.setSubmitting(true);
  if (values.fetchType === "create") {
    switch (identifier) {
      case "user":
        await createUser(values, dispatch, actions);
        break;
      case "video":
        await createVideo(values, dispatch, adminToken, actions);
        break;
      case "series":
        await createSeries(values, dispatch, adminToken, actions);
        break;
      default:
        alert("Fetching data belum diatur untuk data ini!");
        break;
    }
  } else if (values.fetchType === "update") {
    switch (identifier) {
      case "user":
        await updateUser(values, dispatch, adminToken, actions);
        break;
      case "video":
        await updateVideo(values, dispatch, adminToken, actions);
        break;
      case "series":
        await updateSeries(values, dispatch, adminToken, actions);
        break;
      default:
        alert("Fetching data belum diatur untuk data ini!");
        break;
    }
  } else if (values.fetchType === "update-image") {
    switch (identifier) {
      case "video":
        await updateImageVideo(values, dispatch, adminToken, actions);
        break;
      case "series":
        await updateImageSeries(values, dispatch, adminToken, actions);
        break;
      default:
        alert("Fetching data belum diatur untuk data ini!");
        break;
    }
  }
};

const userFilter = (input, data) => {
  const filteredData = data.filter((user) => {
    return (
      user.nama.toLowerCase().includes(input.toLowerCase()) ||
      user.email.toLowerCase().includes(input.toLowerCase()) ||
      user.essentials.username.toLowerCase().includes(input.toLowerCase()) ||
      user._id.toLowerCase().includes(input.toLowerCase())
    );
  });
  return filteredData;
};

const videoFilter = (input, data) => {
  const filteredData = data.filter((video) => {
    return (
      video.title.toLowerCase().includes(input.toLowerCase()) ||
      video._id.toLowerCase().includes(input.toLowerCase()) ||
      video.description.toLowerCase().includes(input.toLowerCase()) ||
      video.type.toLowerCase().includes(input.toLowerCase())
    );
  });
  return filteredData;
};

const seriesFilter = (input, data) => {
  const filteredData = data.filter((series) => {
    return (
      series.judul.toLowerCase().includes(input.toLowerCase()) ||
      series._id.toLowerCase().includes(input.toLowerCase()) ||
      series.deskripsi.toLowerCase().includes(input.toLowerCase())
    );
  });
  return filteredData;
};

const paymentFilter = (input, data) => {
  const filteredData = data.filter((payment) => {
    return payment._id.toLowerCase().includes(input.toLowerCase());
  });
  return filteredData;
};

export const filterData = ({ input, identifier, data }) => {
  switch (identifier) {
    case "user":
      return userFilter(input, data);
    case "video":
      return videoFilter(input, data);
    case "series":
      return seriesFilter(input, data);
    case "payment":
      return paymentFilter(input, data);
  }
};
