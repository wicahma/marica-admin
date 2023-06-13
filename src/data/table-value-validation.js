import * as Yup from "yup";

export const userValidation = Yup.object().shape({
  nama: Yup.string().required("Nama harus diisi"),
  lahir: Yup.string().when("fetchType", {
    is: "update",
    then: (schema) =>
      schema
        .notRequired()
        .test(
          "max-date-now",
          "Tidak boleh lebih dari 10 tahun terakhir",
          (value) => {
            if (!value) return true;
            const now = new Date();
            const date = new Date(value);
            const diff = now.getFullYear() - date.getFullYear();
            return diff <= 10;
          }
        ),
    otherwise: (schema) => schema.notRequired(),
  }),
  email: Yup.string().required("Email harus diisi").email("Email tidak valid"),
  phone: Yup.number()
    .typeError("Masukkan nomor telepon dengan benar")
    .when("fetchType", {
      is: "update",
      then: (schema) =>
        schema.test("is-08", "Nomor telepon harus diawali 08", (value) => {
          return value && ("0" + value.toString()).startsWith("08");
        }),
      otherwise: (schema) => schema.notRequired(),
    }),
  username: Yup.string().when("fetchType", {
    is: "update",
    then: (schema) =>
      schema.required("Username harus diisi").min(5, "Minimal 5 karakter"),
    otherwise: (schema) => schema.notRequired(),
  }),
  password: Yup.string().when("fetchType", {
    is: "create",
    then: (schema) =>
      schema
        .required("Password dibutuhkan!")
        .test(
          "is-stadard",
          "Password harus berisi minimal 1 uppercase, 1 lowercase, 2 number, 1 symbol",
          (value) => {
            const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d.*\d)(?=.*\W).*$/g;
            return regex.test(value);
          }
        )
        .min(5, "Minimal 5 karakter"),
    otherwise: (schema) => schema.notRequired(),
  }),
  fetchType: Yup.string().required("Tipe API harus diisi"),
});

export const videoValidation = Yup.object().shape({
  videoURL: Yup.string().required("URL video harus diisi"),
  title: Yup.string()
    .required("Judul video harus diisi!")
    .max(100, "Judul tidak boleh lebih dari 100 karakter"),
  description: Yup.string()
    .notRequired()
    .max(2000, "Deskripsi tidak boleh lebih dari 2000 karakter"),
  thumbnail: Yup.mixed()
    .required("Thumbnail harus diisi")
    .test(
      "file-type",
      "File thumbnail harus berupa gambar & wajib diisi",
      (value) => {
        return value instanceof File && value.type.startsWith("image");
      }
    )
    .test("files-size", "Ukuran file tidak boleh lebih dari 5Mb", (value) => {
      return value && value.size <= 1_000_000 * 5;
    }),
  type: Yup.string().required("Tipe video harus diisi"),
  quizTimestamp: Yup.number()
    .typeError("Masukkan timestamp dengan benar")
    .when("fetchType", {
      is: "update",
      then: (schema) => schema.notRequired(), //NOTE - THis is the performance when fetchType is update, but for now i disable it because it is not used with frontend
      otherwise: (schema) => schema.notRequired(),
    }),
  quizType: Yup.string().when("fetchType", {
    is: "update",
    then: (schema) =>
      schema
        .notRequired()
        .test("enum-type", "Tipe kuis tidak valid", (value) => {
          const enumType = ["pilihanGanda", "fillTheBlank", "reArrange", ""];
          return enumType.includes(value);
        }),
    otherwise: (schema) => schema.notRequired(),
  }),
  quiz: Yup.object().when("fetchType", {
    is: "update",
    then: (schema) => schema.notRequired(), //NOTE - THis is the performance when fetchType is update, but for now i disable it because it is not used with frontend
    otherwise: (schema) => schema.notRequired(),
  }),
  quizAttachmentData: Yup.array().when("fetchType", {
    is: "update",
    then: (schema) => schema.notRequired(), //NOTE - THis is the performance when fetchType is update, but for now i disable it because it is not used with frontend
    otherwise: (schema) => schema.notRequired(),
  }),
  quizAttachmentType: Yup.string().when("fetchType", {
    is: "update",
    then: (schema) => schema.notRequired(), //NOTE - THis is the performance when fetchType is update, but for now i disable it because it is not used with frontend
    otherwise: (schema) => schema.notRequired(),
  }),
  fetchType: Yup.string().required("Tipe video harus diisi"),
});

export const seriesValidation = Yup.object().shape({
  judul: Yup.string().required("Judul harus diisi"),
  deskripsi: Yup.string().required("Deskripsi harus diisi"),
  //TODO - Change validation to validate file
  thumbnail: Yup.string().required("Thumbnail harus diisi"),
  active: Yup.boolean().when("fetchType", {
    is: "update",
    then: (schema) => schema.required("Status harus diisi"),
    otherwise: (schema) => schema.notRequired(),
  }),
  videos: Yup.array().when("fetchType", {
    is: "update",
    then: (schema) => schema.required("List video harus diisi"),
    otherwise: (schema) => schema.notRequired(),
  }),
  fetchType: Yup.string().required("Tipe video harus diisi"),
});
