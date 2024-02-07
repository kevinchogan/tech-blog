const newPostFormHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector("#post-title").value.trim();
    const body = document.querySelector("#post-body").value.trim();
    const user_id = document.querySelector("#submit-btn").getAttribute("data-id");
  
    const response = await fetch("/api/posts/", {
      method: "POST",
      body: JSON.stringify({ title, body, user_id }),
      headers: { "Content-Type": "application/json" },
    });
  
    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to update.");
    }
  };

  
document
.querySelector(".new-post-form")
.addEventListener("submit", newPostFormHandler);