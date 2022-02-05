import serverPath from "./server";

export async function getLeases() {
  const fetchOptions = {
    method: "GET",
    credentials: "include",
  };
  return await fetch(`${serverPath}/lease`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: "Unable to connect to server. Please try again" },
    }));
}

export async function getLeaseForId(id) {
  const fetchOptions = {
    method: "GET",
    credentials: "include",
  };
  return await fetch(`${serverPath}/lease/${id}`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: "Unable to connect to server. Please try again" },
    }));
}

export async function newLease(values) {
  let formData = new FormData();
  formData.append("data", JSON.stringify(values));
  const fetchOptions = {
    method: "POST",
    credentials: "include",
    body: formData,
  };
  return await fetch(`${serverPath}/lease/new`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: "Unable to connect to server. Please try again" },
    }));
}

export async function editLease(id, values) {
  console.log("Lease");
  let formData = new FormData();

  formData.append("data", JSON.stringify(values));
  const fetchOptions = {
    method: "PATCH",
    credentials: "include",
    body: formData,
  };
  return await fetch(`${serverPath}/lease/edit/${id}`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: "Unable to connect to server. Please try again" },
    }));
}

export async function deleteLease(id) {
  const fetchOptions = {
    method: "Delete",
    credentials: "include",
  };
  return await fetch(`${serverPath}/lease/delete/${id}`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: "Unable to connect to server. Please try again" },
    }));
}
