const updateCommentHandler = async (event) => {
    event.preventDefault();
  
    const comment = document.querySelector("#comment").value.trim();
    const post_id = document.querySelector("#comment-submit-btn").getAttribute("data-post");
    const user_id = document.querySelector("#comment-submit-btn").getAttribute("data-user");
  
    const response = await fetch("/api/comments/", {
      method: "POST",
      body: JSON.stringify({ comment, post_id, user_id }),
      headers: { "Content-Type": "application/json" },
    });
  
    if (response.ok) { 
      document.location.replace("/");
    } else {
      alert("Failed to post comment.");
    }
  };
  
  
  document
    .querySelector(".comment-form")
    .addEventListener("submit", updateCommentHandler);