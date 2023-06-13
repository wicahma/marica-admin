const type = "create";
export const userValue = {
  id: "", // not-required in init
  nama: "",
  email: "",
  password: "", // not-required in update
  lahir: "", // not-required in init
  phone: "", // not-required in init
  username: "", // not-required in init
  address: "", // not-required in init
  fetchType: type,
};

export const videoValue = {
  id: "", // not-required in init
  videoURL: "",
  title: "",
  description: "",
  thumbnail: [], // files validation
  type: "", // paid or free
  quizTimestamp: "", // not-required in init
  quizType: "", // not-required in init // pilihanGanda, fillTheBlank, reArrange
  quiz: {}, // not-required in init
  quizAttachmentData: [], // not-required in init
  quizAttachmentType: "", // not-required in init // image, video
  fetchType: type,
};

export const seriesValue = {
  id: "", // not-required in init
  judul: "",
  deskripsi: "",
  thumbnail: "",
  active: false, // not-required in init // true or false
  videos: [], // not-required in init // array of video id
  fetchType: type,
};
