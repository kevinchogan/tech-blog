const updateFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector("#post-title").value.trim();
  const body = document.querySelector("#post-body").value.trim();
  const id = document.querySelector("#submit-btn").getAttribute("data-id");

  const response = await fetch("/api/posts/" + id, {
    method: "PUT",
    body: JSON.stringify({ title, body }),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/");
  } else {
    alert("Failed to update.");
  }
};

const deleteFormHandler = async (event) => {
  event.preventDefault();

  const id = event.target.getAttribute("data-id");
  console.log("The id is ", id);

  const response = await fetch("/api/posts/" + id, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/");
  } else {
    alert("Failed to delete.");
  }
};

document
  .querySelector(".update-form")
  .addEventListener("submit", updateFormHandler);

document
  .querySelector("#delete-btn")
  .addEventListener("click", deleteFormHandler);
