const modal = document.querySelector('.modal');
// const comments = 
function showComment(arr) { //отрисовка комментариев на странице
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
              <button class="purple-btn reply-btn">Reply</button>
            </div>
            <div class="card-main__comment">${reply.content}</div>
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
                  <button class="purple-btn reply-btn">Reply</button>
                </div>
                <div class="card-main__comment">${content}</div>
              </div>
            </div>
            <div class="reply-section">${replyList}</div>
          </div>`

  })
  document.querySelector('.comment-block__inner').innerHTML = commentList
  createReply()
}
showComment(comments)
//==============user actions==============
function createComment() {//создаем комментарий текущего пользователя
  let content = document.querySelector('.form-block__comment');
  let myComment = document.querySelector('.card').cloneNode(true);
  let deleteBtn = document.querySelector('.purple-btn').cloneNode(true)
  deleteBtn.innerText = 'Delete'
  deleteBtn.classList.add('delete-btn')
  myComment.classList.add('my-comment')
  myComment.querySelector('.score').innerHTML = 0;
  myComment.querySelector('.avatar').src = currentUser.image.png;
  myComment.querySelector('.name').innerText = currentUser.username;
  myComment.querySelector('.card-main__comment').innerText = content.value;
  myComment.querySelector('.purple-btn').classList.remove('reply-btn');
  myComment.querySelector('.purple-btn').classList.add('edit-btn');
  myComment.querySelector('.purple-btn').innerText = 'Edit';
  myComment.querySelector('.card-main__header').style = 'display: grid; grid-template-columns: 0.5fr 1fr 1.5fr 2fr 1fr;'
  myComment.querySelector('.card-main__header').appendChild(deleteBtn);
  return myComment
}
document.querySelector('.form-block__send-btn').onclick = () => {
  document.querySelector('.comment-block__inner').appendChild(createComment())
  scoreCounter();
  editComment();
  a1()
  setId()
}
function a1() { //отправляем комментарий и присваиваем id
  // sendComment('.comment-block__inner');
  let a = document.querySelectorAll('.my-comment');
  for (let i = 0; i < a.length; i++) {
    a[i].setAttribute('id', 'comment' + i);
    a[i].querySelector('.delete-btn').setAttribute('id', 'comment' + i);
    a[i].querySelector('.edit-btn').setAttribute('id', 'comment' + i);
    document.querySelector('.form-block__send-btn-a').setAttribute('href', '#comment' + i)
  };
}
function setId() { //присваиваем кнопке подтверждения id комментария который нужно удалить
  document.querySelectorAll('.delete-btn').forEach(item => {
    item.addEventListener('click', function () {
      modal.querySelector('.yes').setAttribute('id', item.id)
      deleteComment()
    });
  });
};
//=============deleting comment=============
function deleteComment() { //выводим модальное окно и подтверждаем/отменяем удаление
  modal.style.display = 'block'
  modal.querySelector('.yes').addEventListener('click', function () {
    document.querySelectorAll('.my-comment').forEach(item => {
      if (this.id === item.id) item.remove()
    })
    modal.style.display = 'none'
  })
  modal.querySelector('.no').onclick = () => { modal.style.display = 'none' }
};
//-----счетчик рейтинга комментариев-----
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

// ============Редактирование комментариев=============
function editComment() {
  const comments = document.querySelectorAll('.my-comment')
  let editField = document.querySelector('.form-block__comment').cloneNode(false)
  let applyChanges = document.querySelector('.form-block__send-btn').cloneNode(true)
  comments.forEach(item => {
    item.querySelector('.edit-btn').onclick = () => {
      item.querySelector('.card-main__comment').appendChild(editField);
      item.querySelector('.form-block__comment').innerText = item.querySelector('.card-main__comment').innerText;
      item.querySelector('.card-main__comment').appendChild(applyChanges);
      item.querySelector('.card-main__comment').style.display = 'flex';
      applyChanges.onclick = () => {
        item.querySelector('.card-main__comment').innerHTML = editField.value
      }
    }

  })
}
// =======отправка ответов=======
function createReply() {
  const replyField = document.querySelector('.form-block__comment').cloneNode(false);
  let reply = document.querySelector('.reply-comment').cloneNode(true)
  let sendReply = document.querySelector('.form-block__send-btn').cloneNode(false)
  let deleteBtn = document.querySelector('.purple-btn').cloneNode(true)
  reply.querySelector('.card-main__comment').innerHTML = '';
  reply.querySelector('.card-main__comment').appendChild(replyField);
  reply.querySelector('.card-main__comment').appendChild(sendReply);
  sendReply.classList.add('send-reply')
  sendReply.innerText = 'Send'
  sendReply.style.color = 'hsl(228, 33%, 97%)'
  reply.querySelector('.card-main__comment').style.display = 'flex'
  reply.querySelector('.score').innerHTML = 0;
  reply.querySelector('.avatar').src = currentUser.image.png;
  reply.querySelector('.name').innerText = currentUser.username;
  deleteBtn.innerText = 'Delete'
  deleteBtn.classList.add('delete-btn')
  reply.querySelector('.card-main__header').appendChild(deleteBtn);
  reply.querySelector('.card-main__header').style = 'display: grid; grid-template-columns: 0.5fr 1fr 1.5fr 2fr 1fr;'
  sendReply.onclick = () => {
    reply.querySelector('.card-main__comment').innerHTML = replyField.value
  }
  return reply
}
document.querySelectorAll('.card').forEach(item => {
  let replySection = item.querySelector('.reply-section')
  item.querySelector('.reply-btn').onclick = () => { replySection.insertBefore(createReply(), item.querySelector('.reply-comment')); scoreCounter() }
})







