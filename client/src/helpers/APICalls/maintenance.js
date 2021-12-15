import serverPath from "./server";

export async function getMaintenances() {
  const fetchOptions = {
    method: "GET",
    credentials: "include",
  };
  return await fetch(`${serverPath}/maintenance`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: "Unable to connect to server. Please try again" },
    }));
}

export async function getMaintenanceForId(id) {
  const fetchOptions = {
    method: "GET",
    credentials: "include",
  };
  return await fetch(`${serverPath}/maintenance/${id}`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: "Unable to connect to server. Please try again" },
    }));
}

export async function newMaintenance(values) {
  let formData = new FormData();
  const { media, ...data } = values;
  media.forEach((f) => {
    formData.append("files", f);
  });
  formData.append("data", JSON.stringify(data));
  const fetchOptions = {
    method: "POST",
    credentials: "include",
    body: formData,
  };
  return await fetch(`${serverPath}/maintenance/new`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: "Unable to connect to server. Please try again" },
    }));
}

export async function editMaintenance(id, values) {
  let formData = new FormData();
  const { media, ...data } = values;

  let fileObjs = [];
  let fileUrls = [];

  media.forEach((f) => {
    if (f instanceof File) {
      fileObjs.push(f);
      formData.append("files", f);
    } else {
      fileUrls.push(f);
    }
  });
  data.media = fileUrls;
  console.log("media", media);
  console.log("fileObjs", fileObjs);
  console.log("fileUrls", fileUrls);
  formData.append("data", JSON.stringify(data));
  const fetchOptions = {
    method: "PATCH",
    credentials: "include",
    body: formData,
  };
  return await fetch(`${serverPath}/maintenance/edit/${id}`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: "Unable to connect to server. Please try again" },
    }));
}
