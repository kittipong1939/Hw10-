// Homework 10+
document.addEventListener('DOMContentLoaded', () => {
    const userList = document.querySelector('.user-list');
    const postInfo = document.querySelector('.post-info');
  
    function makeElement(tag, attr_n, attr_v, content) {
      const element = document.createElement(tag);
      element.setAttribute(attr_n, attr_v);
      element.textContent = content;
      return element;
    }
  
      fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => {
          users.forEach(user => {
            const userItem = makeElement('li', 'data-user-id', user.id, `${user.name} / ${user.email}`);;
            userItem.classList.add('user-item');
            userList.appendChild(userItem);
  
            userItem.addEventListener('click', () => {
              fetch(`https://jsonplaceholder.typicode.com/posts?userId=${user.id}`)
                .then(response => response.json())
                .then(posts => {
                  postInfo.innerHTML = '';
  
                  posts.forEach(post => {
                    const postItem = makeElement('li', 'data-post-id', post.id, post.title);
                    postItem.classList.add('post-item');
                    postInfo.appendChild(postItem);
                  });
                })
                .catch(error => {
                  console.error('Error fetching posts:', error);
                });
            });
          });
        })
        .catch(error => {
          console.error('Error fetching users:', error);
        });
        });
  