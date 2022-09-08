
function showComment(arr) {
  let commentList = ''
  let replyList = ''
  arr = arr.map(({ score, user, createdAt, content, replies }) => {
    replies.forEach(reply => {
      replyList +=
        `
          <div class="comment-section reply-comment">
          <div class="card-scoring">
            <div class="card-scoring__counter">
              <button class="plus-btn">+</button>
              <span class="score">${reply.score}</span>
              <button class="minus-btn">-</button>
            </div>
          </div>
          <div class="card-main">
            <div class="card-main__header">
              <img class="avatar" src="${reply.user.image.png}" alt="avatar">
              <span class="name">${reply.user.username}</span>
              <span class="created-at">${reply.createdAt}</span>
              <button class="reply-btn">Reply</button>
            </div>
            <p class="card-main__comment">${reply.content}</p>
          </div>
        </div>
        `
    })

    commentList +=
      `<div class="card">
            <div class="comment-section">
              <div class="card-scoring">
                <div class="card-scoring__counter">
                  <button class="plus-btn">+</button>
                  <span class="score">${score}</span>
                  <button class="minus-btn">-</button>
                </div>
              </div>
              <div class="card-main">
                <div class="card-main__header">
                  <img class="avatar" src="${user.image.png}" alt="avatar">
                  <span class="name">${user.username}</span>
                  <span class="created-at">${createdAt}</span>
                  <button class="reply-btn">Reply</button>
                </div>
                <p class="card-main__comment">${content}</p>
              </div>
            </div>
            <div class="reply-section">${replyList}</div>
          </div>`

  })
  document.querySelector('.comment-block').innerHTML = commentList
}
showComment(comments)
//-----send comment-----
document.querySelector('.form-block__send-btn').onclick = () => {
  let content = document.querySelector('.form-block__comment').value
  let comment = {
    "id": 5,
    "content": content,
    "createdAt": 'today',
    "score": 0,
    "user": {
      "image": {
        "png": "./images/avatars/image-juliusomo.png",
        "webp": "./images/avatars/image-juliusomo.webp"
      },
      "username": "juliusomo"
    },
    "replies": []
  }
  comments.push(comment)
  showComment(comments)
  scoreCounter()
}


// -----send reply-----
function replyTo() {
  let card = document.querySelectorAll('.card-main__header')
  card.forEach(item => {
    const name = '@' + item.querySelector('.name').innerHTML
    const replyBtn = item.querySelector('.reply-btn')
    replyBtn.onclick = () => document.querySelector('.form-block__comment').innerHTML = name;
  })
}
replyTo()


//-----счетччик рейтинга комментариев-----
function scoreCounter() {
  let scoring = document.querySelectorAll('.card-scoring__counter')
  scoring.forEach(score => {
    const plus = score.querySelector('.plus-btn');
    const minus = score.querySelector('.minus-btn');
    const scoreElement = score.querySelector('.score');

    let counter = scoreElement.innerHTML;

    plus.addEventListener('click', () => {
      render(++counter, scoreElement);
    });

    minus.addEventListener('click', () => {
      render(--counter, scoreElement);
    });
  });

  function render(counter, scoreElement) { scoreElement.innerHTML = counter };
}
scoreCounter()






